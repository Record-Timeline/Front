import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FiLock, FiUnlock } from "react-icons/fi";

export default function SelectAutoWidth() {
    const [openStatus, setOpenStatus] = React.useState(true);

    const handleChange = (event: SelectChangeEvent) => {
        console.log({openStatus});
        setOpenStatus(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, }}>
                {/*<InputLabel id="demo-simple-select-autowidth-label"></InputLabel>*/}
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={openStatus}
                    onChange={handleChange}
                    autoWidth
                    label="공개여부"
                >
                    <MenuItem value={true}><FiUnlock /></MenuItem>
                    <MenuItem value={false}><FiLock /></MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
