import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Layout from '~/layout'
import { useRouter } from 'next/router'
import { getAddress, zeroAddress } from 'viem'
import { useTokenUri } from '~/hooks/useTokenUri'
import { EinForm } from '~/ein/ein-form'

const EIN: NextPage = () => {
  const router = useRouter()
  const wrappr = router.query.wrappr ? getAddress(router.query.wrappr as string) : zeroAddress
  const tokenId = router.query.tokenId ? BigInt(router.query.tokenId as string) : BigInt(0)
  const chainId = router.query.chainId ? Number(router.query.chainId) : 1

  const [orgType, setOrgType] = useState('')
  const [orgName, setOrgName] = useState('')

  const { data: tokenUri } = useTokenUri({
    address: wrappr,
    chainId: chainId,
    tokenId: BigInt(tokenId),
  })

  const fetchTokenMetadata = async (URI: string) => {
    const res = await fetch(URI)
    return res.json()
  }

  useEffect(() => {
    const getData = async () => {
      const org = await fetchTokenMetadata(tokenUri ? tokenUri.toString() : '')
      setOrgType(org.attributes[1].value)
      setOrgName(org.name)
    }

    getData()
  }, [tokenUri])

  return (
    <Layout
      heading="EIN Form"
      content="Fill out and apply for EIN"
      back={() => router.push(`/${chainId}/${wrappr}/${tokenId}`)}
    >
      <div className="flex items-center">
        <div className="flex flex-start w-1/2 border-b-4 pb-6">
          <div>
            <p className="text-4xl text-foreground">🍬 Apply for EIN</p>
            <p>
              An EIN is a unique nine-digit number that identifies your business in the United States for tax purposes.
            </p>
          </div>
          <div className="pt-5 pl-10">
            <div>
              <p>To apply for an EIN:</p>
              <p>1. Fill out Form SS-4 by providing the following information.</p>
              <p>2. Click &apos;Generate SS-4&apos; and carefully review completed Form SS-4.</p>
              <p>3. Review, sign, and date at the bottom of Form SS-4.</p>
              <p>
                4. For US entities, fax Form SS-4 to IRS at (855)641-6935. For Int&apos;l entities, fax Form SS-4 to
                (304)707-9471.{' '}
              </p>
              <p>5. We expect a response with an EIN from the IRS in seven (7) business days.</p>
            </div>
          </div>
        </div>
        <EinForm orgType={orgType} orgName={orgName} />
      </div>
    </Layout>
  )
}

export default EIN
