import { style, keyframes } from '@vanilla-extract/css'
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

export const bounce = keyframes({
  '0%': {
    transform: 'translateY(0)',
  },
  '50%': {
    transform: 'translateY(-10px)',
  },
  '100%': {
    transform: 'translateY(0)',
  },
})

export const chat = style({
  position: 'fixed',
  bottom: vars.space['6'],
  right: vars.space['6'],
  padding: vars.space['3'],
  borderRadius: vars.space['full'],
  zIndex: 10,
  backgroundColor: vars.colors.accent,

  ':hover': {
    animation: `${bounce} 1s infinite`,
  },
  ':focus': {
    animation: `${bounce} 1s infinite`,
    border: `1px solid ${vars.colors.foregroundSecondary}`,
  },
})
