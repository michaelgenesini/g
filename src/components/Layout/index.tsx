import React, { ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'
import { Box, Flex } from 'rebass'
import { Header } from '@/components/Header'
import { Progress } from '@/components/Progress'
import { Sidebar } from '@/components/Sidebar'
// import { BreadCrumb } from '@/components/Breadcrumb'
import { theme } from './theme'

type TProps = {
  children: ReactNode
}

export const Layout = ({ children }: TProps) => (
  <ThemeProvider theme={theme}>
    <Progress />

    <Header />

    <Flex flex={1}>
      <Box bg='gray' p={3} width="300px">
        <Sidebar />
      </Box>

      <Flex flex={1} flexDirection="column">
        {/* <BreadCrumb /> */}

        <Flex flexDirection="column" flex={1} p={3}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  </ThemeProvider>
)
