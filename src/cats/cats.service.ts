import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = Array.from({ length: 10 }, (_, i) => ({
    id: this.generateId(),
    name: `Cat ${i + 1}`,
    age: Math.floor(Math.random() * 10),
    breed: `Breed ${i + 1}`,
  }));

  generateId(): number {
    return Math.floor(Math.random() * 100000000);
  }

  create(cat: Cat) {
    this.cats.push({ id: this.generateId(), ...cat });
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat[] {
    return this.cats.find((cat) => cat.id === id);
  }

  update(id: number, cat: Cat) {
    const raw = this.cats.find((cat) => cat.id === id);
    const index = this.cats.findIndex((cat) => cat.id === id);
    this.cats[index] = { ...raw, ...cat };
  }

  delete(id: number) {
    const index = this.cats.findIndex((cat) => cat.id === id);
    this.cats.splice(index, 1);
  }
}
