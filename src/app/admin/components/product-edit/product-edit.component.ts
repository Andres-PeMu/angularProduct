import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form:FormGroup;
  id:string;

  constructor(
    private formBuilder:FormBuilder,
    private productsService:ProductsService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
  ) {
    this.buildFrom();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params) => {
      this.id = params['id'];
      this.productsService.getProduct(this.id).subscribe(product => {
        this.form.patchValue({product});
      });
    })
  }

  saveProduct(event:Event){
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      console.log(product)
      this.productsService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
        console.log(newProduct)
        this.router.navigate(['/admin/products']);
      })
    }
  }

  private buildFrom(){
    this.form = this.formBuilder.group({
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
