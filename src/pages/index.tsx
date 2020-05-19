import React from 'react'
import Link from 'next/link'
import { Heading, Link as RebassLink, Box } from 'rebass'

const Page = () => (
  <>
    <Box mb={2}>
      <Heading  as='h1'>
        Welcome to `g` - your workflow butler
      </Heading>
    </Box>

    <Link passHref href="/objects">
      <RebassLink>
        Check out objects
      </RebassLink>
    </Link>
  </>
)

export default Page
