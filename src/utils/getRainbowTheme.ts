import merge from 'lodash.merge'
import { darkTheme, Theme } from '@rainbow-me/rainbowkit'

export const getRainbowTheme = (mode: string) => {
  const accentColor = mode === 'dark' ? 'black' : 'white'
  const accentColorForeground = mode === 'dark' ? 'white' : 'black'
  const connectText = mode === 'dark' ? 'white' : 'black'
  const shadowColor = mode === 'dark' ? 'hsl(180, 98%, 20%)' : 'hsl(180, 98%, 42%)'

  return merge(darkTheme(), {
    blurs: {
      modalOverlay: 'blur(30px)',
    },
    colors: {
      accentColor: accentColor,
      accentColorForeground: accentColorForeground,
      connectButtonBackground: accentColor,
      connectButtonText: connectText,
      connectButtonInnerBackground: 'none',
      modalBackground: 'none',
      selectedOptionBorder: '1px solid #fff',
    },
    fonts: {
      body: `"InterVar", sans-serif`,
    },
    shadows: {
      connectButton: `${shadowColor} 0px 1px 1px, ${shadowColor} 0px 0px 1px 1px`,
    },
    radii: {
      actionButton: '2xLarge',
      connectButton: '2xLarge',
      menuButton: '2xLarge',
      modal: '2xLarge',
      modalMobile: '2xLarge',
    },
  } as Theme)
}
