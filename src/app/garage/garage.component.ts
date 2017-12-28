import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RaspberryPiService, PinMode } from '../raspberry-pi/services/raspberry-pi.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {
  private _isCommandPending: boolean;

  constructor(private titleService: Title,
    private raspberryPiService: RaspberryPiService) {
      raspberryPiService.connect('http://192.168.1.66/woopsa');
  }

  ngOnInit() {
    this.titleService.setTitle(`Garage`);
  }

  async pulse() {
    if(!this._isCommandPending) {
      this._isCommandPending = true;
      await this.raspberryPiService.openPin(18);
      await this.raspberryPiService.setPinMode(18, PinMode.Output);
      await this.raspberryPiService.pulsePin(18, 500);
      this._isCommandPending = false;
    }
  }
}
