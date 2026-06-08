// recharts ships its own complete type definitions, but they are stricter than
// this workspace's chart usage (notably the recharts 3.x `Tooltip.formatter`
// signature). This ambient module intentionally shadows the package types with
// minimal, precise interfaces covering only the props the dashboard charts
// actually use — no `any`, no behavior change. Genuinely open-ended values
// (chart data rows, tick/tooltip values) are typed `unknown`.
declare module 'recharts' {
  import type { CSSProperties, ComponentType, ReactNode } from 'react'

  type ChartMargin = {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }

  type CartesianChartProps = {
    data?: ReadonlyArray<Record<string, unknown>>
    margin?: ChartMargin
    children?: ReactNode
  }

  export const ResponsiveContainer: ComponentType<{
    width?: number | string
    height?: number | string
    children?: ReactNode
  }>

  export const AreaChart: ComponentType<CartesianChartProps>
  export const BarChart: ComponentType<CartesianChartProps>
  export const LineChart: ComponentType<CartesianChartProps>

  type AxisTick = { fontSize?: number; fill?: string }

  type AxisProps = {
    dataKey?: string
    tick?: boolean | AxisTick
    axisLine?: boolean
    tickLine?: boolean
    interval?: number | 'preserveStart' | 'preserveEnd' | 'preserveStartEnd'
    minTickGap?: number
    width?: number
    tickFormatter?: (value: number, index: number) => string
  }

  export const XAxis: ComponentType<AxisProps>
  export const YAxis: ComponentType<AxisProps>

  export const CartesianGrid: ComponentType<{
    strokeDasharray?: string
    stroke?: string
    opacity?: number
  }>

  export const Tooltip: ComponentType<{
    contentStyle?: CSSProperties
    labelStyle?: CSSProperties
    formatter?: (
      value: number,
      name: string,
    ) => ReactNode | [ReactNode, ReactNode]
  }>

  type SeriesProps = {
    type?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural'
    dataKey: string
    name?: string
    stroke?: string
    fill?: string
    strokeWidth?: number
    dot?: boolean
  }

  export const Area: ComponentType<SeriesProps>
  export const Line: ComponentType<SeriesProps>

  export const Bar: ComponentType<{
    dataKey: string
    name?: string
    stackId?: string
    fill?: string
    radius?: number | [number, number, number, number]
  }>
}
