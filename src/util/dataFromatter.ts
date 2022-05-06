export default (msg: string): string => {
  const str: string = msg.replace(/[^a-zA-Z ]+/g, '').toLowerCase();
  return str;
};
