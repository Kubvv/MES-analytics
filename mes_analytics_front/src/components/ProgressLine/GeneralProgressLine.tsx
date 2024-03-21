import React, { useState, useEffect } from 'react'
import { type Project } from '../../interfaces/types'
import ProgressLines, { type WidthType } from './ProgressLines'
import { List, ListItem, Typography } from '@mui/material'
import { useTypeSelector } from '../../services/hooks'
import { useTranslation } from 'react-i18next'
import { type MarkerType } from './Marker'

interface GeneralProgressLineProps {
  project: Project
  maxWidth: number
  render?: boolean
}

export default function GeneralProgressLine (props: GeneralProgressLineProps): JSX.Element {
  const calculateWidths = (): WidthType[] => {
    const finalPercentage = (props.project.finalBudget * 100 / props.maxWidth).toFixed(4)
    const initalPercentage = ((props.project.initialBudget - props.project.finalBudget) * 100 / props.maxWidth).toFixed(4)
    return [{ key: 'finalBudget', width: finalPercentage }, { key: 'initBudget', width: initalPercentage }]
  }

  const calcualteMarker = (num: number, text: string): MarkerType => {
    const widthOffset = ((num * 100 / props.maxWidth)).toFixed(4)
    return {
      widthOffset,
      text: `${num.toFixed(0)} (${text})`
    }
  }

  const { t } = useTranslation()
  const costText = t('cost')
  const budgetText = t('budget')
  const [widths, setWidths] = useState<WidthType[]>(
    props.render === true
      ? calculateWidths()
      : [{ key: 'finalBudget', width: '0' }, { key: 'initBudget', width: '0' }]
  )
  const [upperMarker, setUpperMarker] = useState<MarkerType>(calcualteMarker(props.project.cost, costText))
  const [lowerMarker, setLowerMarker] = useState<MarkerType>(calcualteMarker(props.project.initialBudget, budgetText))
  const currentCurrency = useTypeSelector((state) => state.currency.currency)

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(calculateWidths())
      setUpperMarker(calcualteMarker(props.project.cost, costText))
      setLowerMarker(calcualteMarker(props.project.initialBudget, budgetText))
    })
  }, [props.project, props.maxWidth, costText, budgetText])

  const budgetLostArr = Object.keys(props.project.budgetLost).map(key => [key, props.project.budgetLost[key as keyof typeof props.project.budgetLost]] as [string, number])
  budgetLostArr.sort(function (first, second) {
    return second[1] - first[1]
  })
  const mostLost = budgetLostArr.slice(0, 3)

  const backgroundColors = ['rgba(0, 102, 255, 0.75)', 'rgba(255, 102, 102, 0.75)']

  const tooltips = props.render === true
    ? [
        props.project.wasPicked ? `<html><body><p>${t('first-bar-picked-tooltip', { final: props.project.finalBudget.toFixed(2), cost: props.project.cost.toFixed(2), currency: currentCurrency })}</p></body></html>` : `<html><body><p>${t('first-bar-discard-tooltip', { final: props.project.finalBudget.toFixed(2), cost: props.project.cost.toFixed(2), currency: currentCurrency })}</p></body></html>`,
        [`<html><body><div><p>${t('second-bar-tooltip', { init: props.project.initialBudget.toFixed(2), spent: (props.project.initialBudget - props.project.finalBudget).toFixed(2), currency: currentCurrency })}</p><ul>`,
          ...mostLost.map((lost) => {
            return `<li key={lost[0]}><p>• ${lost[0].split(' ').slice(0, 3).join(' ')}...: ${lost[1].toFixed(2)}${currentCurrency}</p></li>`
          }),
          '</ul></div></body></html>'
        ].join('')
      ]
    : [
        props.project.wasPicked ? <Typography variant='subtitle2'>{t('first-bar-picked-tooltip', { final: props.project.finalBudget.toFixed(2), cost: props.project.cost.toFixed(2), currency: currentCurrency })}</Typography> : <Typography variant='subtitle2'>{t('first-bar-discard-tooltip', { final: props.project.finalBudget.toFixed(2), cost: props.project.cost.toFixed(2), currency: currentCurrency })}</Typography>,
        <>
          <Typography variant='subtitle2'>
          {t('second-bar-tooltip', { init: props.project.initialBudget.toFixed(2), spent: (props.project.initialBudget - props.project.finalBudget).toFixed(2), currency: currentCurrency })}
          </Typography>
          <List>
            {mostLost.map((lost) => (
              <ListItem key={lost[0]}>
                <Typography variant='subtitle2'>
                  • {lost[0].split(' ').slice(0, 3).join(' ')}...: {lost[1].toFixed(2)}{currentCurrency}
                </Typography>
              </ListItem>
            ))}
          </List>
        </>
      ]

  return (
    <ProgressLines
      maxWidth={props.maxWidth}
      widths={widths}
      mostLost={mostLost.map((lost) => lost[0])}
      upperMarker={upperMarker}
      lowerMarker={lowerMarker}
      backgroundColors={backgroundColors}
      tooltips={tooltips}
      hoverHiglights={[false, true]}
      render={props.render}
    />
  )
};
