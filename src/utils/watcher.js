const watcher = (state, handler) => {
  const watchedState = { ...state };
  const internalState = {};
  Object.keys(watchedState).forEach((key) => {
    internalState[key] = watchedState[key];
    Object.defineProperty(watchedState, key, {
      get() {
        return internalState[key];
      },
      set(newVal) {
        handler(key, newVal);
        internalState[key] = newVal;
      },
    });
  });
  return watchedState;
};

export default watcher;
