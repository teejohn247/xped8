import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-appraisal',
  templateUrl: './general-appraisal.component.html',
  styleUrls: ['./general-appraisal.component.scss']
})
export class GeneralAppraisalComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    this.matrixItems.sort((a,b) => (a.order - b.order));
  }

}
