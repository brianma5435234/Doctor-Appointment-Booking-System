
import React, { Children, useEffect, useState } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
moment.locale("en-GB");

const EventComponent = ({ event }) => {
    return (
        <>
            <div >
                {moment(event.start).format('ha')}{' - '}{moment(event.end).format('ha')}
            </div>
        </>
    )
}

const eventPropGetter = (event, start, end, isSelected) => {
    return {
        style: {
            backgroundColor: `#${event.hexColor}`,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
            pointerEvents: 'none',
        }
    };
}

/**
 * 
 * @param {moment} date_moment 
 * @param {event} events
 * @returns {boolean} 
 */
const isAvailableToBeBooked = (date_moment, events) => {
    return events.some(event => date_moment.isSame(event.start, 'day'));
}

export const CustomCalendar = ({ events, height, currentCalendarDate, showToolbar = true, onClick_dateGrid,
    userSelectedDate }) => {
    return <>
        <Calendar
            localizer={momentLocalizer(moment)}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            date={currentCalendarDate}
            views={['month']}
            style={{ height }}
            selectable
            popup
            showMultiDayTimes
            toolbar={showToolbar}
            onSelectSlot={(data) => {
                const date_moment = moment(data.start)
                if (isAvailableToBeBooked(date_moment, events)) {
                    onClick_dateGrid(date_moment)
                }
                return false
            }}
            longPressThreshold={20} // we need to set this value in order to make it support mobile device
            dayPropGetter={(date) => {
                const date_moment = moment(date)
                let backgroundColor;
                if (isAvailableToBeBooked(date_moment, events)) {
                    backgroundColor = date_moment.isSame(userSelectedDate) ? 'lightgreen' : 'white'
                } else {
                    backgroundColor = '#ececec'
                }
                return {
                    style: {
                        backgroundColor,
                    }
                }
            }}
            components={{
                event: EventComponent,
                // dateCellWrapper:DateCellWrapper
                // eventWrapper:EventComponent,
                // eventWrapper:eventWrapper,
            }}
            eventPropGetter={eventPropGetter}
            slotGroupPropGetter={{ color: 'red', backgroundColor: 'red' }}
            // popup={true}
            // messages={{
            //     showMore:
            //         (target) => <span style={{pointerEvents:'none'}} role="presentation"
            //            >
            //             ...{target}ss</span>
            // }}
            showAllEvents={true}
        // onShowMore={()=>false}
        />
    </>
}