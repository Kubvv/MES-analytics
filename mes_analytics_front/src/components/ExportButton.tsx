import React from 'react'
import { Button, Stack, Box, Grid } from '@mui/material'
import { renderToString } from 'react-dom/server'
import { type Election } from '../interfaces/types'
import ElectionSummary from './Election/ElectionSummary'
import ProjectList from './ProjectList/ProjectList'
import { Provider } from 'react-redux'
import { I18nextProvider, useTranslation } from 'react-i18next'
import store from '../services/store'
import i18n from '../i18n'
import 'tippy.js/dist/tippy.css'

interface ExportButtonProps {
  election: Election
}

export default function ExportButton (props: ExportButtonProps): JSX.Element {
  const { t } = useTranslation()

  const onElectionExport = (): void => {
    const exportedElection = renderToString(
      <>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Box
              sx={{
                width: '100vw',
                maxWidth: '100%',
                minHeight: '100vh',
                overflowX: 'hidden',
                backgroundColor: '#e3e3e3'
              }}
            >
              <Grid
                container
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
                padding={4}
              >
                <Stack
                  width='90%'
                  display='flex'
                  direction='column'
                >
                  <ElectionSummary
                    election={props.election}
                    render
                  />
                  <ProjectList
                    projects={props.election.projects}
                    render
                  />
                </Stack>
              </Grid>
            </Box>
          </I18nextProvider>
        </Provider>
      </>
    )

    const styleSheets = document.styleSheets
    let allStyles = ''
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i]
      const rules = styleSheet.cssRules

      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j]
        allStyles += rule.cssText + '\n'
      }
    }
    const styleBlock = `<style>${allStyles}</style>`

    const tippyScripts = '<script src="https://unpkg.com/popper.js@1"></script><script src="https://unpkg.com/tippy.js@5"></script><script>tippy(\'[data-tippy-content]\', { allowHTML: true })</script>'

    const finalExport = '\ufeff' + exportedElection + styleBlock + tippyScripts
    const blob = new Blob([finalExport], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `${props.election.name}.html`
    link.href = url
    link.click()
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Button
        variant='contained'
        onClick={onElectionExport}
        sx={{
          minWidth: '100px',
          paddingX: 1
        }}
      >
        {t('export-results')}
      </Button>
    </Box>
  )
}
