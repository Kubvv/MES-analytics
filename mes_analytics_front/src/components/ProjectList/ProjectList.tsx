import React, { useState, useEffect, useMemo } from 'react'
import {
  TableContainer,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Stack
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { type Project, type Order, type SortableProjectkey } from '../../interfaces/types'
import DoubleSwitch from '../DoubleSwitch'
import ProjectHeader from './ProjectHeader'
import ProjectRow from './ProjectRow'
import { stableSort, getComparator } from './Sorter'
import { useTranslation } from 'react-i18next'
import ProjectListLegend from './ProjectListLegend'

interface ProjectListProps {
  projects: Project[]
  render?: boolean
}

export default function ProjectList (props: ProjectListProps): JSX.Element {
  const calculateMaxValue = (): number => {
    const projectMaxes = props.projects.map((project): number => {
      return Math.max(project.cost, project.initialBudget)
    })
    return Math.max(...projectMaxes)
  }

  const [maxValue, setMaxValue] = useState(calculateMaxValue())
  const [globalMaximum, setGlobalMaximum] = useState(true)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<SortableProjectkey>('roundNumber')
  const { t } = useTranslation()

  useEffect(() => {
    setMaxValue(calculateMaxValue())
    setOrder('asc')
    setOrderBy('roundNumber')
  }, [props.projects])

  const handleRequestSort = (
    property: SortableProjectkey
  ): void => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const visibleRows = useMemo(
    () =>
      stableSort(props.projects, getComparator(order, orderBy)),
    [order, orderBy, props.projects]
  )

  if (props.projects.length === 0) {
    return <></>
  }

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const effHeader: { label: string, sorter: SortableProjectkey } = { label: capitalize(t('effective-support')), sorter: 'effectiveSupport' }
  const headers: Array<{ label: string, sorter: SortableProjectkey }> = [
    { label: capitalize(t('round')), sorter: 'roundNumber' },
    { label: capitalize(t('name')), sorter: 'name' },
    { label: capitalize(t('cost')), sorter: 'cost' },
    { label: capitalize(t('vote-count')), sorter: 'voteCount' },
    ...props.projects[0].effectiveSupport === -1 ? [] : [effHeader],
    { label: capitalize(t('budget-overview')), sorter: 'finalBudget' }
  ]

  return (
    <>
    <Stack
      width='100%'
      display='flex'
      direction='row'
      justifyContent='space-between'
      alignItems='end'
    >
      <ProjectListLegend/>
      {props.render !== true && <DoubleSwitch
        title={t('scale-maximum-value')}
        leftText={t('global-value')}
        rightText={t('local-value')}
        onSwitch={() => { setGlobalMaximum(!globalMaximum) }}
      />}
    </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
              <TableRow>
                {headers.map((header, idx) => (
                  <ProjectHeader
                    key={header.label}
                    header={header}
                    orderBy={orderBy}
                    order={order}
                    side={idx < 2 ? 'left' : 'right'}
                    onSort={handleRequestSort}
                    render={props.render}
                  />
                ))}
              </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((project) => (
              <ProjectRow
                key={project.name}
                project={project}
                globalMaximum={globalMaximum}
                maxValue={maxValue}
                render={props.render}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};
