import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/user';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from './CustomCalendar';

interface PersonalInformationProps {
  updateFormData: (field: keyof User, value: any) => void;
}

export default function PersonalInformation({
  updateFormData
}: PersonalInformationProps) {
  const date = new Date();
  const [isToBeDetermined, setIsToBeDetermined] = useState(false);
  const onChangeDetermined = () => {
    setIsToBeDetermined((prev) => !prev);
    updateFormData('endDate', 'TBD');
  };

  return (
    <PersonalInformationContainer>
      <p>③ Self-Certification</p>
      <Form>
        <PasswordBox>
          <div>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => updateFormData('password', e.target.value)}
            />
          </div>
          <div>
            <p>Password Check</p>
            <input type="password" />
          </div>
        </PasswordBox>

        <NicknameBox>
          <p>Nickname</p>
          <input
            type="text"
            onChange={(e) => updateFormData('nickname', e.target.value)}
          />
        </NicknameBox>

        <PeriodOfStayInKorea>
          <p>Period of stay in Korea</p>
          <div>
            <CustomCalendar
              updateFormData={updateFormData}
              type="startDate"
              date={date}
            />
            <span>~</span>
            <CustomCalendar
              updateFormData={updateFormData}
              type="endDate"
              date={date}
              disabled={isToBeDetermined}
            />
            <input type="checkbox" onChange={onChangeDetermined} />
            <span>To Be Determined</span>
          </div>
        </PeriodOfStayInKorea>
      </Form>
    </PersonalInformationContainer>
  );
}

const PersonalInformationContainer = styled.div`
  > p {
    font-family: var(--main-font);
    font-size: 2rem;
    margin: 1rem 0;
  }
`;

const Form = styled.div`
  white-space: pre-wrap;
  width: 50rem;
  height: 100rem;
  background: white;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1.25rem;
  margin: 1rem 0;

  border: 1px solid var(--border-color);
`;

const PasswordBox = styled.div``;

const NicknameBox = styled.div``;

const PeriodOfStayInKorea = styled.div`
  > div {
    display: flex;
    align-items: center;
  }
`;
