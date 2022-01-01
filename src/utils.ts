const LoggerPrefix = "[Vue-use-popperjs]:";

export const warn: typeof console.log = (...args) => {
  console.warn(LoggerPrefix, ...args);
};
