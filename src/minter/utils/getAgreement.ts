export function getAgreement(entity: string): string {
  console.log(entity)
  switch (entity) {
    case 'deLLC':
      return 'https://de.llc.ricardian.eth.limo/'
    case 'wyLLC':
      return 'https://wy.llc.ricardian.eth.limo/'
    case 'deUNA':
      return 'https://de.una.ricardian.eth.limo/'
    case 'wyUNA':
      return 'https://wy.una.ricardian.eth.limo/'
    case 'lexCharter':
      return 'https://lexpunk.charter.ricardian.eth.limo/'
    case 'orCharter':
      return 'https://orange.charter.ricardian.eth.limo/'
  }
  return ''
}
