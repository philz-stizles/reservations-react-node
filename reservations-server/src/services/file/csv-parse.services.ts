/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Parse from 'csv-parse';
import fs from 'fs';

export const parseCSVFile = (
  sourceFilePath: any,
  columns: any,
  onNewRecord: any,
  handleError: any,
  done: any
) => {
  const source = fs.createReadStream(sourceFilePath);
  // const source = sourceFilePath;

  let linesRead = 0;

  const parser = Parse({
    delimiter: ',',
    columns,
  });

  parser.on('readable', async function () {
    let record;

    // eslint-disable-next-line no-cond-assign
    while ((record = parser.read())) {
      linesRead += 1;
      // eslint-disable-next-line no-await-in-loop
      await onNewRecord(record);
    }
  });

  parser.on('error', function (error) {
    handleError(error);
  });

  parser.on('end', function () {
    done(linesRead);
  });

  source.pipe(parser);
};

export const parseCSV = (): void => {
  console.log();
};
