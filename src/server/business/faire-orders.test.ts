import { describe, expect, it } from 'vitest'
import {
  createCachedPatchAidFaireOrdersFetcher,
  parseFaireOrderEmail,
  sqliteReadonlyUriForCorpusPath,
  summarizeFaireOrders,
} from './faire-orders'
import type { FaireCorpusMessage, PatchAidFaireOrdersResponse } from './faire-orders'

const patchAidMessage: FaireCorpusMessage = {
  gmailId: '49a4cf3463681d93',
  threadId: '49a4cf3463681d93',
  internalDateMs: Date.parse('2022-01-05T22:40:00Z'),
  fromAddr: 'wholesale@info.faire.com',
  fromName: 'Faire',
  toAddrs: ['PatchAid <alex@patchaid.com>'],
  subject: 'New wholesale order from K9 Korral (#VZ3VM8JP9Q)',
  snippet: null,
  bodyText: `
From: Faire <wholesale@info.faire.com>
Subject: New wholesale order from K9 Korral (#VZ3VM8JP9Q)
To: PatchAid <alex@patchaid.com>

You just received a $224.78 order. Way to go!
Order #VZ3VM8JP9Q
<https://www.faire.com/maker-portal/orders/bo_vz3vm8jp9q/order-fulfilment?oet=oe_ujx4p9r9y3rq66e5&oeln=link>

You have a new order from K9 Korral.
Order Summary
Total: $224.78
Shipping Address
K9 Korral
K9 Korral
2001 Princeton st
Sarasota, FL 34237
USA
Order Date
Jan 5, 2022
Ship Date
ASAP

Order Details
[image: Slim Trim Appetite Suppressant Patch]
Slim Trim Appetite Suppressant Patch
30-Day Supply
0737669293916

QtyPriceSubtotal

5
$9.99
$49.95
[image: Natural Weight Loss Enhancer Patch]
Natural Weight Loss Enhancer Patch
30-Day Supply
0737669293923

QtyPriceSubtotal

5
$9.99
$49.95

Item Subtotal (10 Items)
25% Commission (Opening Order)
$99.90
$24.98

Total
$74.92
Full order and payout details are available in your Faire portal
`,
}

const alacMessage: FaireCorpusMessage = {
  gmailId: '19a22097fb8f2985',
  threadId: '19a179a6c1a80d53',
  internalDateMs: Date.parse('2025-10-24T19:03:00Z'),
  fromAddr: 'amazon@bariatricpal.com',
  fromName: "'Faire' via Amazon Team",
  toAddrs: [
    "Alex's Low-Acid Organic Coffee <faire@lowacidcoffee.com>",
    'Alex Brecher <amazon@bariatricpal.com>',
  ],
  subject: 'New wholesale order from Hampton Natural Foods (#7H8Q4Q3J6K)',
  snippet: null,
  bodyText: `
From: 'Faire' via Amazon Team <amazon@bariatricpal.com>
Subject: New wholesale order from Hampton Natural Foods (#7H8Q4Q3J6K)
To: Alex's Low-Acid Organic Coffee <faire@lowacidcoffee.com>

Order #7H8Q4Q3J6K
Alex's Low-Acid Organic Coffee - You have a new order from Hampton Natural Foods.
Order Summary
Total: $176.22
Order Date
Oct 24, 2025
Order Details
Alex's Low Acid Organic Coffee - Rise & Shine Ground (12oz)
0038407551931
Qty Price Subtotal
12
$10.19
$122.28
`,
}

