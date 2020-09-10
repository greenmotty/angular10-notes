import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  public getRandomNumber(min: number, max: number): number {
    const updatedMin = Math.ceil(min);
    const updatedMax = Math.floor(max);
    return Math.floor(Math.random() * (updatedMax - updatedMin + 1)) + updatedMin;
  }

  public getRandomDate(year: number): Date {
    const start = new Date(year, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
