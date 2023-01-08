import React, { useState } from "react"
import ReactDatePicker from "react-datepicker"
import './calendarStyles.scss'


export const Calendar = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    monthsDisplayed,
    afterChange,
    ...props
  }) => {
        
    function handleDateChange (dates) {
      afterChange(dates[0], dates[1])
    }

      return (
        <ReactDatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          monthsShown={monthsDisplayed}
          minDate={new Date()}
          selectsRange
          inline
          {...props}
        />
    )
  }