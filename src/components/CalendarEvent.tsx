import React from 'react';
import { Badge, BadgeProps, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import { IEvent } from '../models/event';
import { formatDate } from '../utils/date';

interface CalendarEventProps {
  events: IEvent[],
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  events,
}) => {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };


  const dateCellRender = (value: Dayjs) => {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = events.filter(ev => ev.date === formatedDate)
    return (
      <div>
        <ul className="events">
          {currentDayEvents.map((item) => (
            <li key={item.id}>
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <div>
    <Calendar dateCellRender={dateCellRender} onPanelChange={onPanelChange} />
  </div>;
};

export default CalendarEvent;