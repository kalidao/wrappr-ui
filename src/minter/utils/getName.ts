export default function getName(juris: string, entity: string) {
  let jurisdiction

  switch (juris) {
    case 'de':
      jurisdiction = 'Delaware'
      break
    case 'wy':
      jurisdiction = 'Wyoming'
      break
    case 'or':
      jurisdiction = 'Orange'
      break
    case 'lex':
      jurisdiction = 'LexPunk'
      break
    case 'tosDao':
      jurisdiction = 'DAO Terms of Service'
      entity = ''
      break
  }

  return jurisdiction + ' ' + entity
}
