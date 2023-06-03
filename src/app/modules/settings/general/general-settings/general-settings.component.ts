import { Component, OnInit } from '@angular/core';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {

  departmentList: any[] = [];
  companyRoles: any[] = [];
  designationList: any[] = [];
  systemRoles: any[] = [];

  accordionItems = [
    {
      label: "Departments",
      data: this.departmentList,
      isActive: false
    },
    {
      label: "Company Roles",
      data: this.companyRoles,
      isActive: false
    },
    {
      label: "Designations",
      data: this.designationList,
      isActive: false
    },
    {
      label: "System Roles",
      data: this.systemRoles,
      isActive: false
    }
  ]

  constructor(private hrService: HumanResourcesService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.getCompanyRoles();
  }

  getDepartments() {
    this.hrService.getDepartments().subscribe(res => {
      if(res.status == 200) {
        this.departmentList = res.data;
      }
      console.log(this.departmentList);
    })
  }

  getCompanyRoles() {
    this.hrService.getCompanyRoles().subscribe(res => {
      if(res.status == 200) {
        this.companyRoles = res.data;
      }
      //console.log(this.companyRoles);
    })
  }

  toggleAccordion(event, index) {
    const element = event.target;
    element.classList.toggle("active");
    if (this.accordionItems[index].isActive) {
      this.accordionItems[index].isActive = false;
    } else {
      this.accordionItems[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}
