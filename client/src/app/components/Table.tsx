import React, { useState } from "react";
import Project from "./Project";
import { ProjectProps } from "../types/ProjectProps";

type Props = {
    projects: ProjectProps[]
    onDelete: (id: number) => void
    onUpdate: (data: ProjectProps) => void
}

type SortBy = "endDate" | "startDate" | "name";


export default function Table({ projects, onDelete, onUpdate}: Props) {
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<"endDate" | "startDate" | "name">("endDate");

    const handleSort = (column: SortBy) => {
        if(sortBy === column){
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }else{
            setSortBy(column)
            setSortOrder("asc")
        }
    }
    const sortedProjects = projects.sort((a, b) => {
        if (sortBy === "endDate") {
            if (sortOrder === "asc") {
                return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
            } else {
                return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
            }
        }
        return 0;
    });

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
                    <th className="border px-4 py-2 w-28">Total Time Spent</th>
                    <th className="border px-4 py-2 w-28">Start date</th>
                    <th className="border px-4 py-2 w-28 hover:cursor-pointer hover:bg-gray-300" onClick={() => handleSort("endDate")}>End date ⇅</th>
                    <th className="border px-4 py-2 w-36">Completed</th>
                    <th className="border px-4 py-2 w-20">Register time</th>
                    <th className="border px-4 py-2 w-24">Delete</th>
                    <th className="border px-4 py-2 w-24">Time Overview</th>
                </tr>
            </thead>
            <tbody>
            {sortedProjects.map((project: ProjectProps) => {
                return (
                    <Project key={project.id} project={project} onDelete={onDelete} onUpdate={onUpdate} />
                )
            })}
            </tbody>
        </table>
        </>
    );
}
