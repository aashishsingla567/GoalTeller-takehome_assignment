import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PropsWithChildren } from "react";

interface PopupProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
}

const useStyles = makeStyles({
  paper: {
    minWidth: 400,
  },
});

export default function Popup({ open, onClose, title, children }: PopupProps) {
  const classes = useStyles();

  return (
    <Dialog maxWidth={false} open={open} onClose={onClose}>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
