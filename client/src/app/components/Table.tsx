import React from "react";
import Project from "./Project";
import { ProjectProps } from "../types/ProjectProps";

type Props = {
    projects: ProjectProps[]
}

export default function Table({ projects }: Props) {
    return (
        <>
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12">#</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Client</th>
                    <th className="border px-4 py-2">Contributor</th>
                    <th className="border px-4 py-2 w-28">Time Spent</th>
                    <th className="border px-4 py-2">Completed</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project: any) => {
                    return (
                        <Project key={project.id} project={project} />
                    )
                })}
            </tbody>
        </table>
        </>
    );
}
