/**
 * Преобразование массива стилей в строку
 * @param  {...any} args
 * @returns
 */
const toClassName = (...args) =>
  args.filter((el) => typeof el === 'string').join(' ');

export { toClassName };
