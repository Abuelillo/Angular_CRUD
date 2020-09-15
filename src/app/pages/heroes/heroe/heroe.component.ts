import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.less']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroService:HeroesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id!=='nuevo') {
      this.heroService.getheroe(id).subscribe((resp:HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form:NgForm){

    if (form.invalid) {
      console.log('formulario no valido')
      return;
    } 

    Swal.fire({
      allowOutsideClick:true,
      title:'Espere',
      text:'Guardando informacion',
      icon:'info'
    });    
    Swal.showLoading();

    let peticion:Observable<any>;
    let mensaje:string;

    if (this.heroe.id) {
      peticion = this.heroService.actualizarHeroe(this.heroe);  
      mensaje ="Actualizado correctamente";
    } else {
      peticion =this.heroService.crearHeroe(this.heroe);  
      mensaje ="Creado correctamente";
    }   
    
    peticion.subscribe(resp =>{
      Swal.fire({
        allowOutsideClick:true,
        title:this.heroe.nombre,
        text:mensaje,
        icon:'success'
      })
    })
  }

  actualizarHeroe(){

  }
}
