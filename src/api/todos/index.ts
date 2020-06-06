import { fetcher } from '@/utils/api'
import { TTodo } from '@/types'

export const getTodo = async (uuid: string) => fetcher<TTodo>(
  `http://localhost:3001/api/todos/${uuid}`,
)

export const getTodos = async () => fetcher<TTodo[]>(
  'http://localhost:3001/api/todos',
)

type TAddTodoParameter = Pick<TTodo, 'name'> & {
  project_id?: string
}

export const addTodo = async ({ name, project_id }: TAddTodoParameter) => fetcher(
  'http://localhost:3001/api/todos',
  {
    method: 'put',
    body: JSON.stringify({
      name,
      project_id,
    })
  },
)

export const deleteTodo = async (uuid: string) =>  fetcher(`http://localhost:3001/api/todos/${uuid}`,
  {
    method: 'delete',
  },
)
