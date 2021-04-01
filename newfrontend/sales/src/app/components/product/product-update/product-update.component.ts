import { Product } from './../../../product/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/components/product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product : Product

  constructor(private productService : ProductService, 
              private router : Router,
              private active : ActivatedRoute
              ) { }

  ngOnInit(): void {
  
    const id = +this.active.snapshot.paramMap.get('id')
  
    this.productService.getEditById(id).subscribe( p =>
      {
        this.product = p;
      });
  }

  updateProduct() : void { 
    this.productService.updateProduct(this.product).subscribe( () =>{
      this.productService.showMessage('Produto atualizado com sucesso.')
      this.router.navigate(['/products']);
    });

  }

  cancel() : void {
    this.router.navigate(['/products']);
  }
}
