const watcher = (state, cb) => {
  const watchedState = { ...state };
  Object.keys(watchedState).forEach((key) => {
    const internalValue = watchedState[key];
    Object.defineProperty(watchedState, key, {
      get() {
        return internalValue;
      },
      set(newVal) {
        cb(key, newVal);
      },
    });
  });
  return watchedState;
};

export default watcher;
