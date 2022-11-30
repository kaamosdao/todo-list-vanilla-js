const watcher = (state, cb) => {
  const watchedState = { ...state };
  const internalState = {};
  Object.keys(watchedState).forEach((key) => {
    internalState[key] = watchedState[key];
    Object.defineProperty(watchedState, key, {
      get() {
        return internalState[key];
      },
      set(newVal) {
        cb(key, newVal);
        internalState[key] = newVal;
      },
    });
  });
  return watchedState;
};

export default watcher;
