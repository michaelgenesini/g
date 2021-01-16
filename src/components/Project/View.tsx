import React from 'react'
import { TProjectAggregate } from '@/types'
import { KambanView } from './KambanView'
import { ListView } from './ListView'

type TProps = {
  project: TProjectAggregate
}

export const View = ({ project }: TProps) => {
  if (project.view === 'KAMBAN') {
    return (
      <KambanView project={project} />
    )
  }

  return <ListView project={project} />
}
