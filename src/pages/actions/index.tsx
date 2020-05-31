import React from 'react'
import { Heading, Box } from 'rebass'

const Page = () => (
  <>
    <Box mb={3}>
      <Heading as='h1' fontSize={6}>Actions</Heading>
    </Box>

    <Box mb={3}>
      <ul>
        <li>notify</li>
        <li>create_from_template</li>
      </ul>
    </Box>
  </>
)

export default Page
