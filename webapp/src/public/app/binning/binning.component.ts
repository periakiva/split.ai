import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';


@Component({
  selector: 'app-binning',
  templateUrl: './binning.component.html',
  styleUrls: ['./binning.component.scss']
})
export class BinningComponent implements OnInit {

  draggedItem: any;
  selectedItems: any[][];
  availableItems: any[];

  allItems: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.availableItems = this.getItems().slice(0);
    this.selectedItems = [];
    for (let i = 0; i < this.dataService.names.length; i++) {
      this.selectedItems.push([]);
    }

    this.allItems = this.getItems();
  }

  getItems() {
    return this.dataService.items;
  }

  dragStart(event, item) {
    console.log(item);
    this.draggedItem = item;
  }

  drop(event, binNum) {
    if (this.draggedItem) {
      const draggedItemIndex = this.findIndex(this.draggedItem);
      console.log(draggedItemIndex);
      this.selectedItems[binNum] = [... this.selectedItems[binNum], this.draggedItem];
      (<any[]>this.availableItems).splice(draggedItemIndex, 1);
      console.log(this.availableItems.length);
      this.draggedItem = null;
    }
  }

  dragEnd(event) {
    this.draggedItem = null;
  }

  findIndex(item) {
    let index = -1;
    for (let i = 0; i < this.availableItems.length; i++) {
      if (item.item === this.availableItems[i].item) {
        index = i;
        break;
      }
    }
    return index;
  }

  getTotalMoney(i) {
    return this.selectedItems[i].reduce((previous, current) => {
      return Math.round((Number(previous) + Number(current.price)) * 100) / 100;
    }, 0);
  }

  reset() {
    this.availableItems = this.getItems().slice(0);
    this.selectedItems = [];
    for (let i = 0; i < this.dataService.names.length; i++) {
      this.selectedItems.push([]);
    }
  }

}
