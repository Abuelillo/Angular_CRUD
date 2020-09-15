import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://loginapp-96c6d.firebaseio.com/';
  constructor(private http:HttpClient) { }

  getHeroes(){
    return this.http.get(`${this.url}heroes.json`)
            .pipe(
              map( resp => this.crearArreglo(resp)), //  map( this.crearArreglo)
              delay(500)
            );
  }

  getheroe(id:string){
    return this.http.get(`${this.url}heroes/${id}.json`);
  }

  crearHeroe(heroe:HeroeModel){
    const query = '';    
    return this.http.post(`${this.url}heroes.json`,heroe).pipe(
      map((resp:any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe:HeroeModel){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}heroes/${heroe.id}.json`,heroeTemp);
  }

  borrarHeroe(id:string){
    return this.http.delete(`${this.url}heroes/${id}.json`);
  }

  private crearArreglo(heroesObj:object){
    const heroes: HeroeModel[] = [];

    if (heroesObj === null) {return [];}

    Object.keys(heroesObj).forEach(key =>{
      const heroe:HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
     })
    
    return heroes;
  }
}
