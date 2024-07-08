import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja'); // カレンダーの曜日のフォーマット

const DatePickerComponent = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateFormats={{ year: 'YYYY年' }}
    >
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={onChange}
        format="YYYY/MM/DD"
        slotProps={{ calendarHeader: { format: 'YYYY年MM月' } }} // カレンダーヘッダーのフォーマット
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
