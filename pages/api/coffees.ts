import axios from "axios"
import Coffee from '../../types/Coffee'

export default async function handler(req, res) {
  const hotCoffees = await axios.get<Coffee[]>("https://api.sampleapis.com/coffee/hot")
    .then((res) => {
      return res.data
    })
  const icedCoffees = await axios.get<Coffee[]>("https://api.sampleapis.com/coffee/iced")
    .then((res) => {
      return res.data
    })
  const coffees = hotCoffees.concat(icedCoffees)
    .sort((a, b) => {
      if (a.title > b.title) {
        return 1
      } else if (a.title < b.title) {
        return -1
      } else {
        return 0
      }
    })

  res.status(200).json(coffees)
}
