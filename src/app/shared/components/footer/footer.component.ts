import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailField : FormControl;

  constructor() {
    this.emailField = new FormControl('',[
      Validators.required,
      Validators.email,
    ]);
    this.emailField.valueChanges.subscribe(value =>{

    })
  }

  ngOnInit() {
  }

  sendMain(){
    if(this.emailField.valid){

    }
  }

}
