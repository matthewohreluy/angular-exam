import { Component, OnInit, signal } from '@angular/core';
import { ItemData, ItemType } from './item/item-data';
import { Item } from './item/item';
import { NgTemplateOutlet } from '@angular/common';
import { Input } from './input/input';

@Component({
  selector: 'item-list',
  imports: [Item, NgTemplateOutlet, Input],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList {
  items = signal<(ItemData & {isAddingItem?: boolean})[]>([]);
  isAddingFolder = signal<boolean>(false);

  get ItemType(): typeof ItemType {
    return ItemType;
  }



  addFolder(){
    this.isAddingFolder.set(true);
  }

  onAddingItemClosed({isAddingItem, id}: {isAddingItem: boolean, id: string}){
    if(!id){
       this.isAddingFolder.set(isAddingItem);
    }else{
      this.items.update(items => this.setAddItemClosed(items,id, false));
    }
  }

  onAddingItemAdded({type, name, id}: {type: ItemType, name: string, id: string} ){
    const newItem: ItemData = {
      id: `${Date.now()}`,
      name: name,
      type: type,
      children: type === ItemType.FOLDER ? [] : null
    };
    if(!id){
      this.items.update(items => [...items, newItem]);
    }else{
      this.items.update(items => this.addItem(items, newItem, id));
    }
  }

  onItemDeleted(id: string){
    this.items.update(items => this.deleteItem(items, id));
  }

  onItemAdded(id: string){
   this.items.update(items => this.setAddItemClosed(items,id, true));
  }

  private addItem(items: ItemData[], newItem: ItemData, id: string): ItemData[] {
    return items.map(item=>{
      if(item.type === ItemType.FOLDER && item.children){
        if(item.id == id) item.children = [...item.children, newItem];
        this.addItem(item.children, newItem,id);
      }
      return item
    })
  }

  private deleteItem(items: ItemData[], id: string): ItemData[] {
    return items.filter(item => item.id !== id).map(item => {
      if(item.type === ItemType.FOLDER && item.children && item.children.length > 0){
        return {
          ...item, children: this.deleteItem(item.children, id)
        }
      }
      return item;
    })
  }

  private setAddItemClosed(items: (ItemData & {isAddingItem?: boolean})[], id: string, value: boolean): ItemData[] {
    return items.map(item => {
      if(item.type === ItemType.FOLDER){
        const folder = item;
        if(item.id === id){
          folder.isAddingItem = value;
        }
        if(item.children && item.children.length > 0){
          folder.children = this.setAddItemClosed(folder.children as (ItemData & {isAddingItem?: boolean})[], id, value);
        }
        return folder;
      }
      return item;
    })
  }
}
