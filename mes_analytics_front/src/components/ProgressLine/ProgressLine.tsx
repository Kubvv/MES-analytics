import React from 'react'
import { Box } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useTypeDispatch } from '../../services/hooks'
import { projectHovered, projectUnHovered } from '../../services/slices/projectHighlightSlice'
import 'tippy.js/dist/tippy.css'

interface ProgressLineProps {
  width: string
  mostLost: string[]
  backgroundColor: string
  tooltip?: string | JSX.Element
  hoverHiglight: boolean
  render?: boolean
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

  if (props.render === true) {
    return (
      <div
        style={{
          width: `${props.width}%`,
          backgroundColor: props.backgroundColor
        }}
        data-tippy-content={props.tooltip}
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
