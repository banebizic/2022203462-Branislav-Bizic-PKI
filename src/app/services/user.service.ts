import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static instance: UserService
  constructor() { }

  public static getInstance(): UserService {
    if (UserService.instance == null)
      UserService.instance = new UserService
    return UserService.instance
  }

  public login(email: string, password: string) {
    const arr = this.getAllUsers()
    const usr = arr.find(user => user.email == email && user.password == password)

    if (usr == undefined)
      throw new Error('Korisnik sa tim podacima ne postoji!')

    sessionStorage.setItem('active', usr.email)
  }

  private getAllUsers(): UserModel[] {
    let json = localStorage.getItem('users')
    if (json === null) {
      const defaultUser = {
        name: 'Branislav Bizic',
        email: 'bane@bane.com',
        password: 'bane',
        phone: '011/123456',
        adress: 'Ulica 9',
        omiljeniFilmovi: ['Lov na zeleni dijamant', 'Nebeska udica'],
        rezervisaniFilmovi: ['MASH', 'Platoon']
      }
      localStorage.setItem('users', JSON.stringify([defaultUser]))
      json = localStorage.getItem('users')
    }
    return JSON.parse(json!)
  }

  public createUser(model: UserModel) {
    const arr = this.getAllUsers()
    if (arr.find(user => user.email === model.email))
      throw new Error('Uneti email je vec u upotrebi!')

    arr.push(model)
    localStorage.setItem('users', JSON.stringify(arr))
  }

  public updateUser(updatedUser: UserModel) {
    const users = this.getAllUsers()
    const userIndex = users.findIndex(user => user.email === updatedUser.email)

    if (userIndex === -1) {
      throw new Error('User not found!')
    }

    users[userIndex] = updatedUser
    localStorage.setItem('users', JSON.stringify(users))
  }

  public getCurrentUser() {
    if (!sessionStorage.getItem('active'))
      throw new Error('Niko nije ulogoban')

    const email = sessionStorage.getItem('active')
    const arr = this.getAllUsers()
    const usr = arr.find(user => user.email == email)

    if (usr == undefined)
      throw new Error('Niko nije ulogoban')

    return usr
  }

  public hasCurrentUser() {
    return sessionStorage.getItem('active') ? true : false
  }

  public logout() {
    const usr = this.getCurrentUser()
    sessionStorage.removeItem('active')
  }


}
