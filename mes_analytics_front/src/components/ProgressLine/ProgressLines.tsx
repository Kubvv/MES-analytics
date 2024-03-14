import React from 'react'
import { Box, Stack } from '@mui/material'
import ProgressLine from './ProgressLine'
import Marker from './Marker'

interface MarkerType {
  widthOffset: string
  text: string
}

interface ProgressLinesProps {
  maxWidth: number
  widths: string[]
  mostLost: string[]
  upperMarker: MarkerType
  lowerMarker: MarkerType
  backgroundColors: string[]
  tooltips: JSX.Element[] | undefined
  hoverHiglights: boolean[] | undefined
}

export default function ProgressLines (props: ProgressLinesProps): JSX.Element {
  const tooltips = props.tooltips === undefined ? props.widths.map((_w) => undefined) : props.tooltips
  const hoverHiglights = props.hoverHiglights === undefined ? props.widths.map((_w) => false) : props.hoverHiglights

  return (
    <Stack
      display='flex'
      direction='column'
    >
      <Marker
        marker={props.upperMarker}
        paddingBottom='2px'
        isTop
      />
      <Box
        display='flex'
        height='12px'
        minWidth='100px'
        margin='4px 0 0 0'
        sx={{
          backgroundColor: 'white'
        }}
        border='solid 1px'
      >
        {props.widths.map((width, idx) => (
          <ProgressLine
            key={idx}
            width={width}
            mostLost={props.mostLost}
            backgroundColor={props.backgroundColors[idx]}
            tooltip={tooltips[idx]}
            hoverHiglight={hoverHiglights[idx]}
          />
        ))}
      </Box>
      <Marker
        marker={props.lowerMarker}
        paddingBottom='5px'
        isTop={false}
      />
    </Stack>
  )
};
