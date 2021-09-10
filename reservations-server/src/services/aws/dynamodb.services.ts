import AWS from './index';

const dynamodb = new AWS.DynamoDB();

export const createTable = (params: AWS.DynamoDB.CreateTableInput): void => {
  dynamodb.createTable(params, function (err, data) {
    if (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2)
      );
    }
  });
};

export const init = (): void => {
  console.log('');
};
