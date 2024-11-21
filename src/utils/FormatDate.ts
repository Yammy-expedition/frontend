export const formatDateToYYYYMMDD = (dateString: string) => {
  const [year, month, day] = dateString.replace(/\s+/g, '').split('.');

  const formattedDate = `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
  console.log(formattedDate);
  return formattedDate;
};
