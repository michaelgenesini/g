import React from 'react'
import { Heading, Box } from 'rebass'

const Page = () => (
  <>
    <Box mb={3}>
      <Heading as='h1' fontSize={6}>Events</Heading>
    </Box>

    <Box mb={3}>
      <Heading>System</Heading>

      <ul>
        <li>todo_created</li>
        <li>todo_completed</li>
        <li>note_created</li>
      </ul>
    </Box>

    <Box mb={2}>
      <Heading>Custom</Heading>

      <ul>
        <li>TBD</li>
      </ul>
    </Box>
  </>
)

export default Page
