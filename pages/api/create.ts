import type { NextApiRequest, NextApiResponse } from 'next'

const fs = require('fs')
var html_to_pdf = require('html-pdf-node')

let options = { format: 'A4' }

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // const inputData = _req.body
  // const template = await fs.readFileAsync('./Test.html', 'utf8')

  // const $ = cheerio.load(template)

  // const inputDataKeys = Object.keys(inputData)

  // inputDataKeys.forEach((key) => {
  //   const classIdentifier = 'var_' + key
  //   $(classIdentifier).html(inputData[key])
  // })
  try {
    printPDF().then((pdf) => {
      res.status(200)
      res.send(pdf)
    })
  } catch (e) {
    res.status(500)
  }
}

const printPDF = async () => {
  let file = { content: '<h1>Welcome to html-pdf-node</h1>' }
  html_to_pdf.generatePdf(file, options).then((pdf: any) => {
    console.log('PDF Buffer:-', pdf)
    return pdf
  })
}
