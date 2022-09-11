import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  url: string = 'http://localhost:3000';
  private baseUrl: string = environment.baseUrl;
  constructor(
    private http: HttpClient,
  ) { }

  create(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  update(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${ heroe.id }`, heroe);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${ id }`);
  }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${ id }`);
  }

  getByFilter(term: string): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes/?q=${ term }&_limit=5`);
  }
}
