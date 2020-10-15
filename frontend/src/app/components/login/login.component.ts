import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public loginInvalid: boolean;
  public TabIndex = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/tasks')
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.dataService.switchTabObservable.subscribe(result => {
      if(result){
      const tabCount = 3;
      this.TabIndex = (this.TabIndex + 2) % tabCount;
      }
    })
  }

  login() {
    this.authService.loginService(this.loginForm.value)
    .pipe(first())
      .subscribe(  
        result => {
          this.dataService.isLoggedIn(true);
          this.router.navigate(['tasks'])
        },
        err => this.dataService.showSnackBar(err.error,'','error')

      );
  }

}
