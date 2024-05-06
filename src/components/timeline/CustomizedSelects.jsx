import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { FiLock, FiUnlock } from "react-icons/fi";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        height: 35,
        lineHeight: 2.8,
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#f8f6f6',
        // border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default function CustomizedSelects() {
    const [openStatus, setOpenStatus] = React.useState(true);
    const handleChange = (event: { target: { value: string } }) => {
        setOpenStatus(event.target.value);
    };
    return (
        <div>
            <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={openStatus}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={true}><FiUnlock /></MenuItem>
                    <MenuItem value={false}><FiLock /></MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
