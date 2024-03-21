import React, { useEffect, useState } from 'react'
import { type Project } from '../../interfaces/types'
import ProgressLines, { type WidthType } from './ProgressLines'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import { useTypeSelector } from '../../services/hooks'

interface OverviewProgressLineProps {
  projects: Project[]
  backgroundColors: string[]
  maxWidth: number
  unspent: number
  render?: boolean
}

export default function OverviewProgressLine (props: OverviewProgressLineProps): JSX.Element {
  const calculateWidths = (): WidthType[] => {
    const unspentWidth = (props.unspent * 100 / props.maxWidth).toFixed(4)
    const costWidths = props.projects.map((project) => {
      return { key: project.name, width: (project.cost * 100 / props.maxWidth).toFixed(4) }
    })
    return [{ key: 'unspent ', width: unspentWidth }, ...costWidths]
  }

  const [widths, setWidths] = useState<WidthType[]>(
    props.render === true
      ? calculateWidths()
      : props.projects.map((project) => { return { key: project.name, width: '0' } })
  )
  const currentCurrency = useTypeSelector((state) => state.currency.currency)
  const { t } = useTranslation()
  const lowerMarker = {
    widthOffset: '100',
    text: `${props.maxWidth} (${t('budget')})`
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(calculateWidths())
    })
  }, [props.projects, props.maxWidth])

  const tooltips = props.render === true
    ? [
        `${t('unspent')}: ${props.unspent}${currentCurrency}`,
        ...props.projects.map((project) => {
          return `${project.name}: ${project.cost}${currentCurrency}`
        })
      ]
    : [
        <Typography key={'unspent'} variant='subtitle2'>{t('unspent')}: {props.unspent}{currentCurrency}</Typography>,
        ...props.projects.map((project) => {
          return <Typography key={project.name} variant='subtitle2'>{project.name}: {project.cost}{currentCurrency}</Typography>
        })
      ]

  return (
    <ProgressLines
      maxWidth={props.maxWidth}
      widths={widths}
      mostLost={[]}
      upperMarker={undefined}
      lowerMarker={lowerMarker}
      backgroundColors={props.backgroundColors}
      tooltips={tooltips}
      hoverHiglights={undefined}
      render={props.render}
    />
  )
};
