import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemGuard } from '../../services/item.guard';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;

  constructor(private itemService: ItemGuard) {}

  ngOnInit(): void {
    //  this.items = this.itemGuard.getItems();
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      this.getTotal();
    });
  }
  deleteItem(item: Item) {
    this.items = this.items.filter((x) => x.id != item.id);
    this.itemService.deleteItem(item).subscribe();
    this.getTotal();
  }
  toggleItem(item: Item) {
    this.itemService.toggleItem(item).subscribe();
    this.getTotal();
  }
  getTotal() {
    this.total = this.items
      .filter((x) => !x.completed)
      .map((y) => y.quantity * y.price)
      .reduce((acc: any, y) => (acc += y), 0);
  }
}