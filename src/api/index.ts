import { addNote, deleteNote, getNote, getNotes } from './notes'
import { addProject, deleteProject, getProject, getProjects } from './projects'

export const api = {
  notes: {
    addNote,
    deleteNote,
    getNote,
    getNotes,
  },
  projects: {
    addProject,
    deleteProject,
    getProject,
    getProjects
  },
}
