// @ts-nocheck

const dummyProcess = {
  env: {
    NODE_ENV: "production",
  },
};

const _process: typeof dummyProcess = (() => {
  if (typeof process !== "object") return dummyProcess;
  if (process === null) return dummyProcess;
  if (typeof (process as any).env !== "object") return dummyProcess;
  if ((process as any).env === null) return dummyProcess;

  return process as typeof dummyProcess;
})();

export { _process as process };
