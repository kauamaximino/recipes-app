import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DetailsReceipe from './pages/DetailsReceipe';
import DetailsDrink from './pages/DetailsDrink';
import FoodsProgress from './pages/FoodsProgress';
import DrinkProgress from './pages/DrinkProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import IngredientsFoods from './pages/IngredientsFoods';
import IngredientsDrinks from './pages/IngredientsDrinks';
import FoodsNationalities from './pages/FoodsNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavRecipes from './pages/FavRecipes';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ DetailsReceipe } />
        <Route exact path="/drinks/:id" component={ DetailsDrink } />
        <Route exact path="/foods/:id/in-progress" component={ FoodsProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
        <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsNationalities }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </AppProvider>
  );
}

export default App;
