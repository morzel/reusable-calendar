import React, { MouseEvent } from 'react'

interface DatePickerProps {
  date: Date
  value: number
  onSelectDate(date: Date): void
  className?: string
  isToday: boolean
}

/**
 * component to pick a day in calendar
 *
 * @param {Date} visibleDate
 * @param {Function} changeMonth
 * @param {string} className
 */

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  const onChangeSetDate = (evt: MouseEvent<HTMLDivElement>) => {
    evt.preventDefault()
    props.onSelectDate(props.date)
  }

  return (
    <div
      className={props.className}
      onClick={onChangeSetDate}
      key={props.date.getTime()}
    >
      <span className={'day-value'}>
        {props.value}
        {props.isToday && <div className={'today-mark'}></div>}
      </span>
    </div>
  )
}
