import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  active = 1;
  userLoggedIn: boolean= true;

  constructor(
    public authApi: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.authApi.isUserLoggedIn ? this.userLoggedIn : !this.userLoggedIn
  }

  logOut() {
    try {
      this.spinner.show();
      this.authApi.logout().then(() => {
        this.spinner.hide();
        this.toaster.success("Logged out successfully", 'Success', {
          timeOut: 3000
        });
        this.router.navigate(['/login']);
      });
    } catch (ex) {
      console.log(ex);
    }
  }

}
