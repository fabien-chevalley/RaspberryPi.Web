import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule, MatDialogModule, MatTableModule,
  MatIconRegistry
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MatButtonModule, MatCardModule, MatIconModule,
  MatListModule, MatMenuModule, MatTooltipModule,
  MatSlideToggleModule, MatInputModule, MatCheckboxModule,
  MatToolbarModule, MatSidenavModule,
  MatTabsModule, MatSelectModule, MatDialogModule, MatTableModule
];

import { FlexLayoutModule } from '@angular/flex-layout';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { RaspberryPiModule } from './raspberry-pi/raspberry-pi.module';

import { AppComponent } from './app.component';
import { GarageComponent } from './garage/garage.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';


@NgModule({
  declarations: [
    AppComponent,
    GarageComponent,
    MainComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MATERIAL_MODULES,
    FlexLayoutModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    AppRoutingModule,
    RaspberryPiModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
