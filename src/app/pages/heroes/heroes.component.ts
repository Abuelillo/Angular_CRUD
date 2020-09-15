import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.less']
})
export class HeroesComponent implements OnInit {

  heroes : HeroeModel[] = []; 
  cargando = false;

  constructor(private heroeService:HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroeService.getHeroes().subscribe(resp => {this.heroes = resp;this.cargando= false;});
  }

  borrarHeroe(heroe:HeroeModel,i:number){

    Swal.fire({      
      title:'Borrar ' + heroe.nombre,
      text:'Esta seguro que quiere borrar a '+ heroe.nombre,
      icon: 'question',
      confirmButtonText:'Borrar',
      showCancelButton: true,
      cancelButtonText:'Cancelar'      
    }).then((result) => {
      if (result.isConfirmed) {
          this.heroeService.borrarHeroe(heroe.id).subscribe();
          this.heroes.splice(i,1);        
      }
    })

    
  }

}
