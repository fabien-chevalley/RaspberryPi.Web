import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IDRMLicenseServer } from 'videogular2/streaming';

import { RaspberryPiService, PinMode } from '../raspberry-pi/services/raspberry-pi.service';
import { SettingsService } from '../settings/settings.service';

export interface IMediaStream {
  source: string;
  label: string;
  token?: string;
  licenseServers?: IDRMLicenseServer;
}

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {
  public PinNumber = 7;   
  public CurrentStream = 'http://localhost:8000/hls/raspberry.m3u8';

  constructor(private titleService: Title,
    private raspberryPiService: RaspberryPiService,
    private settingsService: SettingsService) {
      raspberryPiService.connect('http://localhost.ch:10443/woopsa', settingsService.Username, settingsService.Password);
  }

  async ngOnInit() {
    this.titleService.setTitle(`Garage door`);
    // this.raspberryPiService.registerImageCallback((woopsaValue) => this.manageNewImage(woopsaValue.asText));
  }

  pulseDoor() {
    this.raspberryPiService.pulsePin(this.PinNumber, 0, 1000);
  }

  startStreaming() {
    this.raspberryPiService.streaming('rtmp://192.168.1.7/hls/', 'raspberry', 120);
  }  
}
