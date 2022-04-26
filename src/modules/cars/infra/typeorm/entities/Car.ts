// /* eslint-disable indent */
// import {
//   Column, CreateDateColumn, Entity, PrimaryColumn,
// } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

class Car {
  id?: string;

  name: string;

  description: string;

  daily_rate: number;

  license_plate: string;

  fine_amount: number;

  brand: string;

  category_id: string;

  created_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      // this.created_at = new Date();
    }
  }
}

export { Car };
