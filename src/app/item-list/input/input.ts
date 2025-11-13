import { AfterViewInit, Component, ElementRef, inject, input, OnInit, output, signal, ViewChild } from '@angular/core';
import { ItemType } from '../item/item-data';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item-service';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input implements OnInit {
  @ViewChild('folderInput') folderInput!: ElementRef<HTMLInputElement>;

  itemService = inject(ItemService);

  type = input.required<ItemType | null>();
  id = input.required<string>()
  closed = output<{isAddingItem: boolean, id: string}>();
  itemAdded = output<{type: ItemType, name: string, id: string}>();

  currentType = signal<ItemType | null>(null);
  itemName: string = '';

  get ItemType(): typeof ItemType {
    return ItemType;
  }

  ngOnInit() {
    this.currentType.set(this.type());
  }

  ngAfterViewInit() {
    this.hoverInputFocus();
  }

  add(){
    if(this.itemName.trim().length === 0 && this.currentType() !== null){
      return;
    }
    this.itemAdded.emit({type: this.currentType()!, name: this.itemName.trim(), id: this.id()});
    this.close();
  }

  close(){
    this.closed.emit({isAddingItem: false, id: this.id()});
  }

  hoverInputFocus(){
    setTimeout(() => { if(this.currentType()) this.folderInput.nativeElement.focus();},0);
  }

  setCurrentType(type: ItemType){
    this.currentType.set(type);
    this.hoverInputFocus();
  }
}
