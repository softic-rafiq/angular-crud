import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ProductsService } from './services/products/products.service';
import { ProductData } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-crud';

  displayedColumns: string[] = [
    'productName',
    'category',
    'price',
    'comment',
    'freshness',
    'date',
    'action',
  ];

  dataSource!: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.getAllProduct();
  }
  openDialog() {
    this.dialog
      .open(ProductModalComponent)
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProduct();
        }
      });
  }

  getAllProduct() {
    this.productsService.getProducts().subscribe({
      next: (resp) => {
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(data: ProductData) {
    this.dialog
      .open(ProductModalComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProduct();
        }
      });
  }

  deleteProduct(id: any) {
    this.productsService.deleteProduct(id).subscribe({
      next: (res) => {
        alert('Product deleted successfully');
        this.getAllProduct();
      },
      error: (res) => {
        alert('Something wrong!');
      },
    });
  }
}
