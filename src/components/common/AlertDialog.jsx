/** @jsxImportSource @emotion/react */

import * as React from "react";
import {css} from "@emotion/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ icon, onConfirm, dialogTitle, dialogContent, confirmText, cancelText }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    }

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} sx={{ minWidth: "30px" }}>
                {icon}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                  id="alert-dialog-title"
                  css={css({ whiteSpace: "pre-line" })} // \n을 이용하여 줄바꿈 할 수 있도록
                >
                    {dialogTitle}
                </DialogTitle>
                <DialogContent
                  css={css({ margin: "0 3px" })}
                >
                    <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* confirmText 또는 cancelText 없으면 아예 버튼이 렌더링 되지 않도록 && 사용*/}
                    {confirmText && <Button onClick={handleConfirm}>{confirmText}</Button>}
                    {cancelText && <Button onClick={handleClose} autoFocus>{cancelText}</Button>}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
