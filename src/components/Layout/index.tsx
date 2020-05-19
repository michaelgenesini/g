import React, { ReactNode } from 'react'
import Link from 'next/link'
import { ThemeProvider } from 'theme-ui'
import { Box, Card, Flex, Heading, Text } from 'rebass'
import { Progress } from '@/components/Progress'
import { theme } from './theme'

type TProps = {
  children: ReactNode
}

export const Layout = ({ children }: TProps) => (
  <ThemeProvider theme={theme}>
    <Progress color={theme.colors.primary} />

    <Card
      sx={{
        p: 3,
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Link href="/">
            <a>
              <Heading as="p">
                G
              </Heading>
            </a>
          </Link>
        </Box>

        <Flex>
          <Box ml={3}>
            <Link href="/events">
              <a>
                <Text>
                  Events
                </Text>
              </a>
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/actions">
              <a>
                <Text>
                  Actions
                </Text>
              </a>
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/workflows">
              <a>
                <Text>
                  Workflows
                </Text>
              </a>
            </Link>
          </Box>

        </Flex>

      </Flex>
    </Card>

    <Box p={4}>
      {children}
    </Box>
  </ThemeProvider>
)
