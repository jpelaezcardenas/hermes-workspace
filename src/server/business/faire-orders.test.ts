import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  createCachedPatchAidFaireOrdersFetcher,
  fetchPatchAidFaireOrders,
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

function sqlTestLiteral(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
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

  it('accepts PatchAid Faire orders routed through shared operational mailboxes', () => {
    const sharedMailboxPatchAidMessage: FaireCorpusMessage = {
      ...patchAidMessage,
      gmailId: 'shared-mailbox-patchaid-faire-order',
      threadId: 'shared-mailbox-patchaid-faire-thread',
      fromAddr: 'amazon@bariatricpal.com',
      fromName: "'Faire' via Amazon Team",
      toAddrs: ['PatchAid <amazon@bariatricpal.com>'],
      subject: 'New wholesale order from Crystal Flower Health and Wellness (#YV79QCRP9N)',
      bodyText: `
From: 'Faire' via Amazon Team <amazon@bariatricpal.com>
Subject: New wholesale order from Crystal Flower Health and Wellness (#YV79QCRP9N)

You just received a $301.95 order. Congratulations!
Order #YV79QCRP9N
You have a new order from Crystal Flower Health and Wellness.
Order Summary
Total: $301.95
Order Date
Aug 19, 2023
Item Subtotal (15 Items)
`,
    }

    const order = parseFaireOrderEmail(sharedMailboxPatchAidMessage)

    expect(order).toMatchObject({
      orderId: 'YV79QCRP9N',
      customerName: 'Crystal Flower Health and Wellness',
      totalAmount: 301.95,
      unitCount: 15,
      orderDate: '2023-08-19',
    })
  })

  it('rejects generic non-PatchAid Faire forwards that only mention PatchAid in a signature', () => {
    const nonPatchAidForwardWithPatchAidSignature: FaireCorpusMessage = {
      ...patchAidMessage,
      gmailId: 'other-brand-faire-order',
      threadId: 'other-brand-faire-thread',
      fromAddr: 'wholesale@info.faire.com',
      toAddrs: ['Wholesale Team <faire@otherbrand.example>'],
      subject: 'New wholesale order from Generic Market (#GENERIC123)',
      bodyText: `
From: Faire <wholesale@info.faire.com>
Subject: New wholesale order from Generic Market (#GENERIC123)
To: Wholesale Team <faire@otherbrand.example>

You just received a $412.20 order.
Order #GENERIC123
Order Summary
Total: $412.20
Order Date
Jul 2, 2024

All the best,
Alex Brecher
PatchAid <https://www.PatchAid.com>
`,
    }

    expect(parseFaireOrderEmail(nonPatchAidForwardWithPatchAidSignature)).toBeNull()
  })

  it('rejects generic non-PatchAid Faire forwards that mention a PatchAid email signature', () => {
    const otherBrandOrderWithPatchAidEmailSignature: FaireCorpusMessage = {
      ...patchAidMessage,
      gmailId: 'other-brand-faire-order-email-signature',
      threadId: 'other-brand-faire-thread-email-signature',
      fromAddr: 'wholesale@info.faire.com',
      toAddrs: ['Wholesale Team <faire@otherbrand.example>'],
      subject: 'New wholesale order from Generic Market (#GENERIC456)',
      bodyText: `
From: Faire <wholesale@info.faire.com>
Subject: New wholesale order from Generic Market (#GENERIC456)
To: Wholesale Team <faire@otherbrand.example>

You just received a $412.20 order.
Order #GENERIC456
Order Summary
Total: $412.20
Order Date
Jul 2, 2024

All the best,
Alex Brecher
PatchAid <alex@patchaid.com>
`,
    }

    expect(parseFaireOrderEmail(otherBrandOrderWithPatchAidEmailSignature)).toBeNull()
  })

  it('rejects Faire support threads that only quote a wholesale order subject without order details', () => {
    const supportThreadWithBareOrderSubject: FaireCorpusMessage = {
      ...patchAidMessage,
      gmailId: 'zendesk-support-order-mention',
      threadId: 'zendesk-support-order-thread',
      fromAddr: 'support@indigofair.zendesk.com',
      fromName: 'Tayler (Faire Support)',
      toAddrs: ['Alex Brecher <alex@patchaid.com>'],
      subject: 'Fwd: Wholesale Account Help',
      bodyText: `
Tayler, Aug 21, 2023, 10:16 PDT
Hi Alex,
Please provide screenshots for this commission review.

Alex Brecher, Aug 20, 2023, 04:11 PDT
I sent her to Faire!!!!!! See below.

New wholesale order from Salt MedSpa of Dawsonville (#SZA45YCUBQ)

---------- Forwarded message ---------
From: Alex Brecher <alex@patchaid.com>
Date: Thu, Mar 9, 2023 at 5:54 PM
Subject: Re: Wholesale Account Help
To: Sue Gantick <suegantick@gmail.com>
`,
    }

    expect(parseFaireOrderEmail(supportThreadWithBareOrderSubject)).toBeNull()
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

  it('builds a read-only sqlite URI for live Corpus paths with spaces', () => {
    expect(
      sqliteReadonlyUriForCorpusPath('/Volumes/My External Drive/Corpus/index.db'),
    ).toBe('file:/Volumes/My%20External%20Drive/Corpus/index.db?mode=ro')
  })

  it('preserves HTML body line boundaries so HTML-only Corpus rows include item details', async () => {
    const tempDir = mkdtempSync(join(tmpdir(), 'patchaid-faire-corpus-'))
    const dbPath = join(tempDir, 'index.db')
    const htmlBody = `
<html><body>
  <p>You just received a $88.88 order. Way to go!</p>
  <p>Order #HTML12345</p>
  <p>PatchAid - You have a new order from HTML Wellness.</p>
  <h2>Order Summary</h2>
  <p>Total: $88.88</p>
  <p>Order Date</p>
  <p>Feb 2, 2024</p>
  <h2>Order Details</h2>
  <p>Vitamin Patch</p>
  <p>0737669293999</p>
  <p>QtyPriceSubtotal</p>
  <p>3</p>
  <p>$12.34</p>
  <p>$37.02</p>
  <p>Item Subtotal (3 Items)</p>
</body></html>`

    try {
      execFileSync('sqlite3', [
        dbPath,
        `
CREATE TABLE messages (
  gmail_id TEXT PRIMARY KEY,
  thread_id TEXT,
  internal_date_ms INTEGER,
  from_addr TEXT,
  from_name TEXT,
  to_addrs TEXT,
  subject TEXT,
  snippet TEXT,
  body_text TEXT,
  body_html TEXT
);
CREATE VIRTUAL TABLE messages_fts USING fts5(gmail_id UNINDEXED, body);
INSERT INTO messages VALUES (
  'html-only-gmail',
  'html-only-thread',
  ${Date.parse('2024-02-02T12:00:00Z')},
  'wholesale@info.faire.com',
  'Faire',
  ${sqlTestLiteral(JSON.stringify(['PatchAid <alex@patchaid.com>']))},
  'New wholesale order from HTML Wellness (#HTML12345)',
  '',
  '',
  ${sqlTestLiteral(htmlBody)}
);
INSERT INTO messages_fts (gmail_id, body) VALUES (
  'html-only-gmail',
  'New wholesale order Faire PatchAid HTML Wellness'
);
`.trim(),
      ])

      const data = await fetchPatchAidFaireOrders({ corpusDbPath: dbPath, limit: 10 })

      expect(data.warning).toBeNull()
      expect(data.orders).toHaveLength(1)
      expect(data.orders[0]).toMatchObject({
        orderId: 'HTML12345',
        customerName: 'HTML Wellness',
        totalAmount: 88.88,
        unitCount: 3,
      })
      expect(data.orders[0].items).toEqual([
        expect.objectContaining({
          title: 'Vitamin Patch',
          skuOrUpc: '0737669293999',
          quantity: 3,
          unitPrice: 12.34,
          subtotal: 37.02,
        }),
      ])
    } finally {
      rmSync(tempDir, { recursive: true, force: true })
    }
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
