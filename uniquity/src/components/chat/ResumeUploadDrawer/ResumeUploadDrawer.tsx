import { StorageManager } from '@aws-amplify/ui-react-storage';

const processFile = async ({ file }: { file: File }) => {
  const fileExtension = file.name.split('.').pop();
  return { file, key: `resume.${fileExtension}` };
};

export function ResumeUploadDrawer() {
  return (
    <StorageManager
      acceptedFileTypes={['.docx', '.pdf']}
      accessLevel="private"
      maxFileCount={1}
      processFile={processFile}
      components={{
        FileList() {
          return undefined;
        },
      }}
    />
  );
}
