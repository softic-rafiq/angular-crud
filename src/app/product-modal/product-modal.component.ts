import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../services/products/products.service';
import { ProductData } from '../types/types';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent {
  freshness: string[] = ['Brand New', 'Second Hand', 'Fabrished Product'];
  productForm!: FormGroup;

  actionBtn: string = 'Save';
  modalContent: any = {
    title: 'Add Product Form',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: ProductData,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private productModalRef: MatDialogRef<ProductModalComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      freshness: ['', Validators.required],
      date: ['', Validators.required],
      comment: [''],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.modalContent = {
        title: 'Update Product Form',
      };
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }

    console.log('Edit data', this.editData);
  }

  addProduct(): void {
    console.log(this.productForm.value);

    if (!this.editData) {
      if (this.productForm.valid) {
        this.productsService.addProduct(this.productForm.value).subscribe({
          next: () => {
            alert('Product added successfully');
            this.productForm.reset();
            this.productModalRef.close('save');
          },
          error: (err) => {
            alert('Something wromng!');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.productsService
      .updateProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (resp) => {
          alert('Product updated successfully');
          this.productForm.reset();
          this.productModalRef.close('update');
        },
        error: (err) => {
          alert('Something wromng!');
        },
      });
  }
}
