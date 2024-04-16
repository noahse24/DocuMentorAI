
import { HostListener } from '@angular/core';

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  installPrompt;
  @HostListener('window:beforeinstallprompt'  , ['$event'])
  onBeforeInstallPrompt(event: Event) {
    this.installPrompt = event;
    return false;
  }  
  @HostListener('window:appinstalled')
  onAppInstalled() {
    this.installPrompt = null;
  }
  install() {
    this.installPrompt.prompt();
  }
  isMobileDevice: Observable<boolean> = 
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches) );
  constructor(private breakpointObserver: BreakpointObserver) {}
}
