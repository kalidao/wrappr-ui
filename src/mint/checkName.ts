export async function checkName(name: string) {
  const check = await fetch(
    `https://api.opencorporates.com/v0.4.8/companies/search?q=` + encodeURIComponent(name) + `&jurisdiction_code=us_de`,
    {
      method: 'GET',
    },
  ).then((res) => res.json())

  console.log('check', check)
  if (check.results.companies > 0) {
    return true
  } else {
    return false
  }
}
