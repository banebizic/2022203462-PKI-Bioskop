import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getZanr(): string[] { return ["War", "Drama", "Action"] }
  public getCena(): number[] { return [1000, 1100, 1200, 1300, 1400, 1500] }
}
