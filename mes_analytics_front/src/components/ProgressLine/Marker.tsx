import React from 'react'
import { Box, Typography } from '@mui/material'

export interface MarkerType {
  widthOffset: string
  text: string
}

interface MarkerProps {
  marker: MarkerType
  paddingBottom: string
  isTop: boolean
}

export default function Marker (props: MarkerProps): JSX.Element {
  const arrowOffset = 0.5
  const arrow = props.isTop ? '↓' : '↑'
  const percent = parseInt(props.marker.widthOffset)

  if (percent > 50) {
    const margin = Math.max(100 - percent - arrowOffset, 0)

    return (
      <Box
        height='10px'
        marginRight={`${margin}%`}
        paddingBottom='2px'
      >
        <Typography fontSize={10} align='right' noWrap>
          {`${props.marker.text} ${arrow}`}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      height='10px'
      marginLeft={`${percent}%`}
      paddingBottom={props.paddingBottom}
    >
      <Typography fontSize={10} align='left' noWrap>
        {`${arrow} ${props.marker.text}`}
      </Typography>
    </Box>
  )
}
