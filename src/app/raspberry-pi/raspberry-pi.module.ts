import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RaspberryPiService } from './services/raspberry-pi.service';
import { WoopsaService } from './services/woopsa.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ RaspberryPiService, WoopsaService ]
})
export class RaspberryPiModule { }
