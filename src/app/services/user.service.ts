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
        rezervisaniFilmovi: [3, 6, 9]
      }
      localStorage.setItem('users', JSON.stringify([defaultUser]))
      json = localStorage.getItem('users')
    }
    return JSON.parse(json!)
  }

  public createUser(model: UserModel) {
    const arr = this.getAllUsers()
    if (arr.find(user => user.email = model.email))
      throw new Error('Uneti email je vec u upotrebi!')

    arr.push(model)
    localStorage.setItem('users', JSON.stringify(arr))
  }
  public getCurrentUser() {
    if (!sessionStorage.getItem('active'))
      throw new Error('NO_ACTIVE_USER')

    const email = sessionStorage.getItem('active')
    const arr = this.getAllUsers()
    const usr = arr.find(user => user.email == email)

    if (usr == undefined)
      throw new Error('NO_ACTIVE_USER')

    return usr
  }

  public changePassword(password: string) {
    const active = this.getCurrentUser()
    active.password = password

    const all = this.getAllUsers()
    for (let user of all)
      if (user.email == active.email) {
        user = active
      }

    localStorage.setItem('users', JSON.stringify(all))
  }

  public hasCurrentUser() {
    return sessionStorage.getItem('active') ? true : false
  }

  public logout() {
    const usr = this.getCurrentUser()
    sessionStorage.removeItem('active')
  }


}
