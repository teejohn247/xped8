import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocialsInfoComponent } from '../socials-info/socials-info.component';

@Component({
  selector: 'app-socials-history',
  templateUrl: './socials-history.component.html',
  styleUrls: ['./socials-history.component.scss']
})
export class SocialsHistoryComponent implements OnInit {

  sideModalOpened: boolean = false;

  mediaPosts:any = [
    {
      id: 1,
      published: true,
      accounts: ['facebook', 'instagram'],
      timestamp: '2024-06-21T21:57:20.435Z',
      photo: 'https://spazioideale.com/wp-content/uploads/2022/10/news-9.jpeg',
      content: 'Predicting your next sentence, generating entire paragraphs, and tailoring content to your specific style and purpose.'
    },
    {
      id: 2,
      published: false,
      accounts: ['linkedin', 'instagram'],
      timestamp: '2024-06-21T21:57:20.435Z',
      photo: 'https://spazioideale.com/wp-content/uploads/2022/10/news-10.jpeg',
      content: 'Need help creating the perfect social media post or planning your next campaign?'
    },
    {
      id: 3,
      published: true,
      accounts: ['facebook', 'linkedin'],
      timestamp: '2024-06-21T21:57:20.435Z',
      photo: 'https://spazioideale.com/wp-content/uploads/2022/10/news3.jpeg',
      content: 'Create similar posts based on existing content freeing up your time and resources for other areas of your business.'
    },
    {
      id: 4,
      published: false,
      accounts: ['facebook', 'instagram'],
      timestamp: '2024-06-21T21:57:20.435Z',
      photo: 'https://spazioideale.com/wp-content/uploads/2024/04/SPAZIOIDEALE_IZIK-JON-Office_16-scaled.jpg',
      content: 'Crafting compelling captions that can stop the scroll.'
    }
  ]

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  getPageData() {

  }

  truncateText(text:string, n:number) {
    return text.substring(0, n) + "\u2026"
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
