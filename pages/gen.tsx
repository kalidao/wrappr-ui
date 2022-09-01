import React, { useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { Skeleton, Flex } from '@chakra-ui/react'
import Layout from '~/layout'
import { generateArt } from '~/utils'

const Home: NextPage = () => {
  const [name, setName] = useState('Ross LLC')
  const [jurisdiction, setJurisdiction] = useState('Delaware')
  const [id, setID] = useState(1)
  const [image, setImage] = useState('')

  const gen = async () => {
    if (!id || !name || !jurisdiction) return
    try {
      const res = await generateArt(name, jurisdiction, id)
      if (res) {
        setImage(res as string)
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Layout heading="Home" content="Wrap anything" back={false}>
      <Flex
        direction="column"
        justify={'center'}
        ml={['2.5%', '5%', '15%', '25%']}
        mr={['2.5%', '5%', '15%', '25%']}
        mt={['10%', '1.3%', '2.5%', '5%']}
        mb={['10%', '1.3%', '2.5%', '5%']}
        gap={5}
      >
        <Skeleton isLoaded={image !== ''} height="500px" width="500px">
          {image !== '' && <Image src={image} height="500px" width="500px" />}
        </Skeleton>
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="p-2 text-white rounded-lg w-[500px]"
        />
        <input
          value={jurisdiction}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJurisdiction(e.target.value)}
          className="p-2 text-white rounded-lg w-[500px]"
        />
        <input
          type="number"
          value={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setID(Number(e.target.value))}
          className="p-2 text-white rounded-lg w-[500px]"
        />
        <button
          onClick={gen}
          className=" w-[500px] bg-brand-50 hover:bg-brand-100 text-black text-2xl font-extrabold  rounded-lg py-2"
        >
          Generate!
        </button>
      </Flex>
    </Layout>
  )
}

export default Home
