/** @jsxImportSource @emotion/react */

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} sx={{ minWidth: "30px" }}>
                {props.icon}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"정말로 삭제하시겠습니까?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        메인 타임라인을 삭제하면 {"\n"}
                        해당 타임라인 안에 들어있는 서브 타임라인들도 모두 삭제됩니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>삭제</Button>
                    <Button onClick={handleClose} autoFocus>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
