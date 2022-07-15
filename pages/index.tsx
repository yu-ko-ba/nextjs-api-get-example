import { Grid } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Coffee from '../types/Coffee'

const Home: NextPage = ({ coffees }) => {
  return (
    <>
      <Head>
        <title>Next.js API GET Example</title>
      </Head>
      <Grid container spacing={9} sx={{ display: "flex", justifyContent: "center" }}>
        {coffees.map((coffee: Coffee) => (
          <Grid item>
            <Image src={coffee.image} width={300} height={225} />
            <p>{coffee.title}</p>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export async function getServerSideProps() {
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
  return { props: { coffees } }
}

export default Home
