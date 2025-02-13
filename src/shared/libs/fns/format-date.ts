export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("ru-RU", options).replace(",", "");
};
