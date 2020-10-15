import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  registrationInvalid: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/tasks')
    }
    this.registrationForm = this.formBuilder.group({
      name: [' ', Validators.required],
      email: [' ', Validators.required],
      password: [' ', Validators.required]
    });
  }

  register() {
    this.authService.RegistrationService(this.registrationForm.value)
    .pipe(first())
      .subscribe(  
        result => {
            this.dataService.DoSwitch(true);
            this.dataService.showSnackBar('Registration Success!','','success');
        },
        err => this.dataService.showSnackBar(err.error,'','error')
      );
  }

}

