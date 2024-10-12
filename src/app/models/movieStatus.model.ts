export interface MovieStatus {
    projekcije: Date;
    datum: string;
    status: 'reserved' | 'watched' | 'cancelled';
    ocena?: number;
  }