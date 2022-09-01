import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
const { registerFont, createCanvas } = require('canvas')
const seedrandom = require('seedrandom')

registerFont(path.resolve('./public/fonts/RalewayDots-Regular.ttf'), { family: 'RalewayDots' })

// Dimensions for the image
const width = 500
const height = 500

// Instantiate the canvas object
const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const seed = seedrandom(_req.body.id).quick()
  // Fill the rectangle with purple
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)

  ctx.font = "bold 24pt 'RalewayDots', cursive"
  ctx.textAlign = 'start'
  ctx.fillStyle = getNeonColor(seed)
  ctx.fillText(`${_req.body.name} ~ ${_req.body.jurisdiction}`, 5, 35)

  ctx.strokeStyle = getNeonColor(seed)
  ctx.fillStyle = getNeonColor(seed + 10)

  ctx.beginPath()
  ctx.moveTo(0, 500)

  for (let i = 30; i < 500; i + 50) {
    createBuilding(i)
  }
  // Write the image to file
  const buffer = canvas.toBuffer('image/png')
  res.setHeader('Content-Type', 'image/jpg')
  res.send(buffer)
}

const getNeonColor = (seed: number) => {
  return `hsl(${seed * 360}, ${seed * 19 + 80}%, ${seed * 9 + 50}%, 1)`
}

const createBuilding = (start: number) => {
  const height = getRandomInt(200, 400)
  const width = getRandomInt(20, 40)
  createLine(start, height)
  createLine(width, height)
  createLine(width, 500)
}

const createLine = (x: number, y: number) => {
  ctx.lineTo(x, y)
  ctx.lineWidth = 1
  ctx.stroke()
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
