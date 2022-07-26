import { Flex, Text, Button, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query'

const fetchWrapprData = async (URI) => {
    const res = await fetch(URI);
    return res.json()
}

export default function WrapprCard({ wrappr }) {
    const router = useRouter()
    const { isLoading, error, data } = useQuery(['wrappr', wrappr["baseURI"]], () => fetchWrapprData(wrappr["baseURI"]))
    console.log('wrappr card', wrappr, data, error)

    return <Flex direction="column" background="gray.100" padding={3} borderRadius="lg">
        {isLoading ? <Spinner /> : <Image src={data["image"]} height="300px" width="300px" />}
        <Text fontWeight="700">{wrappr["name"]}</Text>
        <Text fontweight="500">{isLoading ? "Loading..." : data["description"]}</Text>
        <Button variant="outline" onClick={() => router.push(`/wrappr/4/${wrappr["id"]}`)}>Expand</Button>
    </Flex>
  }
  