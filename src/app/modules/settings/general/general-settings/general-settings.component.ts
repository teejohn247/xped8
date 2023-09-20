import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  systemRoles: any[] = [];
  accordionItems: any[] = [];

  panelOpenState = false;

  systemRolesForm: FormGroup;

  generalInfoForm = this.fb.group({
    companyName: [''],
    companyAddress: [''],
    superAdminEmail: ['dev@silo-inc.com'],
    superAdminPassword: [''],
  })

  constructor(private hrService: HumanResourcesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //this.getDepartments();
    //this.getCompanyRoles();

    this.accordionItems = [
      {
        label: "Super Admin",
        key: "superAdmin",
        users: [
          {
            email: "dev@silo-inc.com"
          }
        ]
      },
      {
        label: "HR Module Admin",
        key: "hrAdmin",
        users: [
          {
            email: "matthew@silo-inc.com"
          },
          {
            email: "ray@silo-inc.com"
          }
        ]
      },
      {
        label: "Accounts Module Admin",
        key: "accountsAdmin",
        users: [
          {
            email: "ray@silo-inc.com"
          }
        ]
      },
      {
        label: "Projects Management Module Admin",
        key: "pmAdmin",
        users: [
          {
            email: "matthew@silo-inc.com"
          },
        ]
      },
      {
        label: "CRM Module Admin",
        key: "crmAdmin",
        users: [
          {
            email: "matthew@silo-inc.com"
          },
          {
            email: "ray@silo-inc.com"
          }
        ]
      },
      {
        label: "Supply Chain Module Admin",
        key: "scmAdmin",
        users: [
          {
            email: "ray@silo-inc.com"
          }
        ]
      }
    ]

    //console.log(this.accordionItems);

    this.systemRolesForm = this.fb.group({})
    this.accordionItems.forEach(field => {
      const formControl = this.fb.control('')
      this.systemRolesForm.addControl(field.key, formControl)
    })
  }


  // getDepartments() {
  //   this.hrService.getDepartments().subscribe(res => {
  //     if(res.status == 200) {
  //       this.departmentList = res.data;
  //     }
  //     console.log(this.departmentList);
  //   })
  // }

  // getCompanyRoles() {
  //   this.hrService.getCompanyRoles().subscribe(res => {
  //     if(res.status == 200) {
  //       this.companyRoles = res.data;
  //     }
  //     //console.log(this.companyRoles);
  //   })
  // }

}
