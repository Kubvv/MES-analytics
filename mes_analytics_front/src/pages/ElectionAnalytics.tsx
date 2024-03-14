import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { fetchPredefinedAnalytics, fetchUploadedAnalytics } from '../api/Calls'
import ProjectList from '../components/ProjectList/ProjectList'
import ElectionForm from '../components/ElectionForm'
import { useSnackbar } from 'notistack'
import { type Project, type ElectionFormValues } from '../interfaces/types'
import Settings from '../components/Settigns/Settings'
import { useTranslation } from 'react-i18next'

export default function ElectionAnalytics (): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([])
  const [fetching, setFetching] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const loadPredefined = async (election: string, exhaust: boolean): Promise<void> => {
    setFetching(true)
    void fetchPredefinedAnalytics(election, exhaust).then(([status, data]) => {
      if (!status) {
        enqueueSnackbar(`${t('failed-election-notification')} ${election}`, { variant: 'error' })
      } else {
        const projects = JSON.parse(data)
        enqueueSnackbar(t('success-election-notification'), { variant: 'success' })
        setProjects(projects)
        setFetching(false)
      }
    })
  }

  const loadUploaded = async (election: File, exhaust: boolean): Promise<void> => {
    setFetching(true)
    void fetchUploadedAnalytics(election, exhaust).then(([status, data]) => {
      if (!status) {
        enqueueSnackbar(`${t('failed-election-notification')} ${election.name}`, { variant: 'error' })
      } else {
        const projects = JSON.parse(data)
        enqueueSnackbar(t('success-election-notification'), { variant: 'success' })
        setProjects(projects)
        setFetching(false)
      }
    })
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
      <Box
        width='90%'
      >
        <ProjectList
          projects={projects}
        />
      </Box>
    </Grid>
  )
}
