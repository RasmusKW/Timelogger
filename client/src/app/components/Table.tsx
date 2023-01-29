import React, { useState } from "react";
import Project from "./Project";
import { ProjectProps } from "../types/ProjectProps";

type Props = {
    projects: ProjectProps[]
    onDelete: (id: number) => void
    onUpdate: (data: ProjectProps) => void
}

type SortBy = "endDate" | "startDate" | "name" | "completed" | "id";

export default function Table({ projects, onDelete, onUpdate}: Props) {

    // state variables used to determine sorting criteria 
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortBy, setSortBy] = useState<"endDate" | "startDate" | "name" | "completed" | "id">("endDate");

    // function to update the sorting criteria, 
    const handleSort = (column: SortBy) => {
        // if the column is already the sorting by that criteria, then toggle the sorting order
        if(sortBy === column){
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }else{
            setSortBy(column)
            setSortOrder("asc")
        }
    }

    // Sorting functionality for each sorting criteria
    const  sortedProjects = projects.sort((a, b) => {
        if (sortBy === "endDate") {
            if (sortOrder === "asc") {
                return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
            } else {
                return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
            }
        } else if (sortBy === "startDate") {
            if (sortOrder === "asc") {
                return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
            } else {
                return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
            }
        } else if (sortBy === "name") {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        } else if (sortBy === "completed") {
            if (sortOrder === "asc") {
                return a.completed < b.completed ? -1 : 1;
            } else {
                return b.completed < a.completed ? -1 : 1;
            }
        } else if (sortBy === "id") {
            if (sortOrder === "asc") {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        }
        return 0;
    });

    return (
        <>
        <table className="table-fixed w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-4 py-2 w-12 hover:cursor-pointer hover:bg-gray-300" onClick={() => handleSort("id")}># ⇅</th>
                    <th className="border px-4 py-2 hover:cursor-pointer hover:bg-gray-300" onClick={() => handleSort("name")}>Project Name ⇅</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Client</th>
                    <th className="border px-4 py-2">Contributor</th>
                    <th className="border px-4 py-2 w-28">Total Time Spent</th>
                    <th className="border px-4 py-2 w-28 hover:cursor-pointer hover:bg-gray-300" onClick={() => handleSort("startDate")}>Start date ⇅</th>
                    <th className="border px-4 py-2 w-28 hover:cursor-pointer hover:bg-gray-300" onClick={() => handleSort("endDate")}>End date ⇅</th>
                    <th className="border px-4 py-2 w-36 hover:cursor-pointer hover:bg-gray-300" onClick={() => handleSort("completed")}>Completed ⇅</th>
                    <th className="border px-4 py-2 w-20">Register time</th>
                    <th className="border px-4 py-2 w-24">Delete</th>
                    <th className="border px-4 py-2 w-24">Time Overview</th>
                </tr>
            </thead>
            <tbody>
            {/* Mapping over the sortedProjects, making a new Project component for each object */}
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
