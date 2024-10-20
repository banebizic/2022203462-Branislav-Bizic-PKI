import { MovieStatus } from "./movieStatus.model"
import { MovieReview } from "./movieReview.model"
export interface MovieModel {
  id: number
  naziv: string
  opis: string
  zanr: string
  trajanje: number
  reziser: string
  glumci: string[]
  datumIzlaska: number
  projekcije: MovieStatus[]
  recenzije: MovieReview[]
  photo: string
}
