import React from 'react'
import { AddTodoForm } from '@/components/forms/AddTodo'

const Page = () => (
  <AddTodoForm onSubmitted={() => console.log('handleRefresh')} />
)

export default Page
