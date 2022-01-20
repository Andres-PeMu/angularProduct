import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private productsService:ProductsService,
    private router:Router
  ) {
    this.buildFrom();
  }

  ngOnInit(): void {
  }

  saveProduct(event:Event){
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      console.log(product)
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        console.log(newProduct)
        this.router.navigate(['/admin/products']);
      })
    }
  }

  private buildFrom(){
    this.form = this.formBuilder.group({
      id:['',[Validators.required]],
      title:['',[Validators.required]],
      price:['',[Validators.required, MyValidators.isPriceValid]],
      image:[''],
      description:['',[Validators.required]],
    })
  }

  get priceFiel(){
    return this.form.get('price');
  }

}
