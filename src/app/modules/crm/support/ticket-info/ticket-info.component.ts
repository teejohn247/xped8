import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {

  ticketFieldData: any[];
  employees: any[] = [];
  ticketForm!: FormGroup;

  fileName: string;
  ticketFile: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TicketInfoComponent>,
    private fb: FormBuilder,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) {
    this.ticketFieldData = [
      {
        controlName: 'ticketNo',
        controlType: 'text',
        controlLabel: 'Ticket Number',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'ticketTitle',
        controlType: 'text',
        controlLabel: 'Ticket Title',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'ticketDescription',
        controlType: 'text',
        controlLabel: 'Ticket Description',
        controlWidth: '100%',
        initialValue: null,
        validators: [],
        order: 3
      },
      {
        controlName: 'contact',
        controlType: 'select',
        controlLabel: 'Contact',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Mark: 'Mark Thierry',
          Rita: 'Rita Crosby'
        },
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'stage',
        controlType: 'select',
        controlLabel: 'Stage',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          New: 'New',
          Triaged: 'Triaged',
          Assigned: 'Assigned',
          Investigating: 'Investigating',
          Progress: 'In progress',
          Waiting: 'Awaiting Customer Response',
          Resolved: 'Resolved'
        },
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'priority',
        controlType: 'select',
        controlLabel: 'Priority',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          High: 'High',
          Medium: 'Medium',
          Low: 'Low'
        },
        validators: [Validators.required],
        order: 5
      },
      {
        controlName: 'closureTime',
        controlType: 'select',
        controlLabel: 'Closure Time',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          '6hrs': '6 Hrs',
          '12hrs': '12 Hrs',
          '24hrs': '24 Hrs',
          '48hrs': '48 Hrs'
        },
        validators: [Validators.required],
        order: 6
      },
      {
        controlName: 'source',
        controlType: 'select',
        controlLabel: 'Source',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Facebook: 'Facebook',
          Instagram: 'Instagram',
          LinkedIn: 'LinkedIn',
          Email: 'Email',
          Sales: 'Sales Team'
        },
        validators: [Validators.required],
        order: 7
      },
      {
        controlName: 'creationDate',
        controlType: 'date',
        controlLabel: 'Creation Date',
        controlWidth: '48%',
        initialValue: null,
        validators: [Validators.required],
        order: 8
      },
      {
        controlName: 'associatedTickets',
        controlType: 'mutipleSelect',
        controlLabel: 'Associated Tickets',
        controlWidth: '100%',
        initialValue: '',
        selectOptions: {
          '1457': '1457',
          '4582': '4582',
          '2478': '2478',
        },
        validators: [Validators.required],
        order: 9
      },
      {
        controlName: 'fileUpload',
        controlType: 'file',
        controlLabel: '',
        controlWidth: '100%',
        initialValue: null,
        validators: [],
        order: 11
      },
    ]

    this.ticketFieldData.sort((a,b) => (a.order - b.order));
    this.ticketForm = this.fb.group({})

    this.ticketFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.ticketForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
  }

  //Converts an array to an Object of key value pairs
  arrayToObject(arrayVar, key:string) {
    let reqObj = {}
    reqObj = arrayVar.reduce((agg, item, index) => {
      agg[item['_id']] = item[key];
      return agg;
    }, {})
    console.log(reqObj);
    return reqObj;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  removeTicket(ticket: any) {
    const selectedTickets = this.ticketForm.value['associatedTickets'] as string[];
    this.removeFirst(selectedTickets, ticket);
    this.ticketForm.get['associatedTickets'].setValue(selectedTickets); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  ticketFileUpload(event) {
    this.ticketFile = event.target.files[0];
    this.fileName = this.ticketFile.name;
  }

  onSubmit() {
    if(this.ticketForm.valid) {
      let data = {
      }
      // console.log(data);
      // this.hrService.bookVisitor(data).subscribe({
      //   next: res => {
      //     // console.log(res);
      //     if(res.status == 200) {
      //       this.notifyService.showSuccess('This meeting has been booked successfully');
      //       this.dialogRef.close();
      //     }
      //   },
      //   error: err => {
      //     console.log(err)
      //     this.notifyService.showError(err.error.error);
      //   } 
      // })
    }
  }

}
