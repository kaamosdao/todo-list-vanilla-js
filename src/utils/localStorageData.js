class LocalStorageData {
  constructor(key) {
    this.key = key;
  }

  setData(state) {
    const data = JSON.stringify(state);
    localStorage.setItem(this.key, data);
  }

  getData() {
    const data = localStorage.getItem(this.key);
    return JSON.parse(data);
  }

  hasData() {
    const data = localStorage.getItem(this.key);
    return !!data;
  }

  removeData() {
    localStorage.removeItem(this.key);
  }
}

export default LocalStorageData;
