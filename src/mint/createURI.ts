import fleek from '@fleekhq/fleek-storage-js'

type FileUpload = {
  apiKey: string
  apiSecret: string
  key: string
  bucket: string
  data: any
}

export default async function createURI(name: string, tokenId: number, entity: string) {
  let obj
  switch (entity) {
    case 'delSeries':
      obj = { ...delSeries, name: name }
      break
    case 'wyoSeries':
      obj = { ...wyoSeries, name: `Wrappr LLC - ${name} - Series ${tokenId}` }
      break
    case 'delUNA':
      obj = { ...delUNA, name: name }
      break
    case 'wyoUNA':
      obj = { ...wyoUNA, name: name }
      break
  }

  try {
    // idk ts :(
    const input: FileUpload = {
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY ? process.env.NEXT_PUBLIC_FLEEK_API_KEY : '',
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET ? process.env.NEXT_PUBLIC_FLEEK_API_SECRET : '',
      bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
      key: 'wrappr',
      data: JSON.stringify(obj, null, 2),
    }

    const result = await fleek.upload(input)
    return result.hash
  } catch (e) {
    console.log(e)
    return ''
  }
}

const delSeries = {
  name: '{name}  Wrappr LLC (Delaware)', // user
  description: 'Secure your wallet or DAO as an LLC (Series) and make agreements',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmZCCV9ojSQUsvUtsDV6HdxUrijkF79ZWUs315b7WKPT3g',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Delaware' },
    { trait_type: 'Entity', value: 'LLC' },
    { trait_type: 'Agreement', value: 'https://del.llc.wrappr.documen.eth.link/' },
    { trait_type: 'Registered Agent', value: 'A Registered Agent, Inc., 8 The Green, Suite A, Dover, DE 19901, USA' },
    { display_type: 'number', trait_type: 'Registration Number', value: 6531147 },
  ],
}

const wyoSeries = {
  name: 'Wrappr LLC (Wyoming)',
  description: 'Secure your wallet or DAO as an LLC (Series) and make agreements',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmVEmynzYzRjYhBzCK85eNBMPaL3PMLvy7GCDiNb6oH7sY',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Wyoming' },
    { trait_type: 'Entity', value: 'LLC' },
    { trait_type: 'Agreement', value: 'https://wy.llc.wrappr.documen.eth.link/' },
    { trait_type: 'Registered Agent', value: 'Registered Agents Inc., 30 N Gould St Ste R, Sheridan, WY 82801, USA' },
    { display_type: 'number', trait_type: 'Registration Number', value: 2022001140872 },
  ],
}

const delUNA = {
  name: 'Wrappr UNA (Delaware)',
  description: 'Secure your DAO as UNA non-profit and qualify for tax benefits',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmYVGfZd9djKd7ExpTKPzbV5qMNqHT6XPxAdweg4ptowEo',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Delaware' },
    { trait_type: 'Entity', value: 'UNA' },
    { trait_type: 'Agreement', value: 'https://del.una.wrappr.documen.eth.link/' },
  ],
}

const wyoUNA = {
  name: 'Wrappr UNA (Wyoming)',
  description: 'Secure your DAO as UNA non-profit and qualify for tax benefits',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmNndADsqj7s4NC2tRraGxhSffCbdN1eHpPdusBQE4c84k',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Wyoming' },
    { trait_type: 'Entity', value: 'UNA' },
    { trait_type: 'Agreement', value: 'https://wy.una.wrappr.documen.eth.link/' },
  ],
}
