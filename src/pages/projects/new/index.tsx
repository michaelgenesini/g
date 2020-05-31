import React from 'react'
import { AddProjectForm } from '@/components/forms/AddProject'

const Page = () => (
  <AddProjectForm onSubmitted={() => console.log('handleRefresh')} />
)

export default Page
