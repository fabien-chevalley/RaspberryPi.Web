import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: SettingsService;

  constructor(private _titleService: Title,
              private _settingsService: SettingsService) {
  }

  ngOnInit() {
    this._titleService.setTitle(`Settings`);
    this.settings = this._settingsService;
  }

}
