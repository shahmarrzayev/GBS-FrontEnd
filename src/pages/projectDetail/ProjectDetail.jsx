import React from 'react'
import { useParams } from 'react-router-dom'
import MainSection from './projectMainSection/MainSection'
import OtherProject from './otherProject/OtherProject'
import { getProjectBySlug, getProjects } from '../../api'
import { useApi } from '../../hooks/useApi'
import DataState from '../../components/dataState/DataState'

const ProjectDetail = () => {
  const { slug } = useParams()

  const { data: project, loading, error } = useApi(
    (options) => getProjectBySlug(slug, options),
    [slug]
  )
  const { data: otherProjects } = useApi(
    (options) => getProjects({ excludeSlug: slug }, options),
    [slug]
  )

  return (
    <main>
      <DataState loading={loading} error={error}>
        <MainSection data={project}/>
        <OtherProject data={otherProjects}/>
      </DataState>
    </main>
  )
}

export default ProjectDetail
