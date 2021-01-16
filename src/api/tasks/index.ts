import { fetcher } from '@/utils/api'
import { TTask } from '@/types'

export const getTask = async (_id: string) => fetcher<TTask>(
  `http://localhost:3001/api/tasks/${_id}`,
)

export const getTasks = async () => fetcher<TTask[]>(
  'http://localhost:3001/api/tasks',
)

type TAddTaskParameter = Pick<TTask, 'content'> & {
  todo_id?: string
}

export const addTask = async ({ content, todo_id }: TAddTaskParameter) => fetcher(
  'http://localhost:3001/api/tasks',
  {
    method: 'put',
    body: JSON.stringify({
      content,
      todo_id,
    })
  },
)

type TUpdateTaskParameter = Pick<TTask, '_id' | 'completed'>

export const updateTask = async ({ _id, completed }: TUpdateTaskParameter) => fetcher(
  `http://localhost:3001/api/tasks/${_id}`,
  {
    method: 'post',
    body: JSON.stringify({
      completed,
    })
  },
)

export const deleteTodo = async (_id: string) =>  fetcher(`http://localhost:3001/api/tasks/${_id}`,
  {
    method: 'delete',
  },
)
