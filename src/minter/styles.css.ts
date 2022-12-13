import { vars, responsiveStyle } from '@kalidao/reality'
import { tokens } from '@kalidao/reality/dist/types/tokens'
import { style } from '@vanilla-extract/css'

export const container = style({
  minHeight: '90vh',
  borderBottom: `1px solid ${vars.colors.foregroundSecondary}`,
})

export const card = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space[4],
  padding: vars.space[4],
  border: `1px solid ${vars.colors.foregroundSecondary}`,
  borderRadius: vars.radii['2xLarge'],
  minWidth: vars.space[96],
  minHeight: vars.space[12],

  ':hover': {
    scale: 1.01,
  },
})

export const icon = style({
  color: vars.colors.foreground,
  width: vars.space[8],
  height: vars.space[8],
})

export const pill = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[2],
  borderRadius: vars.radii['4xLarge'],
  width: vars.space[72],
  border: `1px solid ${vars.colors.foregroundSecondary}`,
  color: vars.colors.foreground,
  padding: vars.space[2],
  fontSize: vars.fontSizes.extraSmall,
  fontWeight: vars.fontWeights.medium,

  ':hover': {
    scale: 1.01,
    border: `1px solid ${vars.colors.foreground}`,
  },
})

export const splashContainer = style([
  style({
    minHeight: '90vh',
    minWidth: '70vw',
    padding: vars.space[6],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  style([
    responsiveStyle({
      xs: {
        width: vars.space.full,
        height: vars.space.full,
      },
    }),
  ]),
])

export const action = style([
  style({
    minHeight: '90vh',
    minWidth: '30vw',
    borderLeft: `1px solid ${vars.colors.foregroundSecondary}`,
    padding: vars.space[6],
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[10],
    alignItems: 'flex-start',
    justifyContent: 'center',
  }),
  style([
    responsiveStyle({
      xs: {
        width: vars.space.full,
        height: vars.space.full,
      },
    }),
  ]),
])

export const actionCards = style({
  height: '50vh',
  width: vars.space.full,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[4],
})

export const back = style({
  color: vars.colors.text,
  width: vars.space[12],
  height: vars.space[12],
  borderRadius: vars.radii.full,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  ':disabled': {
    color: vars.colors.background,
  },

  selectors: {
    '&:hover:disabled': {
      backgroundColor: vars.colors.background,
      color: vars.colors.background,
    },

    '&:hover:not(:disabled)': {
      color: vars.colors.foreground,
      scale: 1.01,
      backgroundColor: vars.colors.backgroundTertiary,
    },
  },
})

export const form = style({
  minWidth: vars.space[96],
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[4],
})
