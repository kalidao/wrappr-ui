export function getAgreement(entity: string): string {
  switch (entity) {
    case 'deLLC':
      return 'https://del.llc.wrappr.documen.eth.link/'
    case 'wyLLC':
      return 'https://wy.llc.wrappr.documen.eth.link/'
    case 'deUNA':
      return 'https://del.una.wrappr.documen.eth.link/'
    case 'wyUNA':
      return 'https://wy.una.wrappr.documen.eth.link/'
    case 'lexCharter':
      return 'https://lexpunk.charter.ricardian.eth.limo/'
    case 'orCharter':
      return ''
  }
  return ''
}
