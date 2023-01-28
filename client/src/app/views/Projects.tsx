import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import NewProjectModal from "../components/NewProjectModal";
import { getAll } from "../api/projectsService";
import { ProjectProps } from "../types/ProjectProps";

export default function Projects() {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    
    useEffect(() => {
        getAll().then(data => setProjects(data));
    }, []); 
    
    const addProject = (newProject: ProjectProps) => {
        setProjects([...projects, newProject]);
    }

    function handleDelete(id: number) {
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    }

    function handleUpdate(updatedProject: ProjectProps | undefined) {
        if(!updatedProject) {
            throw new Error("updatedProject is undefined");
        }
        setProjects(prevProjects => prevProjects.map(project => project.id === updatedProject.id ? updatedProject : project));
    }
    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <NewProjectModal onNewProject={addProject} />
                </div>
            </div>

            <Table projects={projects} onDelete={handleDelete} onUpdate={handleUpdate} />
        </>
    );
}
