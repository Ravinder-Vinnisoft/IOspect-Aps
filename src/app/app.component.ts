import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IOspect-ApS-Angular';
  showNav: boolean | any;

  constructor(
    private router: Router
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      }
    });
  }
}
