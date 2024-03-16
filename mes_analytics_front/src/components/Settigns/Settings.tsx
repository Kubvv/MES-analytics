import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { useTypeDispatch, useTypeSelector } from '../../services/hooks'
import { type Language, type Currency, type CurrencyWrapper, type LanguageWrapper } from '../../interfaces/types'
import { changeCurrency } from '../../services/slices/currencySlice'
import SettingButtons from './SettingButtons'
import { useTranslation } from 'react-i18next'

export default function Settings (): JSX.Element {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pl')
  const dispatch = useTypeDispatch()
  const currentCurrency = useTypeSelector((state) => state.currency.currency)
  const { i18n } = useTranslation()

  const currencies: Currency[] = ['zł', '$', '€', '£']
  const languages: Language[] = ['pl', 'en', 'fr']
  const highlightColor = 'rgba(172, 189, 252, 0.8)'

  const handleChange = (val: CurrencyWrapper | LanguageWrapper): void => {
    if ('currency' in val) {
      dispatch(changeCurrency(val.currency))
    }
    if ('language' in val) {
      setCurrentLanguage(val.language)
      void i18n.changeLanguage(val.language)
    }
  }

  return (
    <Stack
      display='flex'
      direction='row'
      alignItems='center'
      justifyContent='center'
      gap={4}
    >
      <SettingButtons
        settings={currencies.map((currency) => { return { currency } })}
        currentSetting={{ currency: currentCurrency }}
        highlightColor={highlightColor}
        onClick={handleChange}
      />
      <SettingButtons
        settings={languages.map((language) => { return { language } })}
        currentSetting={{ language: currentLanguage }}
        highlightColor={highlightColor}
        onClick={handleChange}
      />
    </Stack>
  )
};
