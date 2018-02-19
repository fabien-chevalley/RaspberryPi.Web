import {StorageUtility} from './storage.utility';

export function LocalStorage(key?: string) {
  return BaseStorage(localStorage, key);
}

export function SessionStorage(key?: string) {
  return BaseStorage(sessionStorage, key);
}

// initialization cache
const cache = {};

export let BaseStorage = (webStorage: Storage, key: string) => {
  return (target: Object, propertyName: string): void => {
    key = key || propertyName;

    const storageKey = StorageUtility.generateStorageKey(key);
    const storedValue = StorageUtility.get(webStorage, key);

    Object.defineProperty(target, propertyName, {
      get: function () {
        return StorageUtility.get(webStorage, key);
      },
      set: function (value: any) {
        if (!cache[key]) {
          // first setter handle
          if (storedValue === null) {
            // if no value in localStorage, set it to initializer
            StorageUtility.set(webStorage, key, value);
          }

          cache[key] = true;
          return;
        }

        StorageUtility.set(webStorage, key, value);
      },
    });
  };
};
