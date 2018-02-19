import {Injectable} from '@angular/core';
import {StorageUtility} from './storage.utility';

@Injectable()
export class StorageService {

  constructor(private _storage: Storage) {}

  get(key: string): any {
    return StorageUtility.get(this._storage, key);
  }

  set(key: string, value: any): void {
    StorageUtility.set(this._storage, key, value);
  }

  remove(key: string): void {
    StorageUtility.remove(this._storage, key);
  }

  clear(): void {
    this._storage.clear();
  }
}

@Injectable()
export class LocalStorageService extends StorageService {
  constructor() {
    super(localStorage);
  }
}

@Injectable()
export class SessionStorageService extends StorageService {
  constructor() {
    super(sessionStorage);
  }
}
