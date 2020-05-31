import React, { ReactNode } from 'react'
import { ThemeProvider } from 'theme-ui'
import { Box, Card, Flex, Heading, Text } from 'rebass'
import { Link } from '@/components/Link'
import { Progress } from '@/components/Progress'
import { Sidebar } from '@/components/Sidebar'
import { theme } from './theme'
import { BreadCrumb } from '@/components/Breadcrumb'

type TProps = {
  children: ReactNode
}

export const Layout = ({ children }: TProps) => (
  <ThemeProvider theme={theme}>
    <style jsx global>{`
      body, html {
        height: 100%;
        display: block;
      }
      #__next {
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }
    `}</style>
    <Progress color={theme.colors.primary} />

    <Card>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Link href="/" nav>
            <Heading as="p">
              G
            </Heading>
          </Link>
        </Box>

        <Flex>
          <Box ml={3}>
            <Link href="/notes" nav>
              Notes
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/events" nav>
              Events
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/templates" nav>
              Templates
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/actions" nav>
              Actions
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/workflows" nav>
              Workflows
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Card>

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
