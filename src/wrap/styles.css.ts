import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const wrapprCard = style({
  ':hover': {
    transform: 'scale(1.09)',
  },
})

export const trait = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: vars.space[6],
  borderBottom: `1px solid ${vars.colors.foregroundSecondary}`,
})
