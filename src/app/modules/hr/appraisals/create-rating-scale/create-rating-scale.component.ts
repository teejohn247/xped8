import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFields } from 'src/app/shared/models/form-fields';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';

@Component({
  selector: 'app-create-rating-scale',
  templateUrl: './create-rating-scale.component.html',
  styleUrls: ['./create-rating-scale.component.scss']
})
export class CreateRatingScaleComponent implements OnInit {

  ratingScaleFields: FormFields[];
  ratingScaleForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateRatingScaleComponent>,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
    private fb: FormBuilder
  ) {
    this.ratingScaleForm = this.fb.group({})

    this.ratingScaleFields = [
      {
        controlName: 'name',
        controlType: 'text',
        controlLabel: 'Name',
        controlWidth: '48%',
        initialValue: this.data.isExisting ? this.data.modalInfo.name : '',
        validators: [Validators.required],
        order: 1
      },
      {
        controlName: 'ratingValue',
        controlType: 'number',
        controlLabel: 'Rating Value',
        controlWidth: '48%',
        initialValue: this.data.isExisting ? this.data.modalInfo.ratingValue : '',
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'description',
        controlType: 'textarea',
        controlLabel: 'Description',
        controlWidth: '100%',
        initialValue: this.data.isExisting ? this.data.modalInfo.description : null,
        validators: null,
        order: 3
      }
    ]

    this.ratingScaleFields.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.ratingScaleForm.addControl(field.controlName, formControl)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }
  
}
