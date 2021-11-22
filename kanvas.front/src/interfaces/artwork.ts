export interface IArtwork {
  title: string
  url: string
}

export interface INft {
  id: number
  name: string
  ipfsHash: string
  dataUri: string
  price: number
  creator?: string
  startDate?: string
}
