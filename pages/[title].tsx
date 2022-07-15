import axios from "axios";
import { Head } from "next/document"
import Coffee from "../types/Coffee";

export default function Detail({ coffee }) {
  return (
    <>
      <h1>{coffee.title}</h1>
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
