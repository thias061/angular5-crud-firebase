import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, 
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm()
  }

  onSubmit(productForm: NgForm){
    if(productForm.value.$key == null){
      this.productService.insertProduct(productForm.value);
      this.toastrService.success('Successfull operation', 'Product created');
    }else{
      this.productService.updateProduct(productForm.value);
      this.toastrService.success('Successfull operation', 'Product edited');
    }
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }
}
