import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storageService: StorageService) {}

  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storageService.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }
    // New methods
  async removeItem() {
    try {
      await this.storageService.remove(this.key);
      this.output = `Removed ${this.key}`;
    } catch (error) {
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
    }
  }

  async clearStorage() {
    try {
      await this.storageService.clear();
      this.output = 'All items cleared';
    } catch (error) {
      console.error('Error clearing storage', error);
      this.output = `Error clearing storage: ${error}`;
    }
  }

  async getKeys() {
    try {
      const keys = await this.storageService.keys();
      this.output = `Keys: ${keys.join(', ')}`;
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = `Error getting keys: ${error}`;
    }
  }

  async getLength() {
    try {
      const length = await this.storageService.length();
      this.output = `Number of items: ${length}`;
    } catch (error) {
      console.error('Error getting length', error);
      this.output = `Error getting length: ${error}`;
    }
  }

  async iterateItems() {
    try {
      this.output = '';
      await this.storageService.forEach((value, key, index) => {
        this.output += `${Number(index) + 1}. ${key}: ${value}\n`;
      });
    } catch (error) {
      console.error('Error iterating items', error);
      this.output = `Error iterating items: ${error}`;
    }
  }
}
