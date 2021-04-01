import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {


  products : Product[];
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor( private productService : ProductService) { }

  ngOnInit(): void {

    // Obter a lista de produtos.
    this.productService.getListProducts().subscribe( p => {
      this.products = p
      console.log(this.products)
    });

  }

}
