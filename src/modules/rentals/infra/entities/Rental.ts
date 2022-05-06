/* eslint-disable indent */
// import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

// @Entity('Rentals')
class Rental {
  // @PrimaryColumn()
  id: string;

  // @Column()
  car_id: string;

  // @Column()
  user_id: string;

  // @Column()
  start_date: Date;

  end_date: Date;

  expected_return_date: Date;

  total: number;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
