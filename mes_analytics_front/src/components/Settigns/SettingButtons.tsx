import React from 'react'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { type CurrencyWrapper, type LanguageWrapper } from '../../interfaces/types'

interface SettingButtonsProps<T> {
  settings: T[]
  currentSetting: T
  highlightColor: string
  onClick: (t: T) => void
}

export default function SettingButtons (props: SettingButtonsProps<CurrencyWrapper | LanguageWrapper>): JSX.Element {
  const discriminate = (val: CurrencyWrapper | LanguageWrapper): string => {
    if ('currency' in val) {
      return val.currency
    }
    return val.language
  }

  return (
    <Stack
      component={Paper}
      borderRadius={20}
      display='flex'
      direction='row'
      alignItems='center'
    >
      {props.settings.map((setting, idx) => (
        <Button
          key={discriminate(setting)}
          variant='outlined'
          size='small'
          onClick={() => { props.onClick(setting) }}
          sx={{
            maxWidth: '40px',
            maxHeight: '40px',
            minWidth: '40px',
            minHeight: '40px',
            borderRadius: 0,
            borderTopLeftRadius: idx === 0 ? 20 : 0,
            borderBottomLeftRadius: idx === 0 ? 20 : 0,
            borderTopRightRadius: idx === props.settings.length - 1 ? 20 : 0,
            borderBottomRightRadius: idx === props.settings.length - 1 ? 20 : 0,
            borderLeft: idx === 0 ? '1px soild' : 0,
            bgcolor: JSON.stringify(setting) === JSON.stringify(props.currentSetting) ? props.highlightColor : 'white',
            ':hover': {
              bgcolor: props.highlightColor
            }
          }}
        >
          <Typography fontWeight={400}>
            {discriminate(setting)}
          </Typography>
        </Button>
      ))}
    </Stack>
  )
};
