import React from 'react'
import styled from 'styled-components'

import { Colors } from '../../lib/style-guide'
import { getMonthYearDate } from '../../lib/calendar'

interface CalendarTopProps {
  visibleDate: Date
  onChangeMonth(date: Date): void
  className?: string
}

/**
 * component for calendar header
 *
 * @param {Date} visibleDate
 * @param {Function} changeMonth
 * @param {string} className
 */

const CalendarTop: React.FunctionComponent<CalendarTopProps> = (props) => {
  const year = props.visibleDate.getFullYear()
  const month = props.visibleDate.getMonth()

  const onPrevious = () => {
    const date = new Date(year, month - 1)
    props.onChangeMonth(date)
  }

  const onNext = () => {
    const date = new Date(year, month + 1)
    props.onChangeMonth(date)
  }

  return (
    <div className={props.className}>
      <div className={'top-icon-box'} onClick={onPrevious}>
        <div className={'top-icon'}></div>
      </div>
      <div className={'top-month-value'}>
        <span>{getMonthYearDate(props.visibleDate)}</span>
      </div>
      <div className={'top-icon-box'} onClick={onNext}>
        <div className={'top-icon top-icon-next'}></div>
      </div>
    </div>
  )
}

const StyledCalendarTop = styled(CalendarTop)`
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${Colors.BG1};
  padding: 10px;

  .top-icon-box {
    width: 30px;
    height: 30px;
    display: flex;

    &:hover {
      cursor: pointer;
      background-color: ${Colors.BG2};
    }
  }

  .top-icon {
    align-self: center;
    margin: 0 auto;
    width: 6px;
    height: 10px;
    border-radius: 0.5px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 6px solid ${Colors.BG4};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .top-icon-next {
    transform: rotate(-180deg);
  }

  .top-month-value {
    display: flex;
    align-items: center;
    width: calc(100% - 60px);
    height: 100%;
  }

  .top-month-value > * {
    margin: 0 auto;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 16px;
    color: ${Colors.TX1};
  }
`

export { StyledCalendarTop as CalendarTop }
