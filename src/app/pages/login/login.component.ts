import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  validationMessages = {
    "email": {
      "required": "Email is required.",
      "email": "Email must be a valid email."
    }
  }

  user: User | undefined;
  
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  };

  ngOnInit(): void {
  }

  login() {
    try {
      this.spinner.show();
      const email = new HttpParams().set("email", this.loginForm.value.email);
      this.authService.login(email).pipe(map((response) => {
        if(response && response.length) {
          return response= new User(response[0].id, response[0].name, response[0].username, response[0].email, response[0].address, response[0].phone, response[0].website, response[0].company, true)
        } else {
          return response= null;
        }
      })).subscribe(user => {
        this.spinner.hide();
        if(user) {
          this.user = user;
          localStorage.setItem('IospectUser', JSON.stringify(this.user.userToJSON()));
          this.toaster.success("Logged in successfully", 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['/home']);
        } else {
          this.toaster.error("User not found.", 'Error', {
            timeOut: 3000,
          });
        }
      })
    } catch (ex) {
      console.log(ex);
    }
  }
}
