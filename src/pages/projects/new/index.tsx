import React, { useCallback } from 'react'
import { mutate } from 'swr'
import { AddProjectForm } from '@/components/forms/AddProject'

const Page = () => {
  const handleSubmit = useCallback(() => {
    console.log('handleRefresh')

    mutate('projects')
  }, [])

  return (
    <AddProjectForm onSubmitted={handleSubmit} />
  )
}

export default Page
