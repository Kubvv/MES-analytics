import React from 'react'
import { Box } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useTypeDispatch } from '../../services/hooks'
import { projectHovered, projectUnHovered } from '../../services/slices/projectHighlightSlice'

interface ProgressLineProps {
  width: string
  mostLost: string[]
  backgroundColor: string
  tooltip: JSX.Element | undefined
  hoverHiglight: boolean
}

export default function ProgressLine (props: ProgressLineProps): JSX.Element {
  const dispatch = useTypeDispatch()

  const handleOnHover = (hovered: boolean): void => {
    if (props.hoverHiglight) {
      hovered ? dispatch(projectHovered(props.mostLost)) : dispatch(projectUnHovered())
    }
  }

  if (props.tooltip === undefined) {
    return (
      <Box
        width={`${props.width}%`}
        onMouseOver={() => { handleOnHover(true) }}
        onMouseOut={() => { handleOnHover(false) }}
        sx={{
          backgroundColor: props.backgroundColor,
          transition: 'width 2s'
        }}
      />
    )
  }

  return (
    <Tooltip
      title={props.tooltip}
      placement='bottom'
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            maxWidth: '400px'
          }
        }
      }}
    >
      <Box
        width={`${props.width}%`}
        onMouseOver={() => { handleOnHover(true) }}
        onMouseOut={() => { handleOnHover(false) }}
        sx={{
          backgroundColor: props.backgroundColor,
          transition: 'width 2s'
        }}
      >
      </Box>
    </Tooltip>
  )
};
