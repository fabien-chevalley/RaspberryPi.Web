import { Injectable } from '@angular/core';

import { LocalStorage } from './utils/storage';

@Injectable()
export class SettingsService {

  @LocalStorage()
  public Username : string;

  @LocalStorage()
  public Password : string;
}
