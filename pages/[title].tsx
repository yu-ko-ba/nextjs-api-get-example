import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { Head } from "next/document"
import Image from "next/image";
import Coffee from "../types/Coffee";

export default function Detail({ coffee }) {
  return (
    <>
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

export async function getServerSideProps({ params, req }) {
  const host = req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https'
  const coffee = await axios.get<Coffee>(`${protocol}://${host}/api/coffees?q=${params.title}`)
    .then(res => res.data)
  return {props: { coffee }}
}
