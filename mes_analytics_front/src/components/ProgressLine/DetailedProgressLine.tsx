import React, { useEffect, useState } from 'react'
import { type Project } from '../../interfaces/types'
import ProgressLines from './ProgressLines'
import { useTranslation } from 'react-i18next'

interface DetailedProgressLineProps {
  project: Project
  backgroundColors: string[]
  maxWidth: number
}

export default function DetailedProgressLine (props: DetailedProgressLineProps): JSX.Element {
  const budgetLost = props.project.budgetLost
  const budgetLostKeys = Object.keys(budgetLost)

  const [widths, setWidths] = useState(props.backgroundColors.map((_bgcolor) => '0'))
  const [upperMarker, setUpperMarker] = useState({
    widthOffset: '0',
    text: ''
  })
  const [lowerMarker, setLowerMarker] = useState({
    widthOffset: '0',
    text: ''
  })
  const { t } = useTranslation()
  const costText = t('cost')
  const budgetText = t('budget')

  useEffect(() => {
    requestAnimationFrame(() => {
      const finalBudgetWidth = (props.project.finalBudget * 100 / props.maxWidth).toFixed(4)
      const lostWidths = budgetLostKeys.map((key) => {
        return ((budgetLost[key as keyof typeof budgetLost] * 100 / props.maxWidth)).toFixed(4)
      })
      console.log(props.project.cost)
      console.log(props.project.cost * 100)
      console.log(props.project.cost * 100 / props.maxWidth)

      const upperWidthOffset = ((props.project.cost * 100 / props.maxWidth)).toFixed(4)
      const lowerWidthOffset = ((props.project.initialBudget * 100 / props.maxWidth)).toFixed(4)
      setWidths([finalBudgetWidth, ...lostWidths])
      setUpperMarker({
        widthOffset: upperWidthOffset,
        text: `${props.project.cost.toFixed(0)} (${costText})`
      })
      setLowerMarker({
        widthOffset: lowerWidthOffset,
        text: `${props.project.initialBudget.toFixed(0)} (${budgetText})`
      })
    })
  }, [props.project, props.maxWidth, costText, budgetText])

  return (
    <ProgressLines
      maxWidth={props.maxWidth}
      widths={widths}
      mostLost={budgetLostKeys}
      upperMarker={upperMarker}
      lowerMarker={lowerMarker}
      backgroundColors={props.backgroundColors}
      tooltips={undefined}
      hoverHiglights={undefined}
    />
  )
};
