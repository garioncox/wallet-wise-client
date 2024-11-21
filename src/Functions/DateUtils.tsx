export const useDateUtils = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const convertToStandardString = (date: Date) => {
    return `${
      monthNames[date.getMonth()]
    } ${date.getDay()}, ${date.getFullYear()}`;
  };

  return {
    convertToStandardString,
  };
};
