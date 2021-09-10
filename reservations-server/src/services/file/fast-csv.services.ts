/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fastCSV from 'fast-csv';
import fs from 'fs';

export const parseCSVFile = (sourceFilePath: any) => {
  const source = fs.createReadStream(sourceFilePath);
  // const source = sourceFilePath;

  // open uploaded file
  fastCSV
    .fromPath(req.file.path)
    .on('data', function (data) {
      fileRows.push(data); // push each row
    })
    .on('end', function () {
      console.log(fileRows);
      fs.unlinkSync(req.file.path); // remove temp file
      //process "fileRows" and respond
    });
};

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send('Please upload a CSV file!');
    }

    const tutorials = [];
    const path = `${__basedir}/resources/static/assets/uploads/${req.file.filename}`;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => {
        throw error.message;
      })
      .on('data', row => {
        tutorials.push(row);
      })
      .on('end', () => {
        Tutorial.bulkCreate(tutorials)
          .then(() => {
            res.status(200).send({
              message: `Uploaded the file successfully: ${req.file.originalname}`,
            });
          })
          .catch(error => {
            res.status(500).send({
              message: 'Fail to import data into database!',
              error: error.message,
            });
          });
      });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`,
    });
  }
};

// const getTutorials = (req, res) => {
//   Tutorial.findAll()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving tutorials.',
//       });
//     });
// };
