import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/user';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from './CustomCalendar';
import { majors } from 'constants/majors';
import { countries } from 'constants/countries';
import { languages } from 'constants/languages';
import { mbtiTypes } from 'constants/mbti';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';

interface PersonalInformationProps {
  handleSubmit: UseFormHandleSubmit<User, undefined>;
  setValue: UseFormSetValue<User>;
  getValues: UseFormGetValues<User>;
  register: UseFormRegister<User>;
  submit: (data: User) => Promise<void>;
  errors: FieldErrors<User>;
}

export default function PersonalInformation({
  handleSubmit,
  setValue,
  getValues,
  register,
  submit,
  errors
}: PersonalInformationProps) {
  const date = new Date();
  const [isToBeDetermined, setIsToBeDetermined] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string | null>(
    null
  );
  const [selectedLanguagesCode, setSelectedLanguagesCode] = useState<
    string | null
  >('');
  const [selectedForeigner, setSelectedForeigner] = useState<string>('');

  const onChangeDetermined = () => {
    setIsToBeDetermined((prev) => !prev);
    setValue('end_date', 'TBD');
  };

  const onChangeLanguages = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const label = selectedOption.getAttribute('data-label');

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

    setSelectedLanguagesCode((prev) => {
      if (prev === null || prev === '') {
        return label;
      } else if (prev.split(',').includes(label as string)) {
        const value = prev.split(',').filter((element) => element !== label);
        return value.join(',');
      }
      return prev + ',' + label;
    });
  };

  useEffect(() => {
    setValue('languages', selectedLanguagesCode);
  }, [selectedLanguagesCode]);

  return (
    <PersonalInformationContainer onSubmit={handleSubmit(submit)}>
      <p>③ Self-Certification</p>
      <Form>
        <PasswordBox>
          <div>
            <p>
              Password<span style={{ color: 'orange' }}>*</span>
            </p>
            <input
              type="password"
              {...register('password', {
                required: 'password is neccessary field',
                minLength: {
                  value: 7,
                  message: 'Minimum length is 7'
                }
              })}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </div>
          <div>
            <p>
              Password Check<span style={{ color: 'orange' }}>*</span>
            </p>
            <input
              type="password"
              {...register('check_password', {
                required: 'password is neccessary field',
                minLength: {
                  value: 7,
                  message: 'Minimum length is 7'
                },
                validate: {
                  check: (val) => {
                    if (getValues('password') !== val) {
                      return 'Password doen not match';
                    }
                  }
                }
              })}
            />
            {errors.check_password && (
              <small role="alert">{errors.check_password.message}</small>
            )}
          </div>
        </PasswordBox>

        <NicknameBox>
          <p>
            Nickname<span style={{ color: 'orange' }}>*</span>
          </p>
          <input
            type="text"
            {...register('nickname', {
              required: 'Nickname is neccessary field',
              minLength: {
                value: 3,
                message: 'Minimun length is 3'
              },
              maxLength: {
                value: 7,
                message: 'Maximum length is 7'
              }
            })}
          />
          {errors.nickname && (
            <small role="alert">{errors.nickname.message}</small>
          )}
        </NicknameBox>

        <Foreigner>
          <p>
            Are you international student? (exchange student, Language School
            etc,,)
          </p>
          <label>
            <input
              name="foreigner"
              type="radio"
              value="Foreigner"
              onChange={(e) => setSelectedForeigner(e.target.value)}
            />
            Yes
          </label>
          <label>
            <input
              name="foreigner"
              type="radio"
              value="Korean"
              onChange={(e) => setSelectedForeigner(e.target.value)}
            />
            No
          </label>
        </Foreigner>
        {selectedForeigner === 'Foreigner' ? (
          <PeriodOfStayInKoreaBox>
            <p>
              Period of stay in Korea<span style={{ color: 'orange' }}>*</span>
            </p>
            <div></div>
            <div>
              <CustomCalendar
                setValue={setValue}
                type="start_date"
                date={date}
              />
              <span> ~ </span>
              <CustomCalendar
                setValue={setValue}
                type="end_date"
                date={date}
                disabled={isToBeDetermined}
              />
              <input type="checkbox" onChange={onChangeDetermined} />
              <span>To Be Determined</span>
            </div>
          </PeriodOfStayInKoreaBox>
        ) : null}

        <MajorBox>
          <p>
            Major<span style={{ color: 'orange' }}>*</span>
          </p>
          <select
            id="major"
            {...register('major', { required: 'Select Major' })}
          >
            <option disabled hidden value="">
              Select Major
            </option>
            {majors.map((item, index) => (
              <option key={index} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </MajorBox>

        <NationalityBox>
          <p>
            Nationality<span style={{ color: 'orange' }}>*</span>
          </p>
          <select
            id="nationality"
            {...register('nationality', { required: 'Select Country' })}
          >
            <option disabled hidden value="">
              Select Country
            </option>
            {countries.map((item, index) => (
              <option key={index} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </NationalityBox>

        <SexBirthBox>
          <div>
            <p>Sex</p>
            <select id="sex" {...register('sex', { required: 'Select Sex' })}>
              <option disabled hidden value="">
                Select Sex
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div>
            <p>Birth</p>
            <CustomCalendar setValue={setValue} type="birth" date={date} />
          </div>
        </SexBirthBox>

        <LanguageBox>
          <p>Languages you can</p>
          <select name="language" id="" value={''} onChange={onChangeLanguages}>
            <option disabled hidden value="">
              Select Languages
            </option>
            {languages.map((item, index) => (
              <option key={index} value={item.name} data-label={item.code}>
                {item.name}
              </option>
            ))}
          </select>
          <p>{selectedLanguages}</p>
        </LanguageBox>

        <IntroduceBox>
          <p>Introduce</p>
          <textarea
            placeholder={`Introducing yourself in more detail will help you find friends.
ex) Hometown, university (if you have), what you like, the purpose of coming to Korea ...`}
            {...register('introduce')}
          />
        </IntroduceBox>

        <MbtiBox>
          <p>MBTI</p>
          <select id="mbti" {...register('mbti', { required: 'Select MBTI' })}>
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
        <SubmitButton type="submit">submit</SubmitButton>
      </SubmitButtonWrapper>
    </PersonalInformationContainer>
  );
}

const PersonalInformationContainer = styled.form`
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

const SexBirthBox = styled.div`
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

const Foreigner = styled.div``;
