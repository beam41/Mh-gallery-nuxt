export class Image {
  imgn: string
  name: string
  make: string
  model: string
  lens: string
  exposure: string
  fstop: string
  iso: number
  focal: number
  prices: { type: string; price: number }[]
  willBuy: number
  priceValid: boolean
}
