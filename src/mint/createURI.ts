import fleek from '@fleekhq/fleek-storage-js'

type FileUpload = {
  apiKey: string
  apiSecret: string
  key: string
  bucket: string
  data: any
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 }).then((data) => {
  console.log(data) // JSON data parsed by `data.json()` call
})

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
    const result = await fetch('api/wrap', {
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
    return `ipfs://${result.IpfsHash}`
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
