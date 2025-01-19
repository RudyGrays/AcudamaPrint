export const calculateAVG = (values: number[]) => {
  return values.reduce((acc, item) => acc + item, 0) / values.length;
};
