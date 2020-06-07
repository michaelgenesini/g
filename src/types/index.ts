import { BaseEmoji } from 'emoji-mart'

export type TProject = {
  _id: string
  createdAt: string
  emoji: BaseEmoji
  name: string
  notes: string[]
  templates: string[]
  todos: string[]
}

export type TProjectAggregate = {
  _id: string
  createdAt: string
  emoji: BaseEmoji
  name: string
  notes: TNote[]
  templates: TTemplate[]
  todos: TTodoAggregate[]
}

export type TNote = {
  _id: string
  content: string
  createdAt: string
  name: string
}

export type TTemplate = {
  _id: string
  createdAt: string
  name: string
  content: string
}

export type TTodo = {
  _id: string
  createdAt: string
  name: string
  tasks: string[]
}

export type TTodoAggregate = {
  _id: string
  createdAt: string
  name: string
  tasks: TTask[]
}

export type TTask = {
  _id: string
  archived: boolean
  completed: boolean
  content: string
  createdAt: string
  due?: string
}
