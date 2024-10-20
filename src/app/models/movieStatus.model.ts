export interface MovieStatus {
    projekcije: Date
    datum: string
    cena: number
    status: 'rezervisano' | 'gledano' | 'otkazano'
    ocena?: number
  }