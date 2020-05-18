import React, { PropsWithChildren, ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'
import { Box } from 'rebass'
import { theme } from './theme'

type TProps = {
  children: ReactNode
}

export const Layout = ({ children }: TProps) => (
  <ThemeProvider theme={theme}>
    <Box
      sx={{
        p: 4,
      }}
    >
      {children}
    </Box>
  </ThemeProvider>
)
