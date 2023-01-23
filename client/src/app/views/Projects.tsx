import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import NewProjectModal from "../components/NewProjectModal";
import { getAll } from "../api/projects";
import { ProjectProps } from "../types/ProjectProps";

export default function Projects() {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    useEffect(() => {
        getAll().then(data => setProjects(data));
      }, []); 
    return (
        <>
            <div className="flex items-center my-6">
                <div className="w-1/2">
                    <NewProjectModal />
                </div>

                <div className="w-1/2 flex justify-end">
                    <form>
                        <input
                            className="border rounded-full py-2 px-4"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4 ml-2"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <Table projects={projects}/>
        </>
    );
}
