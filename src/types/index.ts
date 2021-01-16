import { BaseEmoji } from 'emoji-mart'

export type TStatus = 'NEW' | 'PROGRESS' | 'DONE'

export type TProject = {
  _id: string
  createdAt: string
  emoji: BaseEmoji
  name: string
  view: 'LIST' | 'KAMBAN'
  todos_expanded: boolean
}

export type TProjectAggregate = Pick<TProject, '_id' | 'createdAt' | 'name' | 'emoji' | 'view' | 'todos_expanded'> & {
  notes: TNote[]
  templates: TTemplate[]
  todos: TTodoAggregate[]
}

export type TNote = {
  _id: string
  content: string
  createdAt: string
  name: string
  project_id: string
  status: TStatus
}

export type TTemplate = {
  _id: string
  content: string
  createdAt: string
  name: string
  project_id: string
}

export type TTodo = {
  _id: string
  createdAt: string
  name: string
  project_id: string
  tasks: string[]
}

export type TTodoAggregate = {
  _id: string
  createdAt: string
  name: string
  project_id: string
  tasks: TTask[]
}

export type TTask = {
  _id: string
  archived: boolean
  completed: boolean
  content: string
  createdAt: string
  due?: string
  status: TStatus
  todo_id: string
}
