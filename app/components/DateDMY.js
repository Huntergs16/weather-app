import { parseISO, format } from 'date-fns';

export default function DateDMY({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'eeee')}</time>;
}