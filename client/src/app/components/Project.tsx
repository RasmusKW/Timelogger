import React from 'react'
import { ProjectProps } from '../types/ProjectProps'

type Props = {
  project: ProjectProps
}

export default function Project({ project }: Props) {
  return (
      <tr>
        <td className="border px-4 py-2 w-12">{project.id}</td>
        <td className="border px-4 py-2">{project.name}</td>
        <td className="border px-4 py-2">{project.description}</td>
        <td className="border px-4 py-2">{project.client}</td>
        <td className="border px-4 py-2">{project.contributorName}</td>
        <td className="border px-4 py-2 w-12">{project.timeSpent}</td>
        <td className="border px-4 py-2">{project.completed ? "Completed" : "In Progress"}</td>
      </tr>
  )
}
