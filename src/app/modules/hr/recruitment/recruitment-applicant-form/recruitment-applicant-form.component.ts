import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recruitment-applicant-form',
  templateUrl: './recruitment-applicant-form.component.html',
  styleUrls: ['./recruitment-applicant-form.component.scss']
})
export class RecruitmentApplicantFormComponent implements OnInit {

  applicationForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    employeeId: [''],
    department: [''],
    manager: [''],
    travelPolicy: [''],
    expenses: [''],
    permission: [''],
    primaryDepartment: [''],
    advancePermission: [''],
    sendInvite: [false]
  });

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

}
