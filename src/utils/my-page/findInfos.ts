import { countries } from 'constants/countries';
import { languages } from 'constants/languages';
import { majors } from 'constants/majors';

export function findCountryname(nationality: string) {
  const country = countries.find((country) => country.code === nationality);
  if (country) return country.name;
  else return 'Unknown';
}

export function changeSex(sex: string) {
  if (sex === 'M') return 'Male';
  else if (sex === 'F') return 'Female';
  else return 'Unknown';
}

export function findMajor(code: string) {
  const major = majors.find((major) => major.code === code);
  if (major) return major.name;
  else return 'Unknown';
}

export function findLanguage(code: string) {
  const arr: string[] = [];
  code.split(',').map((lang) => {
    const language = languages.find((language) => language.code === lang);
    if (language) arr.push(language.name);
    else arr.push('Unknown');
  });
  return arr.join(', ');
}
