import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-info',
  templateUrl: './email-info.component.html',
  styleUrls: ['./email-info.component.scss']
})
export class EmailInfoComponent implements OnInit {

  @Input() opened:boolean = false;
  messageForm!:FormGroup;
  emailError:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      email: new FormControl('', Validators.email),
      recipients: new FormControl([], Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('')
    })
  }

  get emailRecipients():string[] {
    return this.messageForm.value.recipients;
  }

  addEmail() {
    if(this.messageForm.controls['email'].valid && this.messageForm.value.email && !this.emailRecipients.includes(this.messageForm.value.email)) {
      this.emailError = false;
      let currentEmails:string[] = this.emailRecipients;
      currentEmails.push(this.messageForm.value.email);
      this.messageForm.controls['recipients'].setValue(currentEmails);
      this.messageForm.controls['email'].reset();
    }
    else {
      this.emailError = true
      setTimeout(() => this.emailError = false, 2000)
    }
  }

  removeEmail(email:string) {
    let currentEmails:string[] = this.emailRecipients;
    let newVal = currentEmails.filter(x => x != email)
    this.messageForm.controls['recipients'].setValue(newVal);
  }

  sendEmail() {

  }

}
