export const stripHTML = (data: string): string =>
  data.replace(/<\/?[^>]+(>|$)/g, '');

export const some = (): void => {
  console.log('');
};
