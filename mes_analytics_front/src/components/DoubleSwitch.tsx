import { Paper, Stack, Switch, Typography, Box } from '@mui/material'
import React from 'react'

interface DoubleSwitchProps {
  title: string
  leftText: string
  rightText: string
  onSwitch: () => void
}

export default function DoubleSwitch (props: DoubleSwitchProps): JSX.Element {
  return (
    <Stack
      component={Paper}
      display='flex'
      direction='column'
      padding={2}
    >
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='subtitle1'>
          {props.title}
        </Typography>
      </Box>
      <Stack
        display='flex'
        direction='row'
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='subtitle1'>
            {props.leftText}
          </Typography>
        </Box>
        <Switch
          onClick={props.onSwitch}
        />
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='subtitle1'>
            {props.rightText}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}
