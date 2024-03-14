import React, { useState, useEffect } from 'react'
import { useTypeSelector } from '../../services/hooks'
import { Link, Popover, TableCell, TableRow, Typography } from '@mui/material'
import { type Project } from '../../interfaces/types'
import GeneralProgressLine from '../ProgressLine/GeneralProgressLine'
import ProjectPopover from '../ProjectPopover/ProjectPopover'

const notEnoughInitialBudgetColor = 'rgba(255, 102, 102, 0.75)'
const notEnoughFinalBugdetColor = 'rgba(255, 200, 102, 0.75)'
const pickedColor = 'rgb(46, 200, 46, 0.75)'
const pickedColorHighlighted = 'rgb(46, 200, 46, 0.25)'

interface ProjectRowProps {
  project: Project
  globalMaximum: boolean
  maxValue: number
}

export default function ProjectHeader (props: ProjectRowProps): JSX.Element {
  const highlights = useTypeSelector((state) => state.projectHighlight.highlights)
  const currentCurrency = useTypeSelector((state) => state.currency.currency)
  const [projectColor, setProjetColor] = useState<string>('white')
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
    if (props.project.cost > props.project.initialBudget) {
      setProjetColor(notEnoughInitialBudgetColor)
    } else if (props.project.cost > props.project.finalBudget) {
      setProjetColor(notEnoughFinalBugdetColor)
    } else if (highlights.includes(props.project.name)) {
      setProjetColor(pickedColorHighlighted)
    } else {
      setProjetColor(pickedColor)
    }
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
        <Link
          fontWeight={400}
          fontSize={16}
          onClick={(e) => { handleLinkClick(e) }}
          style={{ textDecoration: 'none', cursor: 'pointer', color: 'black' }}>
            {props.project.name}
        </Link>
      </TableCell>
      <TableCell align="right"><Typography fontWeight={400} fontSize={16}>{props.project.cost}{currentCurrency}</Typography></TableCell>
      <TableCell align="right"><Typography fontWeight={400} fontSize={16}>{props.project.voteCount}</Typography></TableCell>
      <TableCell align="right" width={'25%'} sx={{ padding: '12px' }}>
        <GeneralProgressLine
          project={props.project}
          maxWidth={props.globalMaximum ? props.maxValue : Math.max(props.project.initialBudget, props.project.cost)}
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
