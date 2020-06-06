import React from 'react'
import { AddTemplateForm } from '@/components/forms/AddTemplate'

const Page = () => (
  <AddTemplateForm onSubmitted={() => console.log('handleRefresh')} />
)

export default Page
