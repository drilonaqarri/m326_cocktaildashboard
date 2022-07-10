import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';

import { ICocktail } from './interfaces/cocktail';
import { ICategories, IGlasses, IIngredients, IAlcoholic } from './interfaces/filters';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private baseUrl: string = "https://www.thecocktaildb.com/api/json/v1/1";

  constructor(private http: HttpClient) { }

  /** GET: get all Cocktails without any filters */
  getAllCocktails(): Observable<ICocktail[]> {
    return this.http.get<ICocktail[]>(`${this.baseUrl}/search.php?s`)
  }

  /** GET: get full Cocktail details by id */
  getCocktailById(id: number): Observable<ICocktail> {
    return this.http.get<ICocktail>(`${this.baseUrl}/lookup.php?i=${id}`);
  }

  /** GET: get all Cocktail by name */
  searchCocktailByName(name: string): Observable<ICocktail[]> {
    return this.http.get<ICocktail[]>(`${this.baseUrl}/search.php?s=${name}`);
  }

  /** GET: get all categories filters */
  getCategories(): Observable<ICategories> {
    return this.http.get<ICategories>(`${this.baseUrl}/list.php?c=list`);
  }

  /** GET: get all glasses filters */
  getGlasses(): Observable<IGlasses> {
    return this.http.get<IGlasses>(`${this.baseUrl}/list.php?g=list`);
  }

  /** GET: get all ingredients filters */
  getIngredients(): Observable<IIngredients> {
    return this.http.get<IIngredients>(`${this.baseUrl}/list.php?i=list`);
  }

  /** GET: get all alcoholic filters */
  getAlcoholics(): Observable<IAlcoholic> {
    return this.http.get<IAlcoholic>(`${this.baseUrl}/list.php?a=list`);
  }

  /** GET: filter by alcoholic */
  filterByAlcoholic(alcoholic: string): Observable<ICocktail[]>{
    return this.http.get<ICocktail[]>(`${this.baseUrl}/filter.php?a=${alcoholic}`);
  }

  /** GET: filter by category */
  filterByCategory(category: string): Observable<ICocktail[]>{
    return this.http.get<ICocktail[]>(`${this.baseUrl}/filter.php?c=${category}`);
  }

  /** GET: filter by glass */
  filterByGlass(glass: string): Observable<ICocktail[]>{
    return this.http.get<ICocktail[]>(`${this.baseUrl}/filter.php?g=${glass}`);
  }

  /** GET: filter by ingredient */
  filterByIngredient(ingredient: string): Observable<ICocktail[]>{
    return this.http.get<ICocktail[]>(`${this.baseUrl}/filter.php?i=${ingredient}`);
  }
}
