import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sms-info',
  templateUrl: './sms-info.component.html',
  styleUrls: ['./sms-info.component.scss']
})
export class SmsInfoComponent implements OnInit {

  @Input() opened:boolean = false;
  messageForm!:FormGroup;
  contactError:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      contact: new FormControl('', Validators.email),
      message: new FormControl('')
    })
  }

  addContact() {
    
  }

}
