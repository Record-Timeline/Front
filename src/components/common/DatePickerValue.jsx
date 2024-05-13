/** @jsxImportSource @emotion/react */

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { css } from "@emotion/react";

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import {TextField} from "@mui/material/";

function CustomActionBar(props) {
    const { onClear, actions, className } = props;

    return (
        <DialogActions className={className}>
            <Button
                onClick={(event) => {
                    // console.log("진행중")
                    onClear();
                }}
                css={css({
                    width: "100px",
                    border: "2px solid #829FD7",
                    borderRadius: "20px",
                    margin: "10px",

                })}
            >
                진행중
            </Button>
        </DialogActions>
    );
}

export default function DatePickerValue({ label }) { // label prop 추가 : 이름 바꿀 수 있음
    // const [value, setValue] = React.useState(dayjs('2022-04-17')); // 기본 지정 날짜 설정 가능
    const [date, setDate] = React.useState(); //

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    format="YYYY-MM-DD"
                    label={label} // 부모 컴포넌트에서 받은 label(이름) 사용
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    slots={{
                        actionBar: CustomActionBar,
                    }}
                    slotProps={{
                        actionBar: {
                            actions: ['today'], // 'ing'로 바꿔도 실행됨, 배열 안의 내용 없애도 실행됨 머지
                        },
                        textField: { size: 'small' }
                    }}
                    css={css({
                        minWidth: "10px !important",
                        width: "150px",
                        height: "50px",
                    })}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
