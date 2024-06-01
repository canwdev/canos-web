export interface IStartMenuItem {
  id: string
  size: 'sm' | 'md' | 'lg' | 'xl'
  background?: string
}
export const StartItemSizeOptions = [
  {label: 'Small', value: 'sm'},
  {label: 'Medium', value: 'md'},
  {label: 'Large', value: 'lg'},
  {label: 'X Large', value: 'xl'},
]

export interface StartLayoutGroup {
  title: string
  children: IStartMenuItem[]
}
export type StartLayoutColumn = StartLayoutGroup[][]
