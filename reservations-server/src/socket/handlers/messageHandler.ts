/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const createMessage = (payload: any) => {
  console.log(payload);
};

export const readMessage = (payload: any, callback: any): void => {
  console.log(payload);
  callback();
};
