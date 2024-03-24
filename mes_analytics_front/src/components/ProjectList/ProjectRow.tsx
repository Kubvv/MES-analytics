import React, { useState, useEffect } from 'react'
import { useTypeSelector } from '../../services/hooks'
import { Link, Popover, TableCell, TableRow, Typography } from '@mui/material'
import { type Project } from '../../interfaces/types'
import GeneralProgressLine from '../ProgressLine/GeneralProgressLine'
import ProjectPopover from '../ProjectPopover/ProjectPopover'
import { notEnoughFinalBugdetColor, notEnoughInitialBudgetColor, pickedColorHighlighted, pickedColor } from '../../interfaces/colors'

interface ProjectRowProps {
  project: Project
  globalMaximum: boolean
  maxValue: number
  render?: boolean
}

export default function ProjectHeader (props: ProjectRowProps): JSX.Element {
  const chooseColor = (): string => {
    if (props.project.cost > props.project.initialBudget) {
      return notEnoughInitialBudgetColor
    }
    if (props.project.cost > props.project.finalBudget) {
      return notEnoughFinalBugdetColor
    }
    if (highlights.includes(props.project.name)) {
      return pickedColorHighlighted
    }
    return pickedColor
  }

  const highlights = useTypeSelector((state) => state.projectHighlight.highlights)
  const currentCurrency = useTypeSelector((state) => state.currency.currency)
  const [projectColor, setProjetColor] = useState<string>(
    props.render === true
      ? chooseColor()
      : 'white'
  )
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(null)

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (): void => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? `popover-${props.project.name}` : undefined

  useEffect(() => {
    setProjetColor(chooseColor())
  }, [props.project, highlights])

  return (
    <TableRow
      key={props.project.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: projectColor }}
      >
      <TableCell component="th" scope="row">
        <Typography fontWeight={400} fontSize={16}>{props.project.roundNumber}</Typography>
      </TableCell>
      <TableCell align="left">
        {props.render === true
          ? <Typography
            fontWeight={400}
            fontSize={16}
          >
            {props.project.name}
          </Typography>
          : <Link
            fontWeight={400}
            fontSize={16}
            onClick={(e) => { handleLinkClick(e) }}
            sx={{ cursor: 'pointer', color: 'black', textDecorationColor: 'black' }}>
            {props.project.name}
          </Link>
        }
      </TableCell>
      <TableCell align="right"><Typography fontWeight={400} fontSize={16}>{props.project.cost}{currentCurrency}</Typography></TableCell>
      <TableCell align="right"><Typography fontWeight={400} fontSize={16}>{props.project.voteCount}</Typography></TableCell>
      <TableCell align="right" width={'10%'}><Typography fontWeight={400} fontSize={16}>{Math.round(props.project.effectiveVoteCount)}</Typography></TableCell>
      <TableCell align="right" width={'25%'} sx={{ padding: '12px' }}>
        <GeneralProgressLine
          project={props.project}
          maxWidth={props.globalMaximum ? props.maxValue : Math.max(props.project.initialBudget, props.project.cost)}
          render={props.render}
        />
      </TableCell>
      <Popover
        anchorReference={'none'}
        id={id}
        open={open}
        onClose={handlePopoverClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(5px)'
        }}
      >
        <ProjectPopover project={props.project}></ProjectPopover>
      </Popover>
    </TableRow>
  )
}
