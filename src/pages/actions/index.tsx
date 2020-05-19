import React from 'react'
import { Heading, Box } from 'rebass'

const Page = () => (
  <>
    <Box mb={2}>
      <Heading as='h1' fontSize={[5, 6]}>
        Actions
      </Heading>
    </Box>

    <Box mb={2}>
      <ul>
        <li>notify</li>
        <li>create_from_template</li>
      </ul>
    </Box>
  </>
)

export default Page
