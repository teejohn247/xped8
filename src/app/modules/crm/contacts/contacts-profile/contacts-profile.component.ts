import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { ActivityInfoComponent } from '../../shared/activity-info/activity-info.component';

@Component({
  selector: 'app-contacts-profile',
  templateUrl: './contacts-profile.component.html',
  styleUrls: ['./contacts-profile.component.scss']
})
export class ContactsProfileComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  createNewActivity() {
    const dialogRef = this.dialog.open(ActivityInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        isExisting: false,
      },
    });
  }

}
