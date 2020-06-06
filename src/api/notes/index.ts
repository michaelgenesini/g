import { fetcher } from '@/utils/api'
import { TNote } from '@/types'

export const getNote = async (uuid: string) => fetcher<TNote>(
  `http://localhost:3001/api/notes/${uuid}`,
)

export const getNotes = async () => fetcher<TNote[]>(
  'http://localhost:3001/api/notes',
)

type TAddNoteParameter = Pick<TNote, 'name' | 'content'> & {
  project_id?: string
}

export const addNote = async ({ content, name, project_id }: TAddNoteParameter) => fetcher(
  'http://localhost:3001/api/notes',
  {
    method: 'put',
    body: JSON.stringify({
      content,
      name,
      project_id,
    })
  },
)

export const deleteNote = async (uuid: string) =>  fetcher(`http://localhost:3001/api/notes/${uuid}`,
  {
    method: 'delete',
  },
)
