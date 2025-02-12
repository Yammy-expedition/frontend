import { countries } from 'constants/countries';
import { languages } from 'constants/languages';
import { majors } from 'constants/majors';

export function findCountryname(nationality: string) {
  const arr: string[] = [];
  nationality.split(',')?.map((nat) => {
    const country = countries.find((country) => country.code === nat.trim());
    if (country) arr.push(country.name);
    else arr.push('Unknown');
  });
  return arr.join(', ');
}

export function changeSex(sex: string) {
  if (sex === 'M') return 'Male';
  else if (sex === 'F') return 'Female';
  else return 'Unknown';
}

export function findMajor(code: string) {
  const arr: string[] = [];
  code.split(',')?.map((maj) => {
    const major = majors.find((major) => major.code === maj.trim());
    if (major) arr.push(major.name);
    else arr.push('Unknown');
  });
  return arr.join(', ');
}

export function findLanguage(code: string) {
  const arr: string[] = [];
  code.split(',')?.map((lang) => {
    const language = languages.find(
      (language) => language.code === lang.trim()
    );
    if (language) arr.push(language.name);
    else arr.push('Unknown');
  });
  return arr.join(', ');
}
