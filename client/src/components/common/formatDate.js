// date formatting for airbnb fetch query
export const formatStartDate = (date) => {
  if (!date) return "";

  // date object index starts at 0 for months - so we add 1 for january
  let month = 1 + date.getMonth();

  // months before 10 only display one number - so we add 0 before it
  if (month < 10) {
    month = "0" + month;
  }

  if (date) {
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }
};

export const formatEndDate = (date) => {
  if (!date) return "";

  // date object index starts at 0 for months - so we add 1 for january
  let month = 1 + date.getMonth();

  if (month < 10) {
    month = "0" + month;
  }

  if (date) {
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }
};
