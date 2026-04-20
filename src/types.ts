export type Substance =
  | 'Metanfetamina'
  | 'Cocaína'
  | 'Anfetaminas'
  | 'Opioides'
  | 'Nicotina'
  | 'Marihuana'
  | 'Azúcares/Otras';

export type Stage =
  | '1-3 días'
  | '1 semana'
  | '1 mes'
  | '3 meses'
  | '6 meses'
  | '1 año';

export interface UserData {
  substance: Substance | null;
  stage: Stage | null;
  symptoms: string[];
  dailyCost: number;
  cleanDays: number | null;
  quitDate?: number; // Timestamp of when they quit
}
