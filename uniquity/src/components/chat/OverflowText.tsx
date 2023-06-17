import { ArrowRightOutlined } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Container } from '@mui/material';

type OverflowTextProps = {
  content: string | null | undefined;
  chatPosition: 'left' | 'right';
};
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function OverflowText(props: OverflowTextProps) {
  const [overflowActive, setOverflowActive] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { content, chatPosition } = props;
  const overflowingText = useRef(null);
  const checkOverflow = (textContainer: HTMLSpanElement | null): boolean => {
    if (textContainer)
      return (
        textContainer.offsetHeight < textContainer.scrollHeight ||
        textContainer.offsetWidth < textContainer.scrollWidth
      );
    return false;
  };
  useEffect(() => {
    if (checkOverflow(overflowingText.current)) {
      setOverflowActive(true);
      return;
    }

    setOverflowActive(false);
  }, [overflowActive]);

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton
            edge="start"
            color="primary"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Container>
          <Typography sx={{ whiteSpace: 'pre-wrap' }} variant="body2">
            {content}
          </Typography>
        </Container>
      </Dialog>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
        <Typography
          ref={overflowingText}
          variant="body2"
          sx={{
            maxHeight: 200,
            overflow: 'hidden',
            color: chatPosition === 'right' ? '#FFF' : '#000',
            justifyContent: 'center',
          }}
        >
          {content}
        </Typography>
        {overflowActive && (
          <ArrowRightOutlined
            sx={{
              color: chatPosition === 'right' ? '#FFF' : '#000',
              cursor: 'pointer',
            }}
            fontSize="large"
            onClick={handleClickOpen}
          />
        )}
      </div>
    </>
  );
}
