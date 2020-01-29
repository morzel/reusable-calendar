import React from 'react'
import styled from 'styled-components'

import { DatePicker } from './date-picker'
import { Colors } from '../../lib/style-guide'
import { getWeekDays } from '../../lib/calendar'
import { getVisibleDays } from '../../lib/calendar'

interface CalendarBodyProps {
  selected: Date
  visibleDate: Date
  onSelectDate(date: Date): void
  className?: string
}

/**
 * component for calendar body
 *
 * @param {Date} selected
 * @param {Date} visibleDate
 * @param {Function} onSelectDate
 * @param {string} className
 */

const CalendarBody: React.FunctionComponent<CalendarBodyProps> = (props) => {
  const weekDays = getWeekDays()
  const visibleDate = props.visibleDate
  const year = visibleDate.getFullYear()
  const month = visibleDate.getMonth()
  const { startCurrent, endCurrent, days } = getVisibleDays(month, year)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className={props.className}>
      <div className={'one-week'}>
        {weekDays.map((day, index) => (
          <div className={'single-box invisible-day'} key={'weekday' + index}>
            <span className={'day-value'}>{day}</span>
          </div>
        ))}
      </div>
      {Array(6)
        .fill(0)
        .map((_, row) => (
          <div className={'one-week'} key={'daybox' + row}>
            {weekDays.map((_, col) => {
              let date = new Date(visibleDate)
              date.setHours(0, 0, 0, 0)

              let isToday = false
              let classBox = 'on-days visible-day'

              const index = weekDays.length * row + col
              if (index < startCurrent || index > endCurrent) {
                classBox = 'on-days invisible-day'
                date = new Date(year, month + (index < startCurrent ? -1 : 1))
              }
              date = new Date(date.setDate(days[index]))
              if (date.getTime() == props.selected.getTime()) {
                classBox = 'selected-day'
              }
              if (today.getTime() == date.getTime()) {
                isToday = true
              }

              return (
                <DatePicker
                  date={date}
                  className={`single-box ${classBox}`}
                  onSelectDate={props.onSelectDate}
                  value={days[index]}
                  isToday={isToday}
                  key={date.getTime()}
                />
              )
            })}
          </div>
        ))}
    </div>
  )
}

const StyledCalendarBody = styled(CalendarBody)`
  width: 280px;
  height: 280px;
  margin: 10px auto;

  .single-box {
    width: 40px;
    height: 40px;
    background-color: ${Colors.PureWhite};
    text-align: center;
    align-items: center;
    display: inline-grid;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    display: inline-block;
  }

  .on-days:hover {
    background-color: ${Colors.BG2};
    cursor: pointer;
  }

  .one-week {
    width: 280px;
    height: 40px;
    display: flex;
  }

  .invisible-day {
    color: ${Colors.TX3};
  }

  .visible-day {
    color: ${Colors.TX1};
  }

  .selected-day {
    background-color: ${Colors.AccordBlue};
    color: ${Colors.PureWhite};
    cursor: pointer;
  }

  .day-value {
    position: relative;
    top: 13px;
  }

  .today-mark {
    position: relative;
    width: 6px;
    height: 6px;
    top: 3px;
    margin: 0 auto;
    border-radius: 100%;
    background-color: ${Colors.BG5};
  }
`

export { StyledCalendarBody as CalendarBody }
