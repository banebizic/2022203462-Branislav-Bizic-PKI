import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { MovieComponent } from './movie/movie.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'search', component: SearchComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '' }
];
