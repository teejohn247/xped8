import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { DatePipe } from '@angular/common';
import { MeetingInfoComponent } from '../meeting-info/meeting-info.component';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  employeeList: any[] = [];
  calendarDetails: any[] = [];
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  holidayActions: CalendarEventAction[] = [
    {
      label: '<i class="bi bi-pen-fill ms-2"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    }
  ]

  actions: CalendarEventAction[] = [
    {
      label: '<i class="bi bi-pen-fill ms-2"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="bi bi-trash3-fill ms-2 text-danger"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
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
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    const formControls = this.eventFilters.map(control => new FormControl(false));
    const selectAllControl = new FormControl(false);
    this.filterForm = this.fb.group({
      eventFilters: new FormArray(formControls),
      selectAll: selectAllControl
    });
  }

  ngOnInit(): void {
    console.log(this.events);
    this.getPageData();
    this.filterChange();
  }

  getPageData = async () => {
    this.employeeList = await this.hrService.getEmployees().toPromise();
    this.calendarDetails = await this.hrService.getCalendar().toPromise(); 
    this.calendarDetails = this.calendarDetails['data'];   
    console.log(this.calendarDetails);
    this.generateEvents();
  }

  // Event Filter Functions
  filterForm: FormGroup;
  eventFilters = [
    { id: 1, name: 'Meetings', icon:'bi bi-clipboard2-check-fill ms-2 me-1', class: 'meetings' },
    { id: 2, name: 'Holidays', icon:'bi bi-flag-fill ms-2 me-1', class: 'holidays' },
    { id: 3, name: 'Leave Days', icon:'bi bi-house-fill ms-2 me-1', class: 'leave' },
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
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
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
          console.log(this.calendarDetails);
        });
      });
    }
    else {
      this.notifyService.showError('All data needed to create a meeting is not available yet. please try again');
    }
    
  }

  generateEvents() {
    this.generateHolidayEvents();
  }

  generateHolidayEvents() {
    this.calendarDetails['holidays'].map(event => {
      let eventData = {
        title: event.holidayName,
        start: startOfDay(this.strToDate(event.date)),
        end: endOfDay(this.strToDate(event.date)),
        color: colors.red,
        actions: this.holidayActions,
        allDay: true,
        draggable: true,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
      }
      this.events.push(eventData);
    })
    // this.events = [
    //   ...this.events,
    //   {
    //     title: 'New event',
    //     start: startOfDay(new Date()),
    //     end: endOfDay(new Date()),
    //     color: colors.red,
    //     draggable: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }

  strToDate(dateString) {
    const dateObject = new Date(Date.parse(dateString));
    return dateObject
  }
}
