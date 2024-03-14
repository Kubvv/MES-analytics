interface Project {
  name: string
  roundNumber: number
  cost: number
  voteCount: number
  initialBudget: number
  finalBudget: number
  wasPicked: boolean
  budgetLost: { string: number }
}

interface ElectionFormValues {
  defaultElection: string
  uploadedElection: File | undefined
  exhaust: boolean
}

type Order = 'asc' | 'desc'
type SortableProjectkey = 'roundNumber' | 'name' | 'cost' | 'voteCount' | 'finalBudget'
type Currency = 'zł' | '$' | '€' | '£'
type Language = 'en' | 'pl' | 'fr'

interface CurrencyWrapper { currency: Currency }
interface LanguageWrapper { language: Language }

export type {
  Project,
  ElectionFormValues,
  Order,
  SortableProjectkey,
  Currency,
  Language,
  CurrencyWrapper,
  LanguageWrapper
}