import React from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { type TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { Box } from '@mui/material'
// import { useTypeDispatch } from '../../services/hooks'
// import { projectHovered, projectUnHovered } from '../../services/slices/projectHighlightSlice'

interface ProgressLineProps {
  width: string
  mostLost: string[]
  backgroundColor: string
  tooltip: JSX.Element | undefined
  hoverHiglight: boolean
}

export default function ProgressLine (props: ProgressLineProps): JSX.Element {
  // const dispatch = useTypeDispatch()

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 400
    }
  })

  // const handleOnHover = (hovered: boolean): void => {
  //   if (props.hoverHiglight) {
  //     hovered ? dispatch(projectHovered(props.mostLost)) : dispatch(projectUnHovered())
  //   }
  // }

  if (props.tooltip === undefined) {
    return (
      <Box
        width={`${props.width}%`}
        sx={{
          backgroundColor: props.backgroundColor,
          transition: 'width 2s'
        }}
      />
    )
  }

  return (
    <CustomWidthTooltip
      title={props.tooltip}
      placement='top'
      arrow
    >
      <Box
        width={`${props.width}%`}
        // onMouseOver={() => { handleOnHover(true) }}
        // onMouseOut={() => { handleOnHover(false) }}
        sx={{
          backgroundColor: props.backgroundColor
        }}
      />
    </CustomWidthTooltip>
  )
};
