import React, { useState } from 'react'
import { Grid, Stack } from '@mui/material'
import { fetchPredefinedAnalytics, fetchUploadedAnalytics } from '../api/Calls'
import ProjectList from '../components/ProjectList/ProjectList'
import ElectionForm from '../components/Election/ElectionForm'
import { useSnackbar } from 'notistack'
import { type Election, type ElectionFormValues } from '../interfaces/types'
import Settings from '../components/Settigns/Settings'
import { useTranslation } from 'react-i18next'
import ElectionSummary from '../components/Election/ElectionSummary'
import { useTypeDispatch } from '../services/hooks'
import { electionLoaded } from '../services/slices/colorSlice'

import ExportButton from '../components/ExportButton'

export default function ElectionAnalytics (): JSX.Element {
  const [election, setElection] = useState<Election | undefined>(undefined)
  const [fetching, setFetching] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const dispatch = useTypeDispatch()

  const loadPredefined = async (election: string, exhaust: boolean): Promise<void> => {
    setFetching(true)
    void fetchPredefinedAnalytics(election, exhaust).then(([status, data]) => {
      void prepareData(election, status, data)
    })
  }

  const loadUploaded = async (election: File, exhaust: boolean): Promise<void> => {
    setFetching(true)
    void fetchUploadedAnalytics(election, exhaust).then(([status, data]) => {
      void prepareData(election.name, status, data)
    })
  }

  const prepareData = async (electioName: string, status: boolean, data: string): Promise<void> => {
    if (!status) {
      enqueueSnackbar(`${t('failed-election-notification')} ${electioName}: ${data}`, { variant: 'error' })
    } else {
      const election: Election = JSON.parse(data)
      enqueueSnackbar(t('success-election-notification'), { variant: 'success' })
      setElection(election)
      const barColors = ['#0066ff', ...election.projects.map((_p) => {
        return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).slice(1, 7)
      })]
      dispatch(electionLoaded(barColors))
    }
    setFetching(false)
  }

  const onFormSubmit = async (values: ElectionFormValues): Promise<void> => {
    if (values.defaultElection !== '') {
      await loadPredefined(values.defaultElection, values.exhaust)
    } else if (values.uploadedElection !== undefined) {
      await loadUploaded(values.uploadedElection, values.exhaust)
    } else {
      enqueueSnackbar(t('no-election-notification'), { variant: 'warning' })
    }
  }

  return (
    <Grid
      container
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <Settings />
      <ElectionForm
        onSubmit={onFormSubmit}
        isFetching={fetching}
      />
      {election !== undefined && (
        <Stack
          width='90%'
          display='flex'
          direction='column'
        >
          <ExportButton
            election={election}
          />
          <ElectionSummary
            election={election}
          />
          <ProjectList
            projects={election.projects}
          />
        </Stack>
      )}
    </Grid>
  )
}
