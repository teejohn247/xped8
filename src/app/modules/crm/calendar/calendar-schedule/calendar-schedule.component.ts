import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { AuthenticationService } from 'src/app/shared/services/utils/authentication.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { DatePipe } from '@angular/common';
import { PublicHolidayInfoComponent } from 'src/app/modules/settings/human-resources/public-holiday-info/public-holiday-info.component';
import { MeetingInfoComponent } from 'src/app/modules/hr/calendar/meeting-info/meeting-info.component';
import { SocialsInfoComponent } from '../../communication/socials-info/socials-info.component';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#eb5757',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar-schedule',
  templateUrl: './calendar-schedule.component.html',
  styleUrls: ['./calendar-schedule.component.scss']
})
export class CalendarScheduleComponent implements OnInit {

  userDetails: any;
  employeeList: any[] = [];
  calendarDetails: any;
  sortedEvents: any[] = [];
  upcomingEvents: any[] = [];
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="bi bi-pen-fill ms-2"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.viewMeetingInfo(event);
      },
    },
    {
      label: '<i class="bi bi-trash3-fill ms-2 text-danger"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteMeeting(event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors.yellow },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  activeDayIsOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NgbModal,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private authService: AuthenticationService,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.userDetails = this.authService.loggedInUser.data;
    const formControls = this.eventFilters.map(control => new FormControl(false));
    const selectAllControl = new FormControl(false);
    this.filterForm = this.fb.group({
      eventFilters: new FormArray(formControls),
      selectAll: selectAllControl
    });
    this.getPageData();
  }

  ngOnInit(): void {
    console.log(this.events);
    this.filterChange();
  }

  getPageData = async () => {
    this.employeeList = await this.hrService.getEmployees().toPromise();
    this.calendarDetails = await this.hrService.getCalendar().toPromise(); 
    this.calendarDetails = this.calendarDetails['data'];   
    console.log(this.calendarDetails);
    this.sortCalendarEvents();
    this.generateEvents();
  }

  // Event Filter Functions
  filterForm: FormGroup;
  eventFilters = [
    { id: 1, name: 'Meetings', icon:'bi bi-clipboard2-check-fill ms-2 me-1', class: 'meetings' },
    { id: 2, name: 'Social Media', icon:'bi bi-flag-fill ms-2 me-1', class: 'holidays' },
    // { id: 3, name: 'Leave Days', icon:'bi bi-house-fill ms-2 me-1', class: 'leave' },
    // { id: 4, genre: 'Hiphop' }
  ];

  filterChange(): void {
    // Subscribe to changes on the selectAll checkbox
    this.filterForm.get('selectAll').valueChanges.subscribe(bool => {
      this.filterForm.get('eventFilters').patchValue(Array(this.eventFilters.length).fill(bool), { emitEvent: false });
    });

    // Subscribe to changes on the filter preference checkboxes
    this.filterForm.get('eventFilters').valueChanges.subscribe(val => {
      const allSelected = val.every(bool => bool);
      if (this.filterForm.get('selectAll').value !== allSelected) {
        this.filterForm.get('selectAll').patchValue(allSelected, { emitEvent: false });
      }
    });

    console.log(this.filterForm.value);
  }
  
  filterEvents() {
    // Filter out the unselected ids
    const selectedPreferences = this.filterForm.value.eventFilters.map((checked, index) => checked ? this.eventFilters[index].id : null).filter(value => value !== null);
    // console.log(selectedPreferences);
    // Do something with the result
  }
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    // let meetingEvents = events.filter(x => !x.allDay)
    // console.log('Meeting clicked', meetingEvents);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    // this.viewMeetingInfo(meetingEvents);
  }
  
  eventTimesChanged({event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  
  handleEvent(action: string, event: CalendarEvent): void {
    if(event.allDay) this.viewHolidayInfo(event);
    else this.viewMeetingInfo(event);
  }
  
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  
  createNewMeeting() {
    if(this.employeeList) {
      const dialogRef = this.dialog.open(MeetingInfoComponent, {
        width: '30%',
        height: 'auto',
        data: {
          isExisting: false,
          employeeList: this.employeeList['data']
        },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.hrService.getCalendar().subscribe(res => {
          this.calendarDetails = res.data;
          this.generateEvents();
          // console.log(this.calendarDetails);
        });
      });
    }
    else {
      this.notifyService.showError('All data needed to create a meeting is not available yet. please try again');
    }
  }
  
  generateEvents() {
    this.generateMeetingEvents();
    // console.log(this.events);
  }

  sortCalendarEvents() {
    this.calendarDetails['holidays'].map(event => {
      event['dateRef'] = event.date;
      event['type'] = 'holiday';
      this.sortedEvents.push(event);
    })

    this.calendarDetails['meetings'].map(event => {
      event['dateRef'] = event.meetingStartTime;
      event['type'] = 'meeting';
      this.sortedEvents.push(event);
    })

    this.sortedEvents.sort(function(a, b): any {
      return a.dateRef.localeCompare(b.dateRef);
    });
    
    const today = new Date().getTime();
    this.upcomingEvents = this.sortedEvents.filter((items)  => {
      return new Date(items.dateRef).getTime() > today;
    })
    console.log(this.upcomingEvents);
  }

  generateMeetingEvents() {
    this.calendarDetails['meetings'].map((event: any) => {
      let eventData = {
        title: event.meetingTitle,
        start: this.strToDate(event.meetingStartTime),
        end: this.strToDate(event.meetingEndTime),
        color: colors.blue,
        actions: this.actions,
        allDay: false,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
      }
      this.events.push(eventData);
    })
  }

  strToDate(dateString) {
    const dateObject = new Date(Date.parse(dateString));
    return dateObject
  }
  
  viewHolidayInfo(details: any) {
    // console.log(details)
    let modalInfo: any;
    this.calendarDetails['holidays'].find((x: any) => {
      if(x.holidayName == details.title) modalInfo = x;
    })
    this.dialog.open(PublicHolidayInfoComponent, {
      width: '30%',
      height: 'auto',
      data: {
        name: modalInfo.holidayName,
        id: modalInfo._id,
        isExisting: true,
        modalInfo: modalInfo
      },
    })
  }
  
  viewMeetingInfo(details: any) {
    // console.log(details)
    let modalInfo: any = {};
    this.calendarDetails['meetings'].find((x: any) => {
      if(x.meetingTitle == details.title) modalInfo = x;
    })
    this.dialog.open(MeetingInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        name: modalInfo.meetingTitle,
        id: modalInfo._id,
        isExisting: true,
        employeeList: this.employeeList['data'],
        modalInfo: modalInfo
      },
    })
  }
  
  //Delete a Meeting
  deleteMeeting(info: any) {
    this.notifyService.confirmAction({
      title: 'Delete ' + info.title,
      message: 'Are you sure you want to delete this meeting?',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel',
    }).subscribe((confirmed) => {
      if (confirmed) {
        // this.hrService.deletePayrollPeriod(info._id).subscribe({
        //   next: res => {
        //     // console.log(res);
        //     if(res.status == 200) {
        //       this.notifyService.showInfo('The period has been deleted successfully');
        //     }
        //     this.getPageData();
        //   },
        //   error: err => {
        //     console.log(err)
        //     this.notifyService.showError(err.error.error);
        //   } 
        // })
      }
    });
  }

  schedulePost() {
    let dialogRef = this.dialog.open(SocialsInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        isExisting: false
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPageData();
    }); 
  }

}
