import { Injectable } from '@angular/core';

import { WoopsaService } from './woopsa.service';
import { WoopsaValue, WoopsaSubscription } from './woopsa/index';
import { async } from '@angular/core/testing';
import { promise } from 'selenium-webdriver';

export enum PinMode {
  Input, Output
}

@Injectable()
export class RaspberryPiService {

  constructor(private woopsa: WoopsaService) { 
  }

  connect(url: string, username: string, password: string) {
    this.woopsa.setUrl(url);
    this.woopsa.setAuthorization(username, password);
  }

  openPin(pinNumber: number) : Promise<WoopsaValue> {
    return this.woopsa.invoke(`device_garage/Gpio/P1Pin${pinNumber}/Open`);
  }

  setPinMode(pinNumber: number, mode: PinMode) : Promise<WoopsaValue> {
    return this.woopsa.invoke(`device_garage/Gpio/P1Pin${pinNumber}/SetMode`, { 'mode': PinMode[mode]});
  }

  writePin(pinNumber: number, value: number) : Promise<WoopsaValue> {
    return this.woopsa.invoke(`device_garage/Gpio/P1Pin${pinNumber}/Write`, { 'value': value});
  }

  pulsePin(pinNumber: number, value: number, milliseconds: number) : Promise<WoopsaValue> {
    return this.woopsa.invoke(`device_garage/Gpio/P1Pin${pinNumber}/Pulse`, {'value': value, 'milliseconds': milliseconds});
  }

  grabImage() : Promise<WoopsaValue> {
    return this.woopsa.invoke(`device_garage/Camera/GrabImage`);
  }

  timelapse(duration: Date, interval: number) : Promise<WoopsaValue> {
    return this.woopsa.invoke(`device_garage/Camera/GrabImage`, {'interval': interval, 'timeout': duration});
  }

  streaming(url: string, stream: string, seconds: number) : Promise<WoopsaValue> {
    return this.woopsa.invoke(`device_garage/Camera/StartStreaming`, {'url': url, 'streamName': stream, 'duration': seconds});
  }

  registerImageCallback(onChange: (value: WoopsaValue) => void): Promise<WoopsaSubscription> {
    return this.woopsa.subscribe('device_garage/Camera/LastImageFilename').then(subscription => {
      subscription.changes.subscribe(onChange);
      return subscription;
    });
  }

}
