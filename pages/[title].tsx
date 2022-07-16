import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Coffee from "../types/Coffee";

type DetailPropsType = {
  coffee: Coffee
}

export default function Detail({ coffee }: DetailPropsType) {
  return (
    <>
      <Head>
        <title>{coffee.title}</title>
      </Head>
      <Container maxWidth="sm">
        <Typography variant="h3">{coffee.title}</Typography>
        <Box textAlign="center">
          <Image src={coffee.image} width={400} height={300}/>
        </Box>
        <Typography>{coffee.description}</Typography>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https'
  const coffee = await (async () => {
    if (context.params?.title) {
      return await axios.get<Coffee>(
        `${protocol}://${host}/api/coffees`,
        { params: { q: context.params.title } }
      ).then((res) => res.data)
    }
    return await axios.get<Coffee>(`${protocol}://${host}/api/coffees`)
  })()
  return {props: { coffee }}
}
