import React from 'react'
import { AddNoteForm } from '@/components/forms/AddNote'

const Page = () => (
  <AddNoteForm onSubmitted={() => console.log('handleRefresh')} />
)

export default Page
