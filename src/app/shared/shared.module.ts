import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule }  from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { CreateSingleInfoComponent } from './components/create-single-info/create-single-info.component';

const SHARED_COMP = [
  MatIconModule,
  MatTableModule,
  MatCheckboxModule,
  MatSortModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [DeleteConfirmationComponent, CreateSingleInfoComponent],

  exports: [
    ...SHARED_COMP,
    ReactiveFormsModule,
  ],

  imports: [
    ...SHARED_COMP,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  providers : [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class SharedModule {
}
