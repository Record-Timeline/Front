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
                    margin: "8px",
                    fontSize: "16px",
                    fontFamily: "Pretendard",
                })}
            >
                진행중
            </Button>
        </DialogActions>
    );
}

export default function DatePickerValue({ label, actionBar, className, value, onChange }) { // label prop 추가 : 이름 바꿀 수 있음
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    className={className}
                    format="YYYY-MM-DD"
                    label={label} // 부모 컴포넌트에서 받은 label(이름) 사용
                    value={value ? dayjs(value) : null} // value가 null이 아니면 dayjs 객체로 변환
                    onChange={(newDate) => onChange(newDate ? newDate.toISOString() : null)}
                    slots={{
                        actionBar: actionBar ? CustomActionBar : undefined,
                    }}
                    slotProps={{
                        textField: {
                          size: 'small',
                          InputProps: {
                            style: {
                              fontSize: '15px',
                              fontFamily: 'Pretendard',
                            },
                          },
                          InputLabelProps: {
                            style: {
                              fontSize: '16px',
                              fontFamily: 'Pretendard', // 원하는 폰트 패밀리로 변경
                            },
                          },
                        }
                    }}
                    css={css({
                        minWidth: "10px !important",
                        // width: "150px",
                        height: "50px",
                    })}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
