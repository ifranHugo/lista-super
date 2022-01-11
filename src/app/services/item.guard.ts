import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ItemGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  url: string = 'http://localhost:3000/items';
  httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  items: Item[] = [
    {
      id: 0,
      title: 'manzan',
      price: 10.5,
      quantity: 4,
      completed: false,
    },
    {
      id: 1,
      title: 'pan',
      price: 5.5,
      quantity: 6,
      completed: true,
    },
    {
      id: 2,
      title: 'cocacola',
      price: 5.5,
      quantity: 6,
      completed: true,
    },
    {
      id: 3,
      title: 'pera',
      price: 5.5,
      quantity: 6,
      completed: true,
    },
    {
      id: 4,
      title: 'naranja',
      price: 5.5,
      quantity: 6,
      completed: true,
    },
  ];
  constructor(private http: HttpClient) {}
  getItems(): Observable<Item[]> {
    //return this.items;
    return this.http.get<Item[]>(this.url);
  }
  addItem(item: Item): Observable<Item> {
    //this.items.unshift(item);
    return this.http.post<Item>(this.url, item, this.httpOptions);
  }
  toggleItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.url + item.id, item, this.httpOptions);
  }
  deleteItem(item: Item): Observable<Item> {
    return this.http.delete<Item>(this.url + item.id);
  }
}
