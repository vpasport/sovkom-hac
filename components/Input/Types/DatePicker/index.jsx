import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Calendar } from 'primereact/calendar';

const DatePicker = ({ value, onChange }) => (
  <Calendar
    value={value}
    onChange={onChange}
    dateFormat="dd.mm.yy"
    placeholder="Select date"
  />
);

export { DatePicker };
