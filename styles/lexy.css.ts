import { responsiveStyle, vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({})

export const chat = style([
  style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: vars.space[3],
  }),
  responsiveStyle({
    xs: {
      width: vars.space.full,
    },
    md: {
      width: '80vw',
    },
    lg: {
      width: '50vw',
    },
  }),
])

export const message = style([
  style({
    display: 'flex',
    flexDirection: 'row',
    gap: vars.space[2],
    padding: vars.space[3],
  }),
  responsiveStyle({
    xs: {
      width: vars.space.full,
    },
    md: {
      width: '80vw',
    },
    lg: {
      width: '50vw',
    },
  }),
])

export const text = style({
  display: 'flex',
  alignItems: 'center',
  color: vars.colors.text,
  padding: vars.space[2],
})
