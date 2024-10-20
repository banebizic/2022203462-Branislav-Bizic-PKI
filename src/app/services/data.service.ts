import { Injectable } from '@angular/core';
import { SearchModel } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static instance: DataService


  constructor() { }
  public static getInstance(): DataService {
    if (DataService.instance == null)
      DataService.instance = new DataService
    return DataService.instance
  }

  public getZanr(): string[] { return ["War", "Drama", "Action"] }
  public getCena(): number[] { return [1000, 1100, 1200, 1300, 1400, 1500] }

  public getFromSearch(): SearchModel {
    if (!sessionStorage.getItem('search')) {
      sessionStorage.setItem('search', JSON.stringify({
        nazivFilma: null,
        zanrFilma: null,
        cenaFilma: null
      }))
    }
    return JSON.parse(sessionStorage.getItem('search')!)
  }

  public saveSearchCriteria(search: SearchModel) {
    sessionStorage.setItem('search', JSON.stringify(search))
  }
}
