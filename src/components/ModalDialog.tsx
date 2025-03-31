import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React, {JSX} from "react";

interface IModalDialogProps {
  isOpen: boolean;
  type?: string;
  title?: string;
  modalBody?: string | JSX.Element;
  confirmButtonLabel?: string;
  inputValue?: string;
  handleOnChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseDialog: () => void;
  handleOnSubmit: () => void;
  handleOnCancel: () => void;
}

export const ModalDialog: React.FC<IModalDialogProps> =
    ({
       isOpen = false,
       type = "text",
       title,
       modalBody,
       confirmButtonLabel,
       inputValue = "",
       handleOnChangeText,
       handleCloseDialog,
       handleOnSubmit,
       handleOnCancel,
     }) => {

      return (
          <Dialog open={isOpen} onClose={handleCloseDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Typography>
                {modalBody}
              </Typography>
              {
                type === "input" ?
                    (
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={inputValue}
                            onChange={handleOnChangeText}
                        />
                    )
                    : null
              }
            </DialogContent>
            <DialogActions>
              <Button
                  color="error"
                  onClick={handleOnCancel}
              >
                Cancel
              </Button>
              <Button
                  color="primary"
                  onClick={handleOnSubmit}
              >
                {confirmButtonLabel}
              </Button>
            </DialogActions>
          </Dialog>
      )

    }