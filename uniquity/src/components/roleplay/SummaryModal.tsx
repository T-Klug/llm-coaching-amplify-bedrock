import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { DataStore } from 'aws-amplify';
import { LazyRoleplaySummary, RoleplaySummary } from '../../models';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type SummaryModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  summaryId: string;
};

export default function SummaryModal(props: SummaryModalProps) {
  const { open, setOpen, summaryId } = props;
  const [data, setData] = useState<LazyRoleplaySummary | undefined>();
  const navigate = useNavigate();

  // Websocket for the chats
  useEffect(() => {
    const sub = DataStore.observe(RoleplaySummary, summaryId).subscribe(
      item => {
        setData(item.element);
      },
    );
    return () => sub.unsubscribe();
  }, [summaryId]);

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  return (
    <div>
      <Dialog
        PaperProps={{ sx: { borderRadius: 6 } }}
        disableEscapeKeyDown
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => console.log('use close button')}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Roleplay Summary'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Thanks for participating in the role play excersise. Here are some
            suggestions based on the chat to improve upon!
          </DialogContentText>
          <DialogContent>
            <TextField
              disabled
              fullWidth
              multiline
              rows={20}
              value={data?.summary}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button sx={{ m: 2 }} variant="contained" onClick={handleClose}>
            Back to Home
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
