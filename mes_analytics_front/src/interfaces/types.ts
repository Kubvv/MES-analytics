interface Election {
  name: string
  initialBudget: number
  voteCount: number
  finalBudgetPerVoter: number
  exhaust: boolean
  projects: Project[]
}

interface Project {
  name: string
  roundNumber: number
  cost: number
  voteCount: number
  effectiveSupport: number
  initialBudget: number
  finalBudget: number
  wasPicked: boolean
  budgetLost: { string: number }
}

interface ElectionFormValues {
  defaultElection: string
  uploadedElection: File | undefined
  exhaust: boolean
  effSupport: boolean
}

type Order = 'asc' | 'desc'
type SortableProjectkey = 'roundNumber' | 'name' | 'cost' | 'voteCount' | 'effectiveSupport' | 'finalBudget'
type Currency = 'zł' | '$' | '€' | '£'
type Language = 'en' | 'pl' | 'fr'

interface CurrencyWrapper { currency: Currency }
interface LanguageWrapper { language: Language }

export type {
  Election,
  Project,
  ElectionFormValues,
  Order,
  SortableProjectkey,
  Currency,
  Language,
  CurrencyWrapper,
  LanguageWrapper
}
