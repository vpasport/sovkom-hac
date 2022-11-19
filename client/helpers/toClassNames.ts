const toClassNames = (...args: any[]) => {
  return args.filter((el) => typeof el === 'string').join(' ');
};

export { toClassNames };
