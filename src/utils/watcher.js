const watcher = (state, callback) => {
  const watchedState = { ...state };
  const internalState = {};
  Object.keys(watchedState).forEach((key) => {
    internalState[key] = watchedState[key];
    Object.defineProperty(watchedState, key, {
      get() {
        return internalState[key];
      },
      set(newVal) {
        callback(key, newVal);
        internalState[key] = newVal;
      },
    });
  });
  return watchedState;
};

export default watcher;
