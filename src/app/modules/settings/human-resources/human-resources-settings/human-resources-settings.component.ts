import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-human-resources-settings',
  templateUrl: './human-resources-settings.component.html',
  styleUrls: ['./human-resources-settings.component.scss']
})
export class HumanResourcesSettingsComponent implements OnInit {

  panelOpenState = false;
  accordionItems: any[] = [];

  departmentList: any[] = [];
  companyRoles: any[] = [];
  designationList: any[] = [];

  // hrSettingsForm: FormGroup;

  hrSettingsForm = this.fb.group({
    department: [''],
    designation: [''],
    companyRole: [''],
  })

  constructor(private hrService: HumanResourcesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData = async () => {
    this.departmentList = await this.hrService.getDepartments().toPromise();
    this.companyRoles = await this.hrService.getCompanyRoles().toPromise();
    this.designationList = await this.hrService.getDesignations().toPromise();
    this.accordionItems = [
      {
        label: "Departments",
        key: "departments",
        list: this.departmentList['data']
      },
      {
        label: "Designations",
        key: "designations",
        list: this.designationList['data']
      },
      {
        label: "Company Roles",
        key: "companyRoles",
        list: this.companyRoles['data']
      }
    ]
  }
  
  //Create a new department
  createDepartment() {
    let data = {
      "departmentName": this.hrSettingsForm.value.department
    }
    console.log(data);
    this.hrService.createDepartment(data).subscribe(res => {
      console.log(res);
    })
  }

  //Create a new designation
  createDesignation() {
    let data = {
      "designationName": this.hrSettingsForm.value.designation
    }
    console.log(data);
    this.hrService.createDesignation(data).subscribe(res => {
      if(res.status == 200) {
        location.reload();
      }
    })
  }

}
