export interface IBooking {
  id?: number;
  flight_id: number;
  passenger_id: number;
  flight_class: string;
  number_of_seats: number;
  seat_number: number;
  date_time?: Date;
  is_Cancelled?: boolean;
}
