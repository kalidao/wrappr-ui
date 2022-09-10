interface Templates {
  [key: string]: string[]
}

export const templates: Templates = {
  deLLC: ['name', 'ricardianId'],
  wyLLC: ['name', 'ricardianId'],
  deUNA: ['name', 'ricardianId', 'mission'],
  wyUNA: ['name', 'ricardianId', 'mission'],
  lexCharter: ['name', 'ricardianId', 'mission', 'jurisdiction'],
}
