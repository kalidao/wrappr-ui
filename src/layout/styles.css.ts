import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const layout = style({
  minHeight: '100vh',
})

export const container = style({
  minHeight: '90vh',
  position: 'relative',
})

export const header = style({
  maxHeight: '15vh',
  paddingRight: vars.space['5'],
  paddingLeft: vars.space['5'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 10,
  gap: vars.space['2'],
  position: 'relative',
  borderBottom: `1px solid ${vars.colors.foregroundSecondary}`,
})

export const footer = style({
  maxHeight: '10vh',
  padding: vars.space['6'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})
