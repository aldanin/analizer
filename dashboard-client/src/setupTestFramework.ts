// mockup localStorage
const localStorageMock = {
  store : {},
  getItem : (key) => {
    return localStorageMock.store[key];
  },
  setItem: function (key, value) {
    localStorageMock.store[key] = value;
  },
  removeItem: function (key) {
    delete localStorageMock.store[key]
  }
};
(<any> global).localStorage = localStorageMock
