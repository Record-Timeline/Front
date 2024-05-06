/** @jsxImportSource @emotion/react */

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { css } from "@emotion/react";

export default function DatePickerValue({ label, props }) { // label prop 추가 : 이름 바꿀 수 있음
    // const [value, setValue] = React.useState(dayjs('2022-04-17')); // 기본 지정 날짜 설정 가능
    const [value, setValue] = React.useState(); //

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    format="YYYY-MM-DD"
                    label={label} // 부모 컴포넌트에서 받은 label(이름) 사용
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    css={css({
                        minWidth: "30px",
                        width: "100px",
                    })}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
