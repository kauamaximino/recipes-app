const saveLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export default saveLocalStorage;
