import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.isLoggedInObservable
      .subscribe(result => {
        this.loggedIn = result;
      })
    if(localStorage.getItem('access_token')){
      this.loggedIn = true;
    }
  }

  logout() {
    this.dataService.isLoggedIn(false);
    localStorage.removeItem('user_details');
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');

    this.dataService.showSnackBar('You are now logged out', '', 'success');
  }

}
