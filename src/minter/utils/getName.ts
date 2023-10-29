import { Jurisdiction } from '../useMinterStore'

const jurisMap: {
  [J in Jurisdiction]: string
} = {
  de: 'Delaware',
  wy: 'Wyoming',
  mi: 'Marshall Islands',
}

export default function getName(juris: Jurisdiction, type: string) {
  if (type === 'UNA') return 'Wyoming UNA'
  return jurisMap[juris] + ' ' + type
}

export const getPdfName = (juris: Jurisdiction, type: string) => {
  if (type === 'UNA') return 'wyUNA'
  return juris + type
}
