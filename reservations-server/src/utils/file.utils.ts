import fs from 'fs';

// eslint-disable-next-line consistent-return
export const deleteFileFromPath = (filePath: string): void => {
  console.log('deleteFile', filePath);
  if (fs.existsSync(filePath)) {
    console.log('The file exists.');
    return fs.unlink(filePath, error => {
      if (error) {
        throw error;
      }
    });
  }
  console.log('The file does not exist.');
};

export const some = (): void => {
  console.log('');
};
