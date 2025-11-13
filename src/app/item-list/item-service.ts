import { Injectable } from '@angular/core';
import { ItemType } from './item/item-data';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  getIconName(type: ItemType): string {
    switch (type) {
      case ItemType.FILE:
        return 'file';
      case ItemType.FOLDER:
        return 'folder-open';
      default:
        return 'unknown';
    }
  }

  getName(type: ItemType): string {
    switch (type) {
      case ItemType.FILE:
        return 'file';
      case ItemType.FOLDER:
        return 'folder';
      default:
        return 'unknown';
    }
  }

}
