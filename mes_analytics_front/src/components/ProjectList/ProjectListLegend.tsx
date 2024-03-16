import React from 'react'
import {
  Box,
  Paper,
  Typography,
  Stack
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { notEnoughFinalBugdetColor, notEnoughInitialBudgetColor, pickedColor } from '../../interfaces/colors'

export default function ProjectListLegend (): JSX.Element {
  const { t } = useTranslation()
  const legendColors = [notEnoughInitialBudgetColor, notEnoughFinalBugdetColor, pickedColor]
  const explanations = [
    t('legend-init-not-enough'),
    t('legend-final-not-enough'),
    t('legend-picked')
  ]

  return (
    <Stack
      component={Paper}
      display='flex'
      direction='column'
      justifyContent='space-between'
      padding={2}
      sx={{
        maxWidth: '50%'
      }}
    >
      {legendColors.map((color, idx) => (
        <Stack
          key={color}
          display='flex'
          direction='row'
          alignItems='center'
          gap={1}
        >
          <Box
            minWidth='20px'
            minHeight='20px'
            width='20px'
            height='20px'
            sx={{ backgroundColor: legendColors[idx] }}
          />
          <Typography>
            {explanations[idx]}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
};
