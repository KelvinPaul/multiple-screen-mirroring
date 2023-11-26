export const LocalStorage = {
  getItem(key: string) {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing item from localStorage: ${error}`);
      return null;
    }
  },

  setItem(key: string, value: any) {
    try {
      const item = JSON.stringify(value);
      localStorage.setItem(key, item);
    } catch (error) {
      console.error(`Error saving item to localStorage: ${error}`);
    }
  },
  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
  setState(id: string, value: any) {
    const positionState: any = LocalStorage.getItem("positionState") ?? {};
    positionState[id] = value;
    LocalStorage.setItem("positionState", positionState);
  },
  removeUnusedId(id: string) {
    const positionState: any = LocalStorage.getItem("positionState") ?? {};
    delete positionState[id];
    LocalStorage.setItem("positionState", positionState);
  },
  getState() {
    const positionState = LocalStorage.getItem("positionState") ?? {};
    return positionState;
  },
};
