import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/user';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from './CustomCalendar';
import { majors } from 'constants/majors';
import { countries } from 'constants/countries';
import { ages } from 'constants/ages';
import { languages } from 'constants/languages';
import { mbtiTypes } from 'constants/mbti';

interface PersonalInformationProps {
  formData: User;
  updateFormData: (field: keyof User, value: any) => void;
  submit: () => void;
}

export default function PersonalInformation({
  formData,
  updateFormData,
  submit
}: PersonalInformationProps) {
  const date = new Date();
  const [isToBeDetermined, setIsToBeDetermined] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string | null>(
    null
  );

  const onChangeDetermined = () => {
    setIsToBeDetermined((prev) => !prev);
    updateFormData('endDate', 'TBD');
  };

  const onChangeLanguages = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguages((prev) => {
      if (prev === null || prev === '') {
        return e.target.value;
      } else if (prev.split(',').includes(e.target.value)) {
        const value = prev
          .split(',')
          .filter((element) => element !== e.target.value);
        return value.join(',');
      }
      return prev + ',' + e.target.value;
    });
  };

  useEffect(() => {
    updateFormData('languages', selectedLanguages);
  }, [selectedLanguages]);

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

        <PeriodOfStayInKoreaBox>
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
        </PeriodOfStayInKoreaBox>

        <MajorBox>
          <p>Major</p>
          <select
            name="major"
            id=""
            value={formData.major || ''}
            onChange={(e) => updateFormData('major', e.target.value)}
          >
            <option disabled hidden value="">
              Select Major
            </option>
            {majors.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </MajorBox>

        <NationalityBox>
          <p>Nationality</p>
          <select
            name="countries"
            id=""
            value={formData.nationality}
            onChange={(e) => updateFormData('nationality', e.target.value)}
          >
            <option disabled hidden value="">
              Select Country
            </option>
            {countries.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </NationalityBox>

        <SexAgeBox>
          <div>
            <p>Sex</p>
            <select
              name="sex"
              id=""
              value={formData.sex || ''}
              onChange={(e) => updateFormData('sex', e.target.value)}
            >
              <option disabled hidden value="">
                Select Sex
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
          <div>
            <p>Age</p>
            <select
              name="age"
              id=""
              value={formData.age || ''}
              onChange={(e) => updateFormData('age', e.target.value)}
            >
              <option disabled hidden value="">
                Select Age
              </option>
              {ages.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        </SexAgeBox>

        <LanguageBox>
          <p>Languages you can</p>
          <select name="language" id="" value={''} onChange={onChangeLanguages}>
            <option disabled hidden value="">
              Select Languages
            </option>
            {languages.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p>{selectedLanguages}</p>
        </LanguageBox>

        <IntroduceBox>
          <p>Introduce</p>
          <textarea
            value={formData.introduce}
            placeholder={`Introducing yourself in more detail will help you find friends.
ex) Hometown, university (if you have), what you like, the purpose of coming to Korea ...`}
            onChange={(e) => updateFormData('introduce', e.target.value)}
          />
        </IntroduceBox>

        <MbtiBox>
          <p>MBTI</p>
          <select
            name="age"
            id=""
            value={formData.mbti || ''}
            onChange={(e) => updateFormData('mbti', e.target.value)}
          >
            <option disabled hidden value="">
              Select Mbti
            </option>
            {mbtiTypes.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </MbtiBox>
      </Form>

      <SubmitButtonWrapper>
        <SubmitButton onClick={submit}>submit</SubmitButton>
      </SubmitButtonWrapper>
    </PersonalInformationContainer>
  );
}

const PersonalInformationContainer = styled.div`
  > p {
    font-family: var(--main-font);
    font-size: 2rem;
    margin: 1rem 0;
  }
  display: flex;
  flex-direction: column;
  padding-bottom: 10rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  white-space: pre-wrap;
  width: 50rem;
  background: white;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1.25rem;
  margin: 1rem 0;

  border: 1px solid var(--border-color);
  margin-bottom: 5rem;
`;

const PasswordBox = styled.div``;

const NicknameBox = styled.div``;

const PeriodOfStayInKoreaBox = styled.div`
  > div {
    display: flex;
    align-items: center;
  }
`;

const MajorBox = styled.div``;

const NationalityBox = styled.div``;

const SexAgeBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const LanguageBox = styled.div``;

const IntroduceBox = styled.div`
  > textarea {
    padding: 1rem;
    width: 30rem;
    height: 20rem;
    white-space: pre-wrap;
    overflow-y: auto;
    resize: none;
    font-family: var(--main-font);
  }
`;

const MbtiBox = styled.div``;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  width: 10rem;
  height: 5rem;
  font-size: 2rem;
  background: var(--vertical-gradient);
  color: white;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  cursor: pointer;
`;
