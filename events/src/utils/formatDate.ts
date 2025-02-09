export const formatDate = (date: string) => {
  if (!date) {
    console.error('Cannot format date without a date');
    return null;
  }

  const outDate = new Date(date);

  // Check if the date is valid. Force it into a numerical value then check if it's a number;
  // an invalid date will return NaN.
  // @see: https://stackoverflow.com/a/67410020
  if (isNaN(+outDate)) {
    console.error(`Could not format date ${date}, is this data correct?`);
    return null;
  }

  return outDate.toLocaleDateString('en-GB');
};
