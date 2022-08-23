import { useQuery } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'

const endpoint = 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr'

type WrapprProps = {
  address: string
}

export function useWrappr({ address }: WrapprProps) {
  return useQuery(['collections', address], async (address) => {
    const { collections: data } = await request(
      endpoint,
      gql`
        query {
          D
        }
      `,
    )
    return data
  })
}
