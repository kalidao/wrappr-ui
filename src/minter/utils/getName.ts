export default function getName(juris: string, type: string) {
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
  }

  return jurisdiction + ' ' + type
}
