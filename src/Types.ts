export interface TypeRecipe {
  ageNotes: string
  flavourNotes: string
  myNotes: string
  flavours: TypeFlavour[]
  pg: string
  vg: number
  totalFlavouring: number
  description: string
  author: string
  recipeName: string
}

export interface TypeFlavour {
  name: string
  percent: number
  grams: number
}
