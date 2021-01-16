export const theme = {
  colors: {
    text: '#2E3235',
    background: '#fff',
    primary: '#07c',
    secondary: '#30c',
    muted: '#FAFAFA',
    gray: '#dddddf',
    highlight: 'hsla(205, 100%, 40%, 0.125)'
  },
  fonts: {
    body: 'GT-America-Standard, system-ui, sans-serif',
    heading: 'GT-America-Extended, system-ui, sans-serif',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48
  },
  radii: {
    "default": 4,
    circle: 99999
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)'
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading'
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7]
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    }
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle'
    },
    card: {
      p: 2,
      bg: 'background',
      boxShadow: 'card'
    },
    link: {
      color: 'primary'
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'primary'
      }
    }
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: 'bold',
      color: 'background',
      bg: 'primary',
      borderRadius: 'default'
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px'
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    }
  }
}

// export const theme =  merge(preset, {
//   initialColorModeName: 'lite',
//   colors: {
//     text: '#454f5b',
//     background: '#fff',
//     primary: '#5c6ac4',
//     secondary: '#006fbb',
//     highlight: '#47c1bf',
//     muted: '#e6e6e6',
//     gray: '#dfe3e8',
//     accent: '#f49342',
//     darken: '#00044c',
//     modes: {
//       dark: {
//         text: '#3e4155',
//         background: '#000639',
//         primary: '#9c6ade',
//         secondary: '#b4e1fa',
//         highlight: '#b7ecec',
//         muted: '#e6e6e6',
//       },
//     },
//   },
//   fontWeights: {
//     body: 400,
//     heading: 800,
//     bold: 700,
//   },
//   sizes: {
//     wide: 1280,
//   },
//   shadows: {
//     small: `0 0 0px 1px rgba(0, 0, 0, 0.25)`,
//   },
//   buttons: {
//     big: {
//       variant: 'buttons.primary',
//       px: 4,
//       py: 3,
//       fontSize: 3,
//     },
//     outline: {
//       variant: 'buttons.primary',
//       color: 'primary',
//       bg: 'transparent',
//       boxShadow: 'inset 0 0 0 2px'
//     },
//     transparent: {
//       color: 'inherit',
//       bg: 'transparent',
//       ':hover,:focus': {
//         color: 'primary',
//         outline: 'none',
//         boxShadow: '0 0 0 2px',
//       }
//     },
//   },
//   links: {
//     nav: {
//       display: 'block',
//       px: 2,
//       py: 1,
//       color: 'inherit',
//       textDecoration: 'none',
//       fontSize: 1,
//       fontWeight: 'bold',
//     },
//   },
//   text: {
//     heading: {
//       a: {
//         color: 'inherit',
//         textDecoration: 'none',
//         ':hover': {
//           textDecoration: 'underline',
//         }
//       }
//     }
//   },
//   variants: {
//     badge: {
//       display: 'inline-block',
//       px: 2,
//       color: 'background',
//       bg: 'primary',
//       borderRadius: 'circle',
//     },
//   },
//   styles: {
//     a: {
//       color: 'primary',
//       transition: 'color .2s ease-out',
//       ':hover,:focus': {
//         color: 'secondary',
//       }
//     },
//     inlineCode: {
//       fontFamily: 'monospace',
//       fontSize: '93.75%',
//       color: 'secondary',
//     },
//     code: {
//       fontFamily: 'monospace',
//       color: 'secondary',
//     },
//     pre: {
//       // ...prism,
//       fontFamily: 'monospace',
//       fontSize: 1,
//       overflowX: 'auto',
//       bg: 'muted',
//       p: 3,
//       borderRadius: 4,
//     },
//     blockquote: {
//       p: 0,
//       mx: 0,
//       fontWeight: 'bold',
//       fontSize: 3,
//     },
//     h1: {
//       variant: 'text.heading',
//       mt: 0,
//       fontSize: [5, 6],
//     },
//     h2: {
//       variant: 'text.heading',
//       fontSize: [4, 5],
//     },
//     h3: {
//       variant: 'text.heading',
//       fontSize: 3,
//     },
//     h4: { variant: 'text.heading', },
//     h5: { variant: 'text.heading', },
//     h6: { variant: 'text.heading', },
//     table: {
//       width: '100%',
//       borderCollapse: 'separate',
//       borderSpacing: 0,
//     },
//     th: {
//       py: 2,
//       textAlign: 'left',
//       // borderBottom: t => `4px solid ${t.colors.muted}`,
//     },
//     td: {
//       py: 2,
//       textAlign: 'left',
//       // borderBottom: t => `1px solid ${t.colors.muted}`,
//     },
//   },
//   forms: {
//     label: {
//       fontSize: 1,
//       fontWeight: 'bold',
//     },
//     field: {
//       borderColor: 'lightgray',
//       ':focus': {
//         borderColor: 'primary',
//         outline: 'none',
//         // boxShadow: (t: any) => `0 0 0 2px ${t.colors.primary}`,
//       }
//     },
//     input: {
//       variant: 'forms.field',
//     },
//     select: {
//       variant: 'forms.field',
//     },
//     textarea: {
//       variant: 'forms.field',
//     },
//     radio: {
//     },
//     slider: {
//       bg: 'lightgray',
//     },
//     switch: {
//       thumb: {}
//     }
//   }
// })
