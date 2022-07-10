import {Component, OnInit} from '@angular/core';
import {CocktailService} from '../cocktail.service';
import {IAlcoholic, ICategories, IGlasses, IIngredients} from '../interfaces/filters';
import {ICocktail} from '../interfaces/cocktail';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // All cocktails
  cocktails?: ICocktail[];

  // Search by filter
  searchBy: string = '';

  // Possible Filters
  drinkCategories?: ICategories[];
  drinkGlasses?: IGlasses[];
  drinkIngredients?: IIngredients[];
  alcoholics?: IAlcoholic[];

  // Other filter
  selectedFilter: any;
  selectedCategory: any = 'no_filter';
  selectedGlass: any = 'no_filter';
  selectedIngredient: any = 'no_filter';
  selectedAlcoholic: any = 'no_filter';

  //filter popup properties
  filterCollapsed: boolean = false;
  errorMessageShown : boolean = false;
  someFilterUsed: boolean = true;

  constructor(private cocktailService: CocktailService) {

  }

  ngOnInit(): void {
    this.getPossibleFilters();
    this.getCocktails();
  }

  filterClickedEvent() {
    this.filterCollapsed = !this.filterCollapsed;
  }

  getPossibleFilters(): void {
    this.cocktailService.getCategories()
      .subscribe((response) => {
        this.drinkCategories = response['drinks'];
      });

    this.cocktailService.getGlasses()
      .subscribe((response) => {
        this.drinkGlasses = response['drinks'];
      });


    this.cocktailService.getIngredients()
      .subscribe((response) => {
        this.drinkIngredients = response['drinks'];
      });


    this.cocktailService.getAlcoholics()
      .subscribe((response) => {
        this.alcoholics = response['drinks'];
      });

  }

  getCocktails(): void {

    this.cocktailService.getAllCocktails()
      .subscribe((cocktails: any[]) => {
        this.cocktails = cocktails['drinks'];
      });

  }

  searchCocktail(): void {
    this.cocktailService.searchCocktailByName(this.searchBy)
      .subscribe((cocktails: any[]) => {
        console.log(cocktails);
        this.cocktails = cocktails['drinks'];
      });
  }

  filterCocktails(): void {
    if (!this.haveMoreThanTwoFiltersBeenSelected(this.selectedCategory, this.selectedGlass, this.selectedIngredient, this.selectedAlcoholic)) {
      if (this.hasCategoryBeenSelected()) {
        this.cocktailService.filterByCategory(this.selectedCategory).subscribe((cocktails: any[]) => {
          this.cocktails = cocktails['drinks']
        })
        this.filterCollapsed = false;
      }
      if (this.hasGlassBeenSelected()) {
        this.cocktailService.filterByGlass(this.selectedGlass).subscribe((cocktails: any[]) => {
          this.cocktails = cocktails['drinks']
        })
        this.filterCollapsed = false;
      }
      if (this.hasIngredientBeenSelected()) {
        this.cocktailService.filterByIngredient(this.selectedIngredient).subscribe((cocktails: any[]) => {
          this.cocktails = cocktails['drinks']
        })
        this.filterCollapsed = false;
      }
      if (this.hasAlcoholicBeenSelected()) {
        this.cocktailService.filterByAlcoholic(this.selectedAlcoholic).subscribe((cocktails: any[]) => {
          this.cocktails = cocktails['drinks']
        })
        this.filterCollapsed = false;
      }
    }

    console.log(this.selectedCategory)
    console.log(this.selectedGlass)
    console.log(this.selectedIngredient)
    console.log(this.selectedAlcoholic)


  }

  hasCategoryBeenSelected() {
    return this.selectedCategory != "no_filter"
  }

  hasGlassBeenSelected() {
    return this.selectedGlass != "no_filter"
  }

  hasIngredientBeenSelected() {
    return this.selectedIngredient != "no_filter"
  }

  hasAlcoholicBeenSelected() {
    return this.selectedAlcoholic != "no_filter"
  }

  // @ts-ignore
  haveMoreThanTwoFiltersBeenSelected(filter1: String, filter2: String, filter3: String, filter4: String) {
    let count: number = 0;
    if (this.hasCategoryBeenSelected()) {
      count += 1;
    }
    if (this.hasGlassBeenSelected()) {
      count += 1;
    }
    if (this.hasIngredientBeenSelected()) {
      count += 1;
    }
    if (this.hasAlcoholicBeenSelected()) {
      count += 1;
    }
    if (count > 1) {
      this.errorMessageShown = true;
      return true;
    } else if (count < 1) {
      if (count == 0) {
        this.cocktailService.getAllCocktails().subscribe((cocktails: any[]) => {
          this.cocktails = cocktails['drinks']
        })
      }
      return false
    }
  }

  resetSelected()
    :
    void {
    this.selectedCategory = 'no_filter';
    this.selectedGlass = 'no_filter';
    this.selectedIngredient = 'no_filter';
    this.selectedAlcoholic = 'no_filter';
  }
}
