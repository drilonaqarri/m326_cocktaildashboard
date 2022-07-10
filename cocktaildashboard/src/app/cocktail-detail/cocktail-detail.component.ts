import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CocktailService } from '../cocktail.service';
import { ICocktail } from '../interfaces/cocktail';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.css']
})
export class CocktailDetailComponent implements OnInit {

  cocktail?: ICocktail;

  constructor(
    private route: ActivatedRoute,
    private cocktailService: CocktailService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCocktail();
  }

  getCocktail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.cocktailService.getCocktailById(id)
      .subscribe(cocktail => {
        console.log(cocktail)
        this.cocktail = cocktail['drinks'][0];
      })
  }

  isIngredientNull(ingredient: string): boolean{
    return ingredient == null;
  }
}
