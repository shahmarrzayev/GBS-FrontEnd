import React from 'react'
import ProjectCard from './projectCard/ProjectCard'
import { getProjects, getProjectsPage } from '../../api'
import { useApi } from '../../hooks/useApi'

const Project = () => {
  const { data: page } = useApi((options) => getProjectsPage(options), [])
  const { data: projects, loading, error } = useApi(
    (options) => getProjects({}, options),
    []
  )

  return (
    <main>
      <ProjectCard content={page} data={projects} loading={loading} error={error}/>
    </main>
  )
}

export default Project
