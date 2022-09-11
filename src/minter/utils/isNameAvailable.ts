export default async function isNameAvailable(name: string) {
  try {
    const res = await fetch(
      `https://api.opencorporates.com/v0.4.8/companies/search?q=` +
        encodeURIComponent(name) +
        `&jurisdiction_code=us_de`,
      {
        method: 'GET',
      },
    ).then((res) => res.json())

    console.log('response', res)
    if (res.results.companies > 0) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.error(e)
    return false
  }
}
