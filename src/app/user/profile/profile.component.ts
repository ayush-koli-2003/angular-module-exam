import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class EditProfileComponent {

  // To check trigger of redirection
  redirectTriggered=false;
  formInvalid = false;
  constructor(private userAuth:UserAuthService,private router:Router){
    this.userAuth.redirectObs.subscribe(
      (data)=> this.redirectTriggered = data
    )
  }

  // Create form group of fields to be edited
  formGroup = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required,Validators.minLength(4)])
  })

  // Detect changes in form control
  changes(){
    this.userAuth.formChange(true);
  }

  // To save form data
  saveForm(){
    this.userAuth.formChange(false);
  }

  // To submit form
  submitForm(){
    if(this.formGroup.valid){
      this.formInvalid=false;
      this.router.navigate([''])
    }
    else{
      this.formInvalid=true;
    }
  }

  // To leave form even if not saved
  leaveForce(){
    // console.log("Changes saved!");
    
    this.userAuth.formChange(true);
    this.router.navigate([''])
  }

  // To stay in case changes not saved
  stay(){
    this.userAuth.redirectSub.next(false);
  }
}
