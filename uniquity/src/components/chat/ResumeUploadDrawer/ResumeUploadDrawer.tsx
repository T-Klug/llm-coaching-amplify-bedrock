import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { iOS } from '../../../helpers/ChatHelpers';
import Dropzone from 'react-dropzone';

export function ResumeUploadDrawer() {
  <SwipeableDrawer
    PaperProps={{ sx: { maxHeight: 500 } }}
    disableBackdropTransition={!iOS}
    disableDiscovery={iOS}
    anchor="bottom"
    open={true}
    onClose={() => console.log('onClose')}
    onOpen={() => console.log('onOpen')}
  >
    <Dropzone />
  </SwipeableDrawer>;
}
