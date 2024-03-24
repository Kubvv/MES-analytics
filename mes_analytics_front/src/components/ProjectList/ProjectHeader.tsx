import { TableCell, TableSortLabel } from '@mui/material'
import { type Order, type SortableProjectkey } from '../../interfaces/types'
import React from 'react'

interface ProjectHeaderProps {
  header: { label: string, sorter: SortableProjectkey }
  order: Order
  orderBy: SortableProjectkey
  side: 'left' | 'right'
  onSort: (property: SortableProjectkey) => void
  render?: boolean
}

export default function ProjectHeader (props: ProjectHeaderProps): JSX.Element {
  const header = props.header

  return (
    <TableCell key={header.label} align={props.side} variant="head" sx={{ fontWeight: 600 }}>
      {props.render === true
        ? <>
          {header.label}
        </>
        : <TableSortLabel
          active={props.orderBy === header.sorter}
          direction={props.orderBy === header.sorter ? props.order : 'asc'}
          onClick={() => { props.onSort(header.sorter) }}
        >
          {header.label}
        </TableSortLabel>
      }
    </TableCell>
  )
}
