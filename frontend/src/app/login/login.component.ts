import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebApiService } from '../services/web-services/web-api.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private webApi: WebApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/tasks')
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.webApi.loginService(this.loginForm.value)
    .pipe(first())
      .subscribe(  
        result => this.router.navigate(['tasks']),
        err => console.log(err)

      );
  }

}
