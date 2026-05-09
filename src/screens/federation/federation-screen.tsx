'use client'

import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

const API_BASE = 'https://zodiacnetwork.ai/api/federation'
const HOUSES = ['♈ Aries','♉ Taurus','♊ Gemini','♋ Cancer','♌ Leo','♍ Virgo','♎ Libra','♏ Scorpio','♐ Sagittarius','♑ Capricorn','♒ Aquarius','♓ Pisces']
const ELEMENTS = ['Fire','Earth','Air','Water','Fire','Earth','Air','Water','Fire','Earth','Air','Water']
const ELEMENT_COLORS: Record<string,string> = {Fire:'#ef4444',Earth:'#22c55e',Air:'#fbbf24',Water:'#3b82f6'}
const TIER_COLORS: Record<string,string> = {T1:'#94a3b8',T2:'#22c55e',T3:'#3b82f6',T4:'#a855f7',T5:'#c4a35a'}

type FedStatus = { turn?:number; epoch?:number; total_lunar?:number; tidal_pool?:number; active_agents?:number; decay_rate?:number }
type FedAgent = { id?:string; name?:string; house_index?:number; lunar_balance?:number; forge_tier?:string; status?:string }
type FedHouse = { name?:string; agent_count?:number; total_lunar?:number; members?:number }

function fmt(n:number) { return n>=1e6 ? (n/1e6).toFixed(2)+'M' : n>=1e3 ? (n/1e3).toFixed(1)+'K' : String(Math.round(n)) }

export function FederationScreen() {
  const status = useQuery({ queryKey:['fed','status'], queryFn:()=>fetch(API_BASE+'/status').then(r=>r.json()), refetchInterval:30000 })
  const agents = useQuery({ queryKey:['fed','agents'], queryFn:()=>fetch(API_BASE+'/agents').then(r=>r.json()), refetchInterval:30000 })
  const houses = useQuery({ queryKey:['fed','houses'], queryFn:()=>fetch(API_BASE+'/houses').then(r=>r.json()), refetchInterval:30000 })

  const s = (status.data?.data || status.data || {}) as FedStatus
  const agentList = (agents.data?.data || agents.data || []) as FedAgent[]
  const houseList = (houses.data?.data || houses.data?.houses || []) as FedHouse[]

  return (
    <div className="flex flex-col h-full bg-[#0a0a14] text-[#c8c8e0] overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1e1e42] bg-[#111128] shrink-0">
        <span className="text-lg">🏛️</span>
        <span className="font-semibold text-sm text-[#c4a35a]">Zodiac Federation</span>
        <div className="flex-1" />
        <span className={cn("w-1.5 h-1.5 rounded-full", s.turn ? "bg-green-500 animate-pulse" : "bg-red-500")} />
        <span className="text-[10px] text-[#6a6a9a] font-mono">Turn {s.turn ?? '--'}</span>
      </div>

      {/* Economy strip */}
      <div className="grid grid-cols-6 gap-1.5 px-3 py-2 border-b border-[#1e1e42] bg-[#0d0d1f] shrink-0">
        <Stat label="Turn" value={s.turn} color="#c4a35a" />
        <Stat label="Epoch" value={s.epoch} color="#8090d0" />
        <Stat label="LUNAR" value={fmt(s.total_lunar||0)} color="#22c55e" />
        <Stat label="Tidal Pool" value={fmt(s.tidal_pool||0)} color="#3b82f6" />
        <Stat label="Agents" value={s.active_agents ?? s.turn ? '144' : '--'} color="#fbbf24" />
        <Stat label="Decay" value={((s.decay_rate||0)*100).toFixed(1)+'%'} color="#ef4444" />
      </div>

      {/* Body — Swarm + Houses */}
      <div className="flex-1 overflow-auto p-3 space-y-4">
        {/* Agent Swarm */}
        <section>
          <h2 className="text-xs font-semibold text-[#6a6a9a] uppercase tracking-wider mb-2">👥 Agent Swarm</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-1.5">
            {(agentList.length > 0 ? agentList.slice(0, 48) : []).map((a,i) => {
              const hi = (a.house_index ?? i) % 12
              const sigil = HOUSES[hi].split(' ')[0]
              const elem = ELEMENTS[hi]
              const color = ELEMENT_COLORS[elem] || '#c4a35a'
              const tier = a.forge_tier || '--'
              return (
                <div key={a.id||i} className="bg-[#111128] border border-[#1e1e42] rounded-lg p-2 text-[11px] hover:border-[#c4a35a]/30 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">{sigil}</span>
                    <span className="font-semibold text-[#e8d5b7] flex-1 truncate">{a.name || 'Agent #'+(a.id||i)}</span>
                    <span className="text-[9px] px-1 rounded font-mono" style={{background: (TIER_COLORS[tier]||'#333')+'22',color: TIER_COLORS[tier]||'#666'}}>{tier}</span>
                  </div>
                  <div className="flex justify-between text-[#6a6a9a] text-[10px]">
                    <span>{fmt(a.lunar_balance||0)} LUNAR</span>
                    <span style={{color}}>{elem}</span>
                  </div>
                </div>
              )
            })}
            {agentList.length === 0 && <div className="col-span-full text-center text-[#6a6a9a] py-8 text-sm">🌙 Connecting to Federation API...</div>}
          </div>
          {agentList.length > 48 && <div className="text-center text-[#6a6a9a] text-[10px] mt-1">+{agentList.length-48} more agents</div>}
        </section>

        {/* Houses */}
        <section>
          <h2 className="text-xs font-semibold text-[#6a6a9a] uppercase tracking-wider mb-2">🏠 Houses</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-1.5">
            {(houseList.length > 0 ? houseList : Array.from({length:12},(_,i)=>({name:HOUSES[i].split(' ')[1],agent_count:0,total_lunar:0}))).map((h,i) => {
              const sigil = HOUSES[i]?.split(' ')[0] || '?'
              const elem = ELEMENTS[i] || '?'
              const color = ELEMENT_COLORS[elem] || '#c4a35a'
              return (
                <div key={i} className="bg-[#111128] border border-[#1e1e42] rounded-lg p-2.5 text-[11px]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{sigil}</span>
                    <span className="font-semibold text-[#e8d5b7]">{h.name || 'House '+(i+1)}</span>
                  </div>
                  <div className="flex justify-between text-[#6a6a9a] text-[10px]">
                    <span>👥 {h.agent_count ?? h.members ?? 0}</span>
                    <span style={{color}}>{elem}</span>
                    <span>{fmt(h.total_lunar||0)} LUNAR</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-[#6a6a9a] text-[10px] py-2 border-t border-[#1e1e42]">
          🌊 Progressive in-sign decay · 10% weekly purge → Tidal Pool · Redistribution at New Moon
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, color }: { label:string; value?:string|number; color:string }) {
  return (
    <div className="bg-[#111128] border border-[#1e1e42] rounded-lg p-1.5 text-center">
      <div className="text-[9px] text-[#6a6a9a] mb-0.5">{label}</div>
      <div className="text-sm font-bold" style={{color}}>{value ?? '--'}</div>
    </div>
  )
}
