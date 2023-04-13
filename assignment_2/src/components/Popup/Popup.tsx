import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface PopupProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function Popup({ open, onClose, title, children }: PopupProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
