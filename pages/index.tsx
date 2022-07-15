import { Grid } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Coffee from '../types/Coffee'

const Home: NextPage = ({ coffees }) => {
  return (
    <>
      <Head>
        <title>Next.js API GET Example</title>
      </Head>
      <Grid container spacing={9} justifyContent="center">
        {coffees.map((coffee: Coffee) => (
          <Grid item>
            <Link href={coffee.title}>
              <a>
                <Image src={coffee.image} width={300} height={225} />
                <p>{coffee.title}</p>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export async function getServerSideProps(context) {
  const host = context.req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https'
  const coffees = await axios.get<Coffee[]>(`${protocol}://${host}/api/coffees`)
    .then(res => res.data)
  return { props: { coffees } }
}

export default Home
