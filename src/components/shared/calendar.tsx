import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { CalendarTop } from './calendar-top'
import { CalendarBody } from './calendar-body'
import { Colors } from '../../lib/style-guide'

interface CalendarProps {
  value?: string | Date
  onChange?(value: string | Date): void
  className?: string
}

/**
 * Simple component for calendar
 *
 * @param {string} value
 * @param {Function} onChange
 * @param {string} className
 */

const Calendar: React.FunctionComponent<CalendarProps> = (props) => {
  const [selected, setSelected] = useState(new Date())
  const [visibleDate, setVisibleDate] = useState(new Date())
  const date =
    typeof props.value === 'string' ? new Date(props.value) : props.value

  if (date) setVisibleDate(date)
  if (date) setSelected(date)

  useEffect(() => {
    if (props.onChange) props.onChange(selected)
  }, [props, selected])

  const onChangeSelectedDate = (date: Date) => {
    setVisibleDate(date)
    setSelected(date)
  }

  return (
    <div className={props.className}>
      <CalendarTop
        visibleDate={visibleDate}
        onChangeMonth={(date) => setVisibleDate(date)}
      />
      <CalendarBody
        selected={selected}
        visibleDate={visibleDate}
        onSelectDate={onChangeSelectedDate}
      />
    </div>
  )
}

const StyledCalendar = styled(Calendar)`
  width: 320px;
  height: 360px;
  align-self: center;
  margin: 0 auto;
  background: ${Colors.PureWhite};
  border: 1px solid ${Colors.BG1};
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(50, 73, 100, 0.1);
`

export { StyledCalendar as Calendar }
