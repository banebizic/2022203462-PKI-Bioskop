export interface MovieStatus {
    projekcije: Date
    datum: string
    cena: number
    status: 'reserved' | 'watched' | 'cancelled'
    ocena?: number
  }