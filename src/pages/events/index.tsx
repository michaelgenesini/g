import React from 'react'
import { Heading, Box } from 'rebass'

const Page = () => (
  <>
    <Box mb={2}>
      <Heading as='h1' fontSize={[5, 6]}>
        Events
      </Heading>
    </Box>

    <Box mb={2}>
      <Heading fontSize={[4, 5]}>
        System
      </Heading>

      <ul>
        <li>todo_created</li>
        <li>todo_completed</li>
        <li>note_created</li>
      </ul>
    </Box>
  </>
)

export default Page
