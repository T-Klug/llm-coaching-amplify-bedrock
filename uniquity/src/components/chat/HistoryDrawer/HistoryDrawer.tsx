import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { compareDates, iOS } from '../../../helpers/ChatHelpers';
import { LazyOpenAIChat } from '../../../models';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { DataStore } from 'aws-amplify';

type HistoryDrawerPropsType = {
  data: LazyOpenAIChat[] | undefined;
  overlayVisible: boolean;
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: string | undefined;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export function HistoryDrawer(props: HistoryDrawerPropsType) {
  const { data, setOverlayVisible, overlayVisible, selectedId, setSelectedId } =
    props;
  // History Builder Method
  const BuildListItem = (aiChat: LazyOpenAIChat, listName: string) => {
    const date = new Date(aiChat.createdAt!);
    if (compareDates(date) === listName) {
      return (
        <ListItem
          sx={{
            border: 1,
            borderRadius: 4,
            width: '90%',
            m: 'auto',
            marginBottom: 1,
          }}
          dense
          key={aiChat.id}
          secondaryAction={
            aiChat && (
              <DeleteOutlineOutlined
                sx={{ cursor: 'pointer' }}
                onClick={() => deleteChat(aiChat)}
              />
            )
          }
        >
          <ListItemText
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedId(aiChat.id);
              setOverlayVisible(false);
            }}
            primaryTypographyProps={{ noWrap: true, width: '85%' }}
            primary={aiChat && aiChat?.messages && aiChat.messages[1]?.content}
          />
        </ListItem>
      );
    }
  };

  // Delete Chat Method
  function deleteChat(aiChat: LazyOpenAIChat) {
    if (aiChat && aiChat.id !== selectedId) {
      DataStore.delete(aiChat);
    }
  }

  // Helper method to decide if we should display the history buckets
  const shouldDisplayChatGroup = (
    data: LazyOpenAIChat[] | undefined,
    groupName: string
  ): boolean => {
    const list = data?.map(d => BuildListItem(d, groupName));
    if (list?.length === 1 && list[0] !== undefined) {
      return true;
    }
    if (list?.every((val, _i, arr) => val === arr[0])) {
      return false;
    }
    return true;
  };

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          maxHeight: 500,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="bottom"
      open={overlayVisible}
      onClose={() => setOverlayVisible(false)}
      onOpen={() => setOverlayVisible(true)}
    >
      <Typography textAlign="center" variant="h5">
        Previous Coaching Conversations
      </Typography>
      {shouldDisplayChatGroup(data, 'Today') && (
        <List
          subheader={
            <ListSubheader sx={{ backgroundColor: 'unset' }}>
              Today
            </ListSubheader>
          }
        >
          {data?.map(d => BuildListItem(d, 'Today')).reverse()}
        </List>
      )}
      {shouldDisplayChatGroup(data, 'Yesterday') && (
        <List
          subheader={
            <ListSubheader sx={{ backgroundColor: 'unset' }}>
              Yesterday
            </ListSubheader>
          }
        >
          {data?.map(d => BuildListItem(d, 'Yesterday')).reverse()}
        </List>
      )}
      {shouldDisplayChatGroup(data, 'This week') && (
        <List
          subheader={
            <ListSubheader sx={{ backgroundColor: 'unset' }}>
              This Week
            </ListSubheader>
          }
        >
          {data?.map(d => BuildListItem(d, 'This week')).reverse()}
        </List>
      )}
      {shouldDisplayChatGroup(data, 'Other') && (
        <List
          subheader={
            <ListSubheader sx={{ backgroundColor: 'unset' }}>
              This Month+
            </ListSubheader>
          }
        >
          {data?.map(d => BuildListItem(d, 'Other')).reverse()}
        </List>
      )}
    </SwipeableDrawer>
  );
}
