import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { iOS } from '../../../helpers/ChatHelpers';

export function ResumeUploadDrawer() {
  <SwipeableDrawer
    PaperProps={{ sx: { maxHeight: 500 } }}
    disableBackdropTransition={!iOS}
    disableDiscovery={iOS}
    anchor="bottom"
    open={true}
    onClose={() => console.log('onClose')}
    onOpen={() => console.log('onOpen')}
  ></SwipeableDrawer>;
}
