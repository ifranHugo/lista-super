import { ItemGuard } from './../../services/item.guard';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  title: string = '';
  price: number = 0;
  quantity: number = 0;
  id: number = 0;
  constructor(private itemGuard: ItemGuard, private router: Router) {}

  ngOnInit(): void {}
  onSubmit() {
    const item = new Item();
    item.id = this.id;
    item.title = this.title;
    item.price = this.price;
    item.quantity = this.quantity;
    item.completed = false;
    //  this.itemGuard.addItem(item);
    this.itemGuard.addItem(item).subscribe((i) => {
      this.router.navigate(['/']);
    });
  }
}
