
import React from 'react'
import {
  Box,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type Project } from '../../interfaces/types'
import { useTypeSelector } from '../../services/hooks'
import DetailedProgressLine from '../ProgressLine/DetailedProgressLine'

interface ProjectPopoverProps {
  project: Project
}

export default function ProjectPopover (props: ProjectPopoverProps): JSX.Element {
  const { t } = useTranslation()
  const currentCurrency = useTypeSelector((state) => state.currency.currency)
  const barColors = useTypeSelector((state) => state.color.colors)

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <Paper sx={{ minWidth: '300px', maxWidth: '900px', padding: '15px' }}>
      <Typography fontWeight={600} variant='h6'>
          {props.project.name}
      </Typography>
      <Typography variant='subtitle1'>
          {`${capitalize(t('vote-count'))}: ${props.project.voteCount}`}
      </Typography>
      <Typography variant='subtitle1'>
          {`${t('initial-budget')}: ${props.project.initialBudget.toFixed(2)}${currentCurrency}`}
      </Typography>
      <Stack
        display='flex'
        direction='row'
        alignItems='center'
        gap={1}
      >
        <Typography variant='subtitle1'>
            {`${t('final-budget')}: ${props.project.finalBudget.toFixed(2)}${currentCurrency}`}
        </Typography>
        <Box
          width='20px'
          height='20px'
          sx={{ backgroundColor: barColors[0] }}
        />
      </Stack>
      {Object.keys(props.project.budgetLost).length > 0 && (
        <>
          <Typography variant='subtitle1'>
              {`${capitalize(t('budget-overview'))}:`}
          </Typography>
          { Object.keys(props.project.budgetLost).map((key, idx) => (
            <Stack
              key={key}
              display='flex'
              direction='row'
              alignItems='center'
              gap={1}
            >
              <Typography>
                {`• ${key} - ${props.project.budgetLost[key as keyof typeof props.project.budgetLost].toFixed(2)}${currentCurrency}`}
              </Typography>
              <Box
                width='20px'
                height='20px'
                sx={{ backgroundColor: barColors[idx + 1] }}
              />
            </Stack>
          ))}
        </>
      )}
      <Typography variant='subtitle1'>
          {`${t('total-budget-lost')}: ${(props.project.initialBudget - props.project.finalBudget).toFixed(2)}${currentCurrency}`}
      </Typography>
      <DetailedProgressLine
        project={props.project}
        backgroundColors={barColors}
        maxWidth={Math.max(props.project.initialBudget, props.project.cost)}
      />
    </Paper>
  )
}
