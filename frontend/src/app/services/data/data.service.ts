import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public snackBar: MatSnackBar) { }
  
  switchTabSubject = new BehaviorSubject<boolean>(false);
  switchTabObservable = this.switchTabSubject.asObservable();

  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedInObservable = this.isLoggedInSubject.asObservable();
  
  DoSwitch(switched:boolean){
    this.switchTabSubject.next(switched);
  }

  public showSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: [className]
    });
  }

  isLoggedIn(loggedIn:boolean){
    this.isLoggedInSubject.next(loggedIn);
  }

}
