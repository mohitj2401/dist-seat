import { SeatRow } from './seatRow';

export class Coach {
  id!: number;
  name!: string;
  coach_class!: number;
  coach_number!: number;
  total_available_seat!: number;
  seat_rows!: SeatRow[];
}
