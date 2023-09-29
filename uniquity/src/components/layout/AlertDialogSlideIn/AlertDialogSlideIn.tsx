import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { DataStore } from 'aws-amplify';
import { Feedback } from '../../../models';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AlertDialogSlideProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AlertDialogSlide(props: AlertDialogSlideProps) {
  const { open, setOpen } = props;
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (feedback) {
      await DataStore.save(new Feedback({ comment: feedback }));
      setFeedback('');
      setSnackBarOpen(true);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog
        PaperProps={{ sx: { borderRadius: 6 } }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Feedback or Bug?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Thank you so much for providing feedback. Whether it be a bug or a
            feature request, we are happy to hear it!
          </DialogContentText>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button sx={{ mr: 2 }} variant="contained" onClick={handleSave}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Thanks for the feedback!
        </Alert>
      </Snackbar>
    </div>
  );
}
