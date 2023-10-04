import { S3ProviderListOutputItem } from '@aws-amplify/storage';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react-storage/styles.css';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Storage } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import SourceOutlined from '@mui/icons-material/SourceOutlined';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function DocumentContext() {
  const { user } = useAuthenticator();
  const [files, setFiles] = useState<S3ProviderListOutputItem[]>();
  useEffect(() => {
    const fetchFiles = async () => {
      const list = await Storage.list('', {
        pageSize: 'ALL',
        level: 'private',
      });
      setFiles(list.results);
    };
    fetchFiles();
  }, []);

  return (
    <>
      <Typography mb={3} variant="body1">
        Upload documents to provide context to your coach (currently only pdf
        and docx supported):
      </Typography>
      <StorageManager
        accessLevel="private"
        maxFileCount={5}
        path={`${user.username}/`}
        acceptedFileTypes={[
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]}
      />
      <Typography variant="h5" textAlign="center" mt={10}>
        Previously Uploaded Documents
      </Typography>
      <List sx={{ width: '100%' }}>
        {files &&
          files.map(f => (
            <ListItem key={f.key}>
              <ListItemButton
                sx={{
                  cursor: 'pointer',
                  border: 1,
                  borderRadius: 8,
                  width: '100%',
                }}
                onClick={async () => {
                  const file = await Storage.get(f.key!, {
                    level: 'private',
                  });
                  window.open(file, '_blank');
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SourceOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={f.key?.split('/')[1]} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </>
  );
}
