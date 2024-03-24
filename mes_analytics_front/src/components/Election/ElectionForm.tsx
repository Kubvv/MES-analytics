
import React, { useState } from 'react'
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Stack,
  FormControlLabel,
  Checkbox,
  TextField,
  LinearProgress
} from '@mui/material'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { type ElectionFormValues } from '../../interfaces/types'
import { useTranslation } from 'react-i18next'

interface ElectionFormProps {
  onSubmit: (values: ElectionFormValues) => Promise<void>
  isFetching: boolean
}

export default function ElectionForm (props: ElectionFormProps): JSX.Element {
  const [values, setValues] = useState<ElectionFormValues>({
    defaultElection: '',
    uploadedElection: undefined,
    exhaust: false
  })
  const [clearUpload, setClearUpload] = useState(0)
  const { t } = useTranslation()

  const handleSelectChange = (event: SelectChangeEvent<string>): void => {
    setValues({ ...values, [event.target.name]: event.target.value })
    setClearUpload(1 - clearUpload)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if ('files' in event.target && event.target.files !== null) {
      setValues({ ...values, [event.target.name]: event.target.files[0], defaultElection: '' })
    }
  }

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.checked })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    await props.onSubmit(values)
  }

  const defaultElections = [{ text: 'Świecie 2023', value: 'swiecie2023' }, { text: 'Wieliczka 2023', value: 'wieliczka2023' }]

  return (
    <Paper sx={{ minWidth: '300px', width: '60%', margin: '20px', padding: '25px' }}>
        <Box component="form" onSubmit={(e) => { void handleSubmit(e) }} sx={{ width: '100%' }}>
          <Stack
            display='flex'
            direction='column'
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <FormControl sx={{ width: '40%' }}>
              <InputLabel>{t('election')}</InputLabel>
              <Select
                value={values.defaultElection}
                label={t('election')}
                name='defaultElection'
                onChange={(e) => { handleSelectChange(e) }}
              >
                {defaultElections.map((defaultElection) => (
                  <MenuItem key={defaultElection.value} value={defaultElection.value}>{defaultElection.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              key={clearUpload}
              name='uploadedElection'
              type='file'
              onChange={(e) => { handleFileChange(e) }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.exhaust}
                  name='exhaust'
                  onChange={(e) => { handleCheckChange(e) }}
                />
              }
              label={t('apply-add-1')}
            />
            <Button type='submit' variant='contained' sx={{ minWidth: '100px', paddingX: 1 }}>{t('submit')}</Button>
          </Stack>
        </Box>
        {props.isFetching ? <LinearProgress sx={{ marginTop: 4 }}/> : <></>}
    </Paper>
  )
}
