import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/components/product/product.service';
import { Product } from 'src/app/product/product.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

product : Product;

  constructor(private service: ProductService, 
              private router : Router, 
              private link : ActivatedRoute) { 

              }

  ngOnInit(): void {
    
    // Este Parametro id foi definido na Rota - app-routing.module ( path: "products/delete/:id")
    // paramMap.get('id'); 

    // convertendo para o tipo number
    const id = +this.link.snapshot.paramMap.get('id');
    this.service.getEditById(id).subscribe( p => {
      this.product = p;
    })
  }


  deleteProduct(id: number) : void{
    // TODO se quisesse usar como string faria a interpolação
    //this.service.deleteProduct(`{this.product.id}`)
    this.service.deleteProduct(this.product.id).subscribe(e =>{
      this.service.showMessage("Produto excluído com sucesso.");
      this.router.navigate(['/products']);
    })
  }

  cancel() : void{
    this.router.navigate(['/products']);
  }
}
