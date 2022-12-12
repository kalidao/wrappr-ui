import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[4],
  padding: vars.space[6],
  border: `1px solid ${vars.colors.foregroundSecondary}`,
  borderRadius: vars.radii['2xLarge'],
  minWidth: vars.space[96],
})

export const icon = style({
  color: vars.colors.foreground,
  width: vars.space[8],
  height: vars.space[8],
})
