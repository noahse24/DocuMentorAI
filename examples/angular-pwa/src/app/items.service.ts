import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends Dexie {

  items: Dexie.Table<Item, string>;

  constructor() {
    super('item-db');
    this.version(1).stores({
      items: 'id, title, done'
    });
  }
}
