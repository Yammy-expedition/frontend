import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { User } from 'types/user';
import { formatDateToYYYYMMDD } from 'utils/FormatDate';

interface CustomCalendarProps {
  updateFormData: (field: keyof User, value: any) => void;
  type: keyof User;
  date: Date;
  disabled?: boolean;
}

export default function CustomCalendar({
  updateFormData,
  type,
  date,
  disabled = false
}: CustomCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nowDate, setNowDate] = useState<string>('Date');

  const handleDateChange = (selectedDate: Date) => {
    const formattedDate = formatDateToYYYYMMDD(
      selectedDate.toLocaleDateString()
    );
    updateFormData(type, formattedDate);
    setNowDate(moment(selectedDate).format('YYYY.MM.DD'));
    setIsOpen(false);
  };

  return (
    <CalendarContainer>
      {disabled ? (
        ''
      ) : (
        <>
          <DropdownButton
            onClick={() => setIsOpen((prev) => !prev)}
            $disabled={disabled}
          >
            {nowDate}
          </DropdownButton>
          <CalendarWrapper $isOpen={isOpen}>
            <Calendar
              locale="en-US"
              onChange={(value) => handleDateChange(value as Date)}
              value={date}
              formatDay={(locale, day) => moment(day).format('DD')}
              formatMonth={(locale, day) => moment(day).format('MM')}
              formatMonthYear={(locale, day) => moment(day).format('YYYY/MM')}
            />
          </CalendarWrapper>
        </>
      )}
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  position: relative;
`;

const CalendarWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: absolute;
`;

const DropdownButton = styled.button<{ $disabled: boolean }>`
  width: 10rem;
  height: 3rem;
  padding: 0px 12px;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  text-align: start;
  background-color: white;
  border: 1px solid black;

  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
`;
