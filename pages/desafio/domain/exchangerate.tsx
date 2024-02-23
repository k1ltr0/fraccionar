/**
 * Interface to represent the exchange rate
 * @param id Unique identifier from the API
 * @param date Date of the exchange rate
 * @param value Value of the exchange rate
 */
export interface ExchangeRate {
  id: string;
  date: Date;
  value: number;
};
