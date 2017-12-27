import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  routes: Object[] = [
    {
      title: 'Garage',
      icon: 'directions_car',
      route: '/garage'
    },
    {
      title: 'Paramètres',
      icon: 'settings',
      route: '/settings'
    }
  ];

  constructor(public titleService: Title, 
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.titleService.setTitle(`Home`);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }
}
