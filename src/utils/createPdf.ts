import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib'

type Props = {
  entityType: string
  entityName: string
  userName: string
  userSsn: string
  formationDate: string
  taxEntity: string
}

export async function createPdf({ entityType, entityName, userName, userSsn, formationDate, taxEntity }: Props) {
  const url = 'https://content.wrappr.wtf/ipfs/QmUBLCBJqtzyvBSpK4USqLapSNhuK2R9EXEB3aGivSFBSd'

  const memberCount = '1'
  const selection = 'X'

  try {
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // -------------------------
    // User Inputs
    // -------------------------

    // Line 1
    firstPage.drawText(entityName, {
      x: 75,
      y: 688,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 4a
    firstPage.drawText('8 The Green, Suite 4604', {
      x: 75,
      y: 640,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 4b
    firstPage.drawText('Dover, Delaware 19901', {
      x: 75,
      y: 615,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 6
    firstPage.drawText('Dover, Delaware', {
      x: 75,
      y: 591,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 7a
    firstPage.drawText(userName, {
      x: 75,
      y: 568,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 7b
    firstPage.drawText(userSsn, {
      x: 350,
      y: 568,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    if (entityType == 'LLC') {
      // Line 8a
      firstPage.drawText(selection, {
        x: 255,
        y: 543,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })
    } else if (entityType == 'UNA') {
      // Line 8a
      firstPage.drawText(selection, {
        x: 298,
        y: 543,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })
    }

    if (taxEntity == 'sole') {
      // Line 8b
      firstPage.drawText(memberCount, {
        x: 500,
        y: 543,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })
    } else if (taxEntity == 'partnership') {
      // Line 8b
      firstPage.drawText('2', {
        x: 500,
        y: 543,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })
    }

    // Line 8c
    firstPage.drawText(selection, {
      x: 493,
      y: 531,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    if (entityType == 'LLC') {
      if (taxEntity == 'sole') {
        // Line 9a - selection
        firstPage.drawText(selection, {
          x: 61,
          y: 507,
          size: 12,
          font: timesRomanFont,
          color: rgb(0.95, 0.1, 0.1),
        })

        // Line 9a - ssn
        firstPage.drawText(userSsn, {
          x: 165,
          y: 507,
          size: 12,
          font: timesRomanFont,
          color: rgb(0.95, 0.1, 0.1),
        })
      } else if (taxEntity == 'partnership') {
        // Line 9a - selection
        firstPage.drawText(selection, {
          x: 61,
          y: 495,
          size: 12,
          font: timesRomanFont,
          color: rgb(0.95, 0.1, 0.1),
        })
      } else if (taxEntity == 'c-corp') {
        // Line 9a - selection
        firstPage.drawText(selection, {
          x: 61,
          y: 483,
          size: 12,
          font: timesRomanFont,
          color: rgb(0.95, 0.1, 0.1),
        })
      } else if (taxEntity == 's-corp') {
        // Line 9a - selection
        firstPage.drawText(selection, {
          x: 61,
          y: 483,
          size: 12,
          font: timesRomanFont,
          color: rgb(0.95, 0.1, 0.1),
        })

        // Line 9a - form #
        firstPage.drawText('1120S', {
          x: 250,
          y: 483,
          size: 12,
          font: timesRomanFont,
          color: rgb(0.95, 0.1, 0.1),
        })
      }
    } else if (entityType == 'UNA') {
      // Line 9a - selection
      firstPage.drawText(selection, {
        x: 61,
        y: 435,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })

      // Line 9a - entity type
      firstPage.drawText('Disregarded Entity', {
        x: 165,
        y: 435,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })
    }

    // Line 10 - selection
    firstPage.drawText(selection, {
      x: 61,
      y: 387,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 10 - entity
    firstPage.drawText(entityType, {
      x: 220,
      y: 387,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 11
    firstPage.drawText(formationDate, {
      x: 165,
      y: 315,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 12
    firstPage.drawText('December', {
      x: 490,
      y: 327,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Line 16 - selection
    firstPage.drawText(selection, {
      x: 320,
      y: 194,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    if (entityType == 'LLC') {
      // Line 16 - activity
      firstPage.drawText('Technology', {
        x: 420,
        y: 195,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })

      // Line 17
      firstPage.drawText('Software / e-commerce / Internet business', {
        x: 85,
        y: 171,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })
    } else if (entityType == 'UNA') {
      // Line 16 - activity
      firstPage.drawText('Nonprofit', {
        x: 420,
        y: 195,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })

      // Line 17
      firstPage.drawText('Software / e-commerce / Internet business', {
        x: 85,
        y: 171,
        size: 12,
        font: timesRomanFont,
        color: rgb(0.95, 0.1, 0.1),
      })
    }

    // Line 18
    firstPage.drawText(selection, {
      x: 398,
      y: 158,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Designee's Name
    firstPage.drawText('Robert R. Campbell', {
      x: 100,
      y: 110,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Designee's Phone
    firstPage.drawText('(813) 690-2219', {
      x: 470,
      y: 110,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Designee's Address
    firstPage.drawText('215 Moore St., Brooklyn, NY 11206', {
      x: 100,
      y: 87,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Designee's Fax
    firstPage.drawText('(867) 670-5223', {
      x: 470,
      y: 87,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    // Sig block
    firstPage.drawText(`${userName}, Incorporator`, {
      x: 170,
      y: 63,
      size: 12,
      font: timesRomanFont,
      color: rgb(0.95, 0.1, 0.1),
    })

    const pdfBytes = await pdfDoc.save()

    var blob = new Blob([pdfBytes], { type: 'application/pdf' })
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `Form SS-4 - ${entityName} .pdf`
    link.click()
  } catch (e) {
    console.log(e)
  }
}
