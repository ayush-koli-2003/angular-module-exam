import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  changed:boolean = false;
  changedSub= new BehaviorSubject(this.changed)
  redirectTriggered=false;
  redirectSub = new BehaviorSubject(this.redirectTriggered)
  redirectObs = this.redirectSub.asObservable();
  changedObs$ = this.changedSub.asObservable()
  constructor() { }

  // To look for unsaved changes
  formChange(val:boolean){
    this.changedSub.next(val);
  }
}
