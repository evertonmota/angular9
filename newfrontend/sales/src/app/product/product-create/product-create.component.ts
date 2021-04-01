import { Product } from './../product.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/product/product.service';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product : Product = {

    name : '',
    price: null  
  }

  constructor( private produtoService: ProductService ,
      private router : Router) { }

  ngOnInit(): void {
  }

  createProduct() : void{
    
    this.produtoService.createProduct(this.product).subscribe(() => {

      this.produtoService.showMessage("Produto criado com sucesso.");

      this.router.navigate(['/products'])
    });
  }

  cancel() :void{
    this.router.navigate(['/products'])
  }
}

