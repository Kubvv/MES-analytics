import React from 'react'
import {
  Box,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useTypeSelector } from '../../services/hooks'
import { type Project, type Election } from '../../interfaces/types'
import OverviewProgressLine from '../ProgressLine/OverviewProgressLine'

interface ElectionSummaryProps {
  election: Election
}

export default function ElectionSummary (props: ElectionSummaryProps): JSX.Element {
  const { t } = useTranslation()
  const currentCurrency = useTypeSelector((state) => state.currency.currency)
  const barColors = useTypeSelector((state) => state.color.colors)
  const pickedProjects = props.election.projects.filter((proj: Project) => { return proj.wasPicked })
  const pickedSum = props.election.projects.map((proj: Project) => proj.wasPicked ? proj.cost : 0).reduce((a: number, b: number) => a + b)
  const exhaust: boolean = props.election.exhaust
  const unspent = (props.election.initialBudget - pickedSum)

  return (
    <Stack
      component={Paper}
      width='90%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      gap={1}
      margin={4}
      padding={4}
    >
      <Typography align='center' fontWeight={600} variant='h6'>{t('summary', { name: props.election.name })}</Typography>
      <Typography align='center'>{t('election-overview-1')} <strong>{props.election.initialBudget}{currentCurrency}</strong>. <strong>{props.election.voteCount}</strong> {t('election-overview-2')} <strong>{(props.election.initialBudget / props.election.voteCount).toFixed(2)}{currentCurrency}</strong> {t('election-overview-3')}</Typography>
      {exhaust && (
        <Typography align='center'>{t('election-overview-4')}<strong>{props.election.finalBudgetPerVoter}{currentCurrency}</strong>.</Typography>
      )}
      <Typography align='center'>{t('election-overview-5', { length: props.election.projects.length })} <strong>{pickedProjects.length}</strong> {t('election-overview-6')} <strong>{pickedSum}{currentCurrency}</strong>. <strong>{unspent.toFixed(2)}{currentCurrency}</strong> {t('election-overview-7')}</Typography>
      <Typography marginTop={2} align='center'>{t('election-budget-overview')}</Typography>
      <Box
        width='100%'
      >
        <OverviewProgressLine
          projects={pickedProjects}
          maxWidth={props.election.initialBudget}
          backgroundColors={barColors}
          unspent={unspent}
        ></OverviewProgressLine>
      </Box>
    </Stack>
  )
};
