import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemList } from './item-list/item-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
