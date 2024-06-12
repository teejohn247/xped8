import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotesInfoComponent } from '../notes-info/notes-info.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notesList: any[] = [];

  constructor(
    public dialog: MatDialog,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {

    this.notesList = [
      {
        id: 1,
        title: 'Note 1',
        content: 'Lorem ipsum dolor sit amet consectetur. Arcu interdum commodo cras facilisis pharetra. Pharetra neque lorem porttitor scelerisque proin enim.',
        dateCreated: '13 March, 2024',
        createdBy: 'Mark Cosby',
        priority: 'normal'
      },
      {
        id: 2,
        title: 'Note 2',
        content: 'Turpis tempus facilisi ut nunc. Suspendisse fringilla vestibulum dolor vitae praesent in rhoncus. Pulvinar consectetur rhoncus dui leo amet quam ante eu. Facilisi egestas est massa nisi elementum etiam euismod. Sit volutpat tristique cras tellus non aenean urna.',
        dateCreated: '24 June, 2024',
        createdBy: 'Neil Merryo',
        priority: 'important'
      },
      {
        id: 3,
        title: 'Note 3',
        content: 'Lorem ipsum dolor sit amet consectetur. Arcu interdum commodo cras facilisis pharetra. Euismod lectus potenti in habitant massa consectetur nullam tincidunt ut. Facilisi egestas est massa nisi elementum etiam euismod. Sit volutpat tristique cras tellus non aenean urna.',
        dateCreated: '26 June, 2024',
        createdBy: 'Neil Merryo',
        priority: ''
      },
      {
        id: 4,
        title: 'Note 4',
        content: 'Lorem ipsum dolor sit amet consectetur. Arcu interdum commodo cras facilisis pharetra. Pharetra neque lorem porttitor scelerisque proin enim.',
        dateCreated: '13 March, 2024',
        createdBy: 'Mark Cosby',
        priority: 'important'
      },
    ]
  }

  createNewNote() {
    const dialogRef = this.dialog.open(NotesInfoComponent, {
      width: '35%',
      height: 'auto',
      data: {
        isExisting: false,
      },
    });
  }

}
