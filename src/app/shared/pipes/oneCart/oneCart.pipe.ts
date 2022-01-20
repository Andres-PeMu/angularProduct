import { Pipe, PipeTransform } from '@angular/core';

// import { Product } from './../../../core/models/product.model';
// import { CartService } from './../../../core/services/cart.service';

@Pipe({
  name: 'my-pipe'
})
export class MyPipePipe implements PipeTransform {

  transform(objects: object[], id: string): any {

    const countedObjects: object[] = [];

    for (const object of objects) {
      const countObject: any = countedObjects.find(obj => obj === object);
      if (countObject) {
        countObject.count++;
      }else{
        countedObjects.push({...object, count: 1});
      }
    }

    return countedObjects;
  }

}
