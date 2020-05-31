import React from 'react'
import Link from 'next/link'
import {
  Box,
  Heading,
  Link as RebassLink,
} from 'rebass'

const Page = () => (
  <>
    <Box mb={2}>
      <Heading as='h1' fontSize={[5, 6]}>
        404 - Page not found
      </Heading>
    </Box>

    <Link passHref href="/">
      <RebassLink>
        Back to home
      </RebassLink>
    </Link>
  </>
)

export default Page
