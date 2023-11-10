import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateKpiGroupComponent } from '../create-kpi-group/create-kpi-group.component';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { CreateKpiComponent } from '../create-kpi/create-kpi.component';
import { CreateAppraisalPeriodComponent } from '../create-appraisal-period/create-appraisal-period.component';
import { CreateRatingScaleComponent } from '../create-rating-scale/create-rating-scale.component';


@Component({
  selector: 'app-general-appraisal',
  templateUrl: './general-appraisal.component.html',
  styleUrls: ['./general-appraisal.component.scss']
})
export class GeneralAppraisalComponent implements OnInit {

  departmentList: any[] = [];
  sideModalOpened: boolean = false;

  matrixItems = [
    {
      id: 1,
      label: "Star",
      order: 3,
      staff: [
        {
          image: "staff1.jpg"
        },
      ]
    },
    {
      id: 2,
      label: "High Potential",
      order: 2,
      staff: [
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
      ]
    },
    {
      id: 3,
      label: "Potential Gem",
      order: 1
    },
    {
      id: 4,
      label: "High Performer",
      order: 6,
      staff: [
        {
          image: "staff1.jpg"
        },
        {
          image: "profile-img.jpg"
        },
      ]
    },
    {
      id: 5,
      label: "Core Player",
      order: 5,
      staff: [
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
        {
          image: "staff2.jpg"
        },
        {
          image: "profile-img.jpg"
        },
      ]
    },
    {
      id: 6,
      label: "Inconsistent Player",
      order: 4,
      staff: [
        {
          image: "profile-img.jpg"
        },
      ]
    },
    {
      id: 7,
      label: "Solid Performer",
      order: 9,
      staff: [
        {
          image: "profile-img.jpg"
        },
      ]
    },
    {
      id: 8,
      label: "Average Performer",
      order: 8,
      staff: [
        {
          image: "staff1.jpg"
        },
        {
          image: "staff3.jpg"
        },
      ]
    },
    {
      id: 9,
      label: "Risk",
      order: 7,
    }
  ]

  accordionItems = [
    {
      name: "Excellent",
      description: "Highest quality of delivery and professionalism",
      ratingValue: 5
    },
    {
      name: "Very Good",
      description: "Great quality of delivery and professionalism",
      ratingValue: 4
    },
    {
      name: "Good",
      description: "Good quality of delivery and professionalism",
      ratingValue: 3
    },
    {
      name: "Average",
      description: "Average quality of delivery and professionalism",
      ratingValue: 2
    },
    {
      name: "Poor",
      description: "Poor quality of delivery and professionalism",
      ratingValue: 1
    }
  ]

  constructor(    
    public dialog: MatDialog,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.matrixItems.sort((a,b) => (a.order - b.order));
    this.getPageData();
  }

  getPageData = async () => {
    this.departmentList = await this.hrService.getDepartments().toPromise();
  }

  addKpiGroup() {
    this.dialog.open(CreateKpiGroupComponent, {
      width: '30%',
      height: 'auto',
      data: {
        name: '',
        departments: this.departmentList['data'],
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  addKpi() {
    this.dialog.open(CreateKpiComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  addAppraisalPeriod() {
    this.dialog.open(CreateAppraisalPeriodComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

  addRating() {
    this.dialog.open(CreateRatingScaleComponent, {
      width: '30%',
      height: 'auto',
      data: {
        isExisting: false
      },
    }).afterClosed().subscribe(() => {
      this.getPageData();
    });
  }

}
