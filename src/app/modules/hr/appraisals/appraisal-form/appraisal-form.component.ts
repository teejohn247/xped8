import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appraisal-form',
  templateUrl: './appraisal-form.component.html',
  styleUrls: ['./appraisal-form.component.scss']
})
export class AppraisalFormComponent implements OnInit {

  kpiCriteria = [
    {
      id: 1,
      grpLabel: 'General',
      grpKpis: [
        {
          id: 1,
          kpiLabel: 'Dependability',
          kpiDescription: 'Degree of supervision to carry out tasks'
        },
        {
          id: 2,
          kpiLabel: 'Adaptability',
          kpiDescription: 'Ability to learn quickly'
        },
        {
          id: 3,
          kpiLabel: 'Cooperation',
          kpiDescription: 'Ability to work effectively with co-workers'
        },
      ]
    },
    {
      id: 2,
      grpLabel: 'Software Development',
      grpKpis: [
        {
          id: 1,
          kpiLabel: 'Clean code architecture',
          kpiDescription: 'Degree of supervision to carry out tasks'
        },
        {
          id: 2,
          kpiLabel: 'Logical Reasoning',
          kpiDescription: 'Ability to learn quickly'
        },
        {
          id: 3,
          kpiLabel: 'Innovation',
          kpiDescription: 'Ability to work effectively with co-workers'
        },
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
