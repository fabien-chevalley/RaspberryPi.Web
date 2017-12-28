import { Injectable } from '@angular/core';

import { WoopsaService } from './woopsa.service';
import { WoopsaValue } from './woopsa/index';
import { async } from '@angular/core/testing';

export enum PinMode {
  Input, Output
}

@Injectable()
export class RaspberryPiService {

  constructor(private woopsa: WoopsaService) { 
  }

  connect(url: string) {
    this.woopsa.setUrl(url);
  }

  openPin(pinNumber: number) : Promise<WoopsaValue> {
    return this.woopsa.invoke('Gpio/Open', {'pinNumber': pinNumber});
  }

  setPinMode(pinNumber: number, mode: PinMode) : Promise<WoopsaValue>{
    return this.woopsa.invoke('Gpio/SetMode', {'pinNumber': pinNumber, 'mode': PinMode[mode]});
  }

  pulsePin(pinNumber: number, milliseconds: number) : Promise<WoopsaValue>{
    return this.woopsa.invoke('Gpio/Pulse', {'pinNumber': pinNumber, 'milliseconds': milliseconds});
  }
}
