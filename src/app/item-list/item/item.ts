
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { ItemData, ItemType } from './item-data';
import { ItemService } from '../item-service';

@Component({
  selector: 'item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Item {
  item = input<ItemData | null>();
  delete = output<string>();
  add = output<string>();

  itemService = inject(ItemService);

  get ItemType(): typeof ItemType {
    return ItemType;
  }

  addItem(id: string){
    this.add.emit(id);
  }

  deleteItem(id: string) {
    this.delete.emit(id);
  }
}
