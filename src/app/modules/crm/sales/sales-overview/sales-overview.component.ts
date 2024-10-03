import { Component, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from 'src/app/shared/models/table-columns';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from 'src/app/shared/services/utils/notification.service';
import { HumanResourcesService } from 'src/app/shared/services/hr/human-resources.service';
import { QuotationInfoComponent } from '../quotation-info/quotation-info.component';
import { PurchaseOrderInfoComponent } from '../purchase-order-info/purchase-order-info.component';
import { InvoiceInfoComponent } from '../invoice-info/invoice-info.component';


@Component({
  selector: 'app-sales-overview',
  templateUrl: './sales-overview.component.html',
  styleUrls: ['./sales-overview.component.scss']
})
export class SalesOverviewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  salesSummary: any[] = [];
  displayedColumns: any[];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  activeSalesView: string = 'quotations';

  tableColumns: any[] = [];
  tableData: any[] = [];

  // Quotation Table Column Names
  quotationTableColumns: any[] = [
    {
      key: "select",
      label: "Select",
      order: 1,
      columnWidth: "4%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "contactName",
      label: "Contact Name",
      order: 2,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "quotationTitle",
      label: "Quotation Title",
      order: 5,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "validity",
      label: "Validity",
      order: 4,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "expirationDate",
      label: "Expiration Date",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "paymentTerms",
      label: "Payment Terms",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 8,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: true
    }
  ]

  quotationTableData: any[] = [
    {
      id: 1,
      contactName: 'Joseph Stein',
      quotationTitle: 'Switch Gears Packages',
      validity: 'Feb 15, 2023',
      expirationDate: 'Feb 11, 2023',
      paymentTerms: '15 days',
      totalAmount: '£150',
    },
    {
      id: 2,
      contactName: 'Stoich Merrion',
      quotationTitle: 'Patch head batteries',
      validity: 'Apr 20, 2024',
      expirationDate: 'Jun 12, 2024',
      paymentTerms: '15 days',
      totalAmount: '£300',
    },
    {
      id: 3,
      contactName: 'Drake Pricket',
      quotationTitle: 'Vacation safety jackets',
      validity: 'Jun 16, 2024',
      expirationDate: 'Jul 03, 2024',
      paymentTerms: '15 days',
      totalAmount: '£220',
    },

  ]

  // Purchase Orders Table Column Names
  purchaseOrdersTableColumns: any[] = [
    {
      key: "select",
      label: "Select",
      order: 1,
      columnWidth: "4%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "contactName",
      label: "Contact Name",
      order: 2,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "orderTitle",
      label: "Order Title",
      order: 5,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "issueDate",
      label: "Issue Date",
      order: 4,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "deliveryDate",
      label: "Delivery Date",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "paymentTerms",
      label: "Payment Terms",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 8,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: true
    }
  ]

  purchaseOrdersTableData: any[] = [
    {
      id: 1,
      contactName: 'Joseph Stein',
      orderTitle: 'Switch Gears Packages',
      issueDate: 'Feb 15, 2023',
      deliveryDate: 'Feb 11, 2023',
      paymentTerms: '15 days',
      totalAmount: '£150',
    },
    {
      id: 2,
      contactName: 'Stoich Merrion',
      orderTitle: 'Patch head batteries',
      issueDate: 'Apr 20, 2024',
      deliveryDate: 'Jun 12, 2024',
      paymentTerms: '15 days',
      totalAmount: '£300',
    },
    {
      id: 3,
      contactName: 'Drake Pricket',
      orderTitle: 'Vacation safety jackets',
      issueDate: 'Jun 16, 2024',
      deliveryDate: 'Jul 03, 2024',
      paymentTerms: '15 days',
      totalAmount: '£220',
    },

  ]

  // Invoices Table Column Names
  invoicesTableColumns: any[] = [
    {
      key: "select",
      label: "Select",
      order: 1,
      columnWidth: "4%",
      cellStyle: "width: 100%",
      sortable: false
    },
    {
      key: "contactName",
      label: "Contact Name",
      order: 2,
      columnWidth: "12%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "invoiceTitle",
      label: "Invoice Title",
      order: 3,
      columnWidth: "15%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "issueDate",
      label: "Issue Date",
      order: 4,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "paymentDate",
      label: "Payment Date",
      order: 6,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "paymentTerms",
      label: "Payment Terms",
      order: 7,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      order: 8,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      order: 9,
      columnWidth: "10%",
      cellStyle: "width: 100%",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      order: 10,
      columnWidth: "5%",
      cellStyle: "width: 100%",
      sortable: true
    }
  ]

  invoicesTableData: any[] = [
    {
      id: 1,
      contactName: 'Joseph Stein',
      invoiceTitle: 'Switch Gears Packages',
      issueDate: 'Feb 15, 2023',
      paymentDate: 'Feb 11, 2023',
      paymentTerms: '15 days',
      totalAmount: '£150',
      status: 'paid'
    },
    {
      id: 2,
      contactName: 'Stoich Merrion',
      invoiceTitle: 'Patch head batteries',
      issueDate: 'Apr 20, 2024',
      paymentDate: 'Jun 12, 2024',
      paymentTerms: '15 days',
      totalAmount: '£300',
      status: 'pending'
    },
    {
      id: 3,
      contactName: 'Drake Pricket',
      invoiceTitle: 'Vacation safety jackets',
      issueDate: 'Jun 16, 2024',
      paymentDate: 'Jul 03, 2024',
      paymentTerms: '15 days',
      totalAmount: '£220',
      status: 'pending'
    },

  ]

  constructor(
    public dialog: MatDialog,
    private hrService: HumanResourcesService,     
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.salesSummary = [
      {
        id: 1,
        salesType: "Total Quotations",
        referenceDate: 'Last 30 days',
        salesValue: '$20k',
        icon: "bi bi-receipt-cutoff",
        status: "warning"
      },
      {
        id: 2,
        salesType: "Total Purchase Orders",
        referenceDate: 'Last 30 days',
        salesValue: '$12k',
        icon: "bi bi-rocket-takeoff",
        status: "pending"
      },
      {
        id: 3,
        salesType: "Total Invoices",
        referenceDate: 'Last 30 days',
        salesValue: '$10k',
        icon: "bi bi-file-earmark-text",
        status: "active"
      },
      {
        id: 4,
        salesType: "Total Revenue",
        referenceDate: 'Last 30 days',
        salesValue: '$200k',
        icon: "bi bi-cash-stack",
        status: "primary"
      }
    ]

    if(this.activeSalesView == 'quotations') {
      this.tableColumns = this.quotationTableColumns;
      this.tableData = this.quotationTableData;
    }
    else if(this.activeSalesView == 'purchaseOrders') {
      this.tableColumns = this.purchaseOrdersTableColumns;
      this.tableData = this.purchaseOrdersTableData;
    }
    else if(this.activeSalesView == 'invoices') {
      this.tableColumns = this.invoicesTableColumns;
      this.tableData = this.invoicesTableData;
    }

    this.getPageData();

  }

  getPageData = async () => {
    this.tableColumns.sort((a,b) => (a.order - b.order));
    this.displayedColumns = this.tableColumns.map(column => column.label);
    this.dataSource = new MatTableDataSource(this.tableData);
    // console.log(this.contactsList);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  setOrdersView(orderName: string) {
    if(orderName == 'quotations') {
      this.activeSalesView = 'quotations';
      this.tableColumns = this.quotationTableColumns;
      this.tableData = this.quotationTableData;
    }
    else if(orderName == 'purchaseOrders') {
      this.activeSalesView = 'purchaseOrders';
      this.tableColumns = this.purchaseOrdersTableColumns;
      this.tableData = this.purchaseOrdersTableData;
    }
    else if(orderName == 'invoices') {
      this.activeSalesView = 'invoices';
      this.tableColumns = this.invoicesTableColumns;
      this.tableData = this.invoicesTableData;
    }

    this.getPageData();
  }

  createNewQuotation() {
    const dialogRef = this.dialog.open(QuotationInfoComponent, {
      width: '42%',
      height: 'auto',
      data: {
        isExisting: false,
      },
    });
  }

  createNewPO() {
    const dialogRef = this.dialog.open(PurchaseOrderInfoComponent, {
      width: '42%',
      height: 'auto',
      data: {
        isExisting: false,
      },
    });
  }

  createNewInvoice() {
    const dialogRef = this.dialog.open(InvoiceInfoComponent, {
      width: '42%',
      height: 'auto',
      data: {
        isExisting: false,
      },
    });
  }

}
