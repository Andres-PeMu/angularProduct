import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { ProductsService } from './../../../core/services/products/products.service';
import { MyValidators } from './../../../utils/validators';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form:FormGroup;
  image$:Observable<any>;


  constructor(
    private formBuilder:FormBuilder,
    private productsService:ProductsService,
    private router:Router,
    private storage:AngularFireStorage
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

  uploadFile(event:any) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('image')!.setValue(url);
        });
      })
    )
    .subscribe();
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
