import { convertIpfsHash } from '../utils/convertIpfsHash'

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
    const result = await fetch('api/json', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(obj),
    }).then((res) => res.json())
    const url = convertIpfsHash(result.IpfsHash)
    return url
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
