import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSelectionListChange } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as uuidV4 from 'uuid/v4';
import { Item } from '../item';
import { DialogComponent } from '../dialog/dialog.component';
import { environment } from './../../environments/environment';
import { ItemsService } from './../items.service';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  items: Item[];
  subscriptions: Subscription[] = [];

  constructor(private itemsService: ItemsService,
              private httpClient: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateItems();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  addItem() {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: {title: ''},
    }).afterClosed().pipe(
      filter(title => !!title),
      switchMap((title: string) => fromPromise(this.itemsService.items.add({id: uuidV4(), title, active: false}))),
    ).subscribe(() => this.updateItems());
  }

  async updateItems() {
    this.items = await this.itemsService.items.toArray();
  }

  async toggleItem(event: MatSelectionListChange) {
    const item = event.option.value;
    item.active = !item.active;
    await this.itemsService.items.put(item);
  }
}

/* DB and Services:
import { SyncService } from '../sync.service';

* await this.itemsService.items.put(item);

    private syncService: SyncService,
    this.subscriptions.push(this.syncService.syncDone.subscribe(() => this.updateItems()));

              private swPush: SwPush,
  async registerForPush() {
    await this.swPush.requestSubscription({
      serverPublicKey: environment.pushPublicKey
    });
  }

    this.subscriptions.push(this.swPush.subscription.pipe(
      tap(sub => this.canRegister = !sub && Notification.permission !== 'denied'),
      filter(sub => !!sub),
      switchMap(sub => this.httpClient.post(`${environment.baseUrl}push`, sub.toJSON()))
    ).subscribe());

 */
