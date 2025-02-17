import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { UserAuthService } from "../services/user-auth.service";

@Injectable({
  providedIn:'root'
})

export class ProfileGuard implements CanDeactivate<any>{
  redirect:any
  constructor(private auth:UserAuthService){
    this.auth.redirectObs.subscribe(
      (data)=> this.redirect=data
    )
  }
  changed:any
  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
    
    // Take latest value to check unsaved changes to form
    this.auth.changedObs$.subscribe(
      (data)=> this.changed=data
    )

    // If there are unsaved changes
    if(this.changed===true){

      // If leaving form without saving
      if(this.redirect===true){
        this.auth.redirectSub.next(false)
        return true;
      }

      // Else stay on same
      this.auth.redirectSub.next(true)
      return false;
    }

    // After each redirect update redirect variable
    this.auth.redirectSub.next(false)
    return true;
  }
}