import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from 'types/user';
import 'react-calendar/dist/Calendar.css';
import { countries } from 'constants/countries';
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
  const [selectedLanguagesCode, setSelectedLanguagesCode] = useState<
    string | null
  >('');

  useEffect(() => {
    setValue('languages', selectedLanguagesCode);
  }, [selectedLanguagesCode]);

  useEffect(() => {
    setValue('is_active', true);
  }, []);

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
            {countries?.map((item, index) => (
              <option key={index} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </NationalityBox>
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
  width: 30rem;
  background: white;
  overflow-y: auto;
  padding: 2rem;
  font-size: 1.25rem;
  margin: 1rem 0;

  @media screen and (min-width: 768px) {
    width: 50rem;
  }

  border: 1px solid var(--border-color);
  margin-bottom: 5rem;
`;

const PasswordBox = styled.div``;

const NicknameBox = styled.div``;

const NationalityBox = styled.div`
  > select {
    width: 20rem;
  }
`;

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
