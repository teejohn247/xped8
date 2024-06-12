import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';

@Component({
  selector: 'app-purchase-order-info',
  templateUrl: './purchase-order-info.component.html',
  styleUrls: ['./purchase-order-info.component.scss']
})
export class PurchaseOrderInfoComponent implements OnInit {

  orderFieldData: any[];
  orderForm!: FormGroup;
  orderDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PurchaseOrderInfoComponent>,
    private fb: FormBuilder,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,

  ) {
    this.orderFieldData = [
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
        order: 1
      },
      {
        controlName: 'refNo',
        controlType: 'text',
        controlLabel: 'Reference Number',
        controlWidth: '48%',
        readonly: true,
        validators: [Validators.required],
        order: 2
      },
      {
        controlName: 'dateRequested',
        controlType: 'date',
        controlLabel: 'Date Requested',
        controlWidth: '48%',
        initialValue: '',
        validators: [Validators.required],
        order: 3
      },
      {
        controlName: 'associatedQuotation',
        controlType: 'select',
        controlLabel: 'Associated Quotation',
        controlWidth: '48%',
        initialValue: '',
        selectOptions: {
          Mark: 'Mark Thierry',
          Rita: 'Rita Crosby'
        },
        validators: [Validators.required],
        order: 4
      },
      {
        controlName: 'paymentTerms',
        controlType: 'text',
        controlLabel: 'Payment Terms',
        controlWidth: '100%',
        readonly: true,
        validators: [],
        order: 5
      },
    ]

    this.orderFieldData.sort((a,b) => (a.order - b.order));
    this.orderForm = this.fb.group({
      orderItemDetails: new FormArray([]),
      orderTotal: new FormControl(0)
    });

    this.orderFieldData.forEach(field => {
      const formControl = this.fb.control(field.initialValue, field.validators)
      this.orderForm.addControl(field.controlName, formControl)
    });

    this.orderDetails = this.orderForm.get("orderItemDetails") as FormArray;
    this.addOrderItem();
    this.calcOrderTotal();
  }

  ngOnInit(): void {
    console.log(this.orderForm.value);
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

  addOrderItem() {
    const orderItem = this.fb.group({
      description: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      unitPrice: new FormControl(0, Validators.required),
      tax: new FormControl(0, Validators.required),
      subTotal: new FormControl(0, Validators.required)
    });

    this.orderDetails.push(orderItem);
  }

  removeOrderItem(index: number) {
    this.orderDetails.removeAt(index);
  }

  calcOrderItemTotal(index: number) {
    let itemVal = this.orderDetails.at(index);
    console.log(itemVal.value);
    const baseTotal = itemVal.value.quantity * itemVal.value.unitPrice;
    const subTotal = (baseTotal * itemVal.value.tax/100) + baseTotal;
    this.orderDetails.at(index).get('subTotal').setValue(subTotal);
    this.calcOrderTotal();
  }

  calcOrderTotal() {
    let order = this.orderDetails.value;
    console.log(order);
    const sum = order.reduce((accumulator, currentValue) => accumulator + currentValue.subTotal, 0);
    this.orderForm.controls['orderTotal'].setValue(sum);
    console.log(this.orderForm.value);
  }

}
