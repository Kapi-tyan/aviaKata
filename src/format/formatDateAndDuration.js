import { parseISO, format, addMinutes } from 'date-fns';

export const formatDateAndDuration = (date, duration) => {
  const startDate = parseISO(date);
  const endDate = addMinutes(startDate, duration);
  const formattedStartTime = format(startDate, 'HH:mm');
  const formattedEndTime = format(endDate, 'HH:mm');
  return `${formattedStartTime}-${formattedEndTime}`;
};
