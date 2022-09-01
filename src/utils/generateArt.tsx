function validateResponse(response: any) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const generateArt = async (name: string, jurisdiction: string, id: number) => {
  const obj = {
    name: name,
    jurisdiction: jurisdiction,
    id: id,
  }
  try {
    const res = await fetch('api/gen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj, null, 2),
    })
      .then(validateResponse)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
    console.log('res', res)
    return res
  } catch (e) {
    console.log('e', e)
    return e
  }
}