describe('PatchAid Faire order ingestion', () => {
  it('parses PatchAid Faire wholesale order emails with a distinct source label', () => {
    const order = parseFaireOrderEmail(patchAidMessage)

    expect(order).toMatchObject({
      orderId: 'VZ3VM8JP9Q',
      customerName: 'K9 Korral',
      source: 'faire',
      sourceLabel: 'Faire / PatchAid',
      brand: 'PatchAid',
      fulfillmentSource: 'Faire',
      totalAmount: 224.78,
      unitCount: 10,
      orderDate: '2022-01-05',
      gmailId: patchAidMessage.gmailId,
    })
    expect(order?.items).toEqual([
      expect.objectContaining({
        title: 'Slim Trim Appetite Suppressant Patch',
        skuOrUpc: '0737669293916',
        quantity: 5,
        unitPrice: 9.99,
        subtotal: 49.95,
      }),
      expect.objectContaining({
        title: 'Natural Weight Loss Enhancer Patch',
        skuOrUpc: '0737669293923',
        quantity: 5,
        unitPrice: 9.99,
        subtotal: 49.95,
      }),
    ])
  })

  it('rejects the ALAC/Netrition Faire source even when the email is a Faire order', () => {
    expect(parseFaireOrderEmail(alacMessage)).toBeNull()
  })

  it('rejects Netrition Faire orders even when the email signature links to PatchAid', () => {
    const netritionMessage: FaireCorpusMessage = {
      ...alacMessage,
      gmailId: 'netrition-faire-order',
      threadId: 'netrition-faire-thread',
      subject: 'New wholesale order from Akron Nutrition Center (#9B58VVT4N6)',
      toAddrs: ['Netrition <faire@netrition.com>'],
      bodyText: `
From: Faire <wholesale@info.faire.com>
Subject: New wholesale order from Akron Nutrition Center (#9B58VVT4N6)
To: Netrition <faire@netrition.com>

You just received a $412.20 order.
Order #9B58VVT4N6
Order Summary
Total: $412.20
Order Date
Jul 2, 2024

All the best,
Alex Brecher
BariatricPal Store
Netrition
PatchAid <https://www.PatchAid.com>
`,
    }

    expect(parseFaireOrderEmail(netritionMessage)).toBeNull()
  })

  it('prefers the Faire wholesale order id over internal fulfillment order references', () => {
    const replyWithInternalOrderReference: FaireCorpusMessage = {
      ...patchAidMessage,
      gmailId: '3746a1f0123fd239',
      subject: 'Re: New wholesale order from Food Healing (#VJGETHKFD8)',
      bodyText: `
Hi Alex,

This is noted. A manual order has been created and is being assigned to Rick.
Order #PA33252

---------- Forwarded message ---------
From: Faire <wholesale@info.faire.com>
Subject: New wholesale order from Food Healing (#VJGETHKFD8)
To: PatchAid <alex@patchaid.com>

You just received a $149.85 order.
Order #VJGETHKFD8
Order Summary
Total: $149.85
Order Date
May 30, 2021
Item Subtotal (20 Items)
`,
    }

    const order = parseFaireOrderEmail(replyWithInternalOrderReference)

    expect(order?.orderId).toBe('VJGETHKFD8')
    expect(order?.customerName).toBe('Food Healing')
    expect(order?.unitCount).toBe(20)
  })

  it('summarizes only PatchAid Faire orders for dashboard cards', () => {
    const summary = summarizeFaireOrders([
      parseFaireOrderEmail(patchAidMessage),
      parseFaireOrderEmail(alacMessage),
    ])

    expect(summary).toEqual({
      sourceLabel: 'Faire / PatchAid',
      orderCount: 1,
      revenue: 224.78,
      units: 10,
      latestOrderDate: '2022-01-05',
    })
  })

  it('builds an immutable read-only sqlite URI for Corpus paths with spaces', () => {
    expect(
      sqliteReadonlyUriForCorpusPath('/Volumes/My External Drive/Corpus/index.db'),
    ).toBe('file:/Volumes/My%20External%20Drive/Corpus/index.db?mode=ro&immutable=1')
  })

  it('caches dashboard fetches so frequent overview refreshes do not rescan Corpus', async () => {
    let now = 1_000
    let calls = 0
    const makeResponse = (generatedAt: string): PatchAidFaireOrdersResponse => ({
      source: 'corpus-gmail-faire-order-emails',
      sourceLabel: 'Faire / PatchAid',
      corpusDbPath: '/tmp/corpus.db',
      orders: [],
      summary: summarizeFaireOrders([]),
      generatedAt,
      warning: null,
    })
    const cachedFetcher = createCachedPatchAidFaireOrdersFetcher({
      ttlMs: 5_000,
      now: () => now,
      fetcher: () => {
        calls += 1
        return Promise.resolve(makeResponse(`call-${calls}`))
      },
    })

    const first = await cachedFetcher()
    const second = await cachedFetcher()
    now += 5_001
    const third = await cachedFetcher()

    expect(first.generatedAt).toBe('call-1')
    expect(second.generatedAt).toBe('call-1')
    expect(third.generatedAt).toBe('call-2')
    expect(calls).toBe(2)
  })
})
