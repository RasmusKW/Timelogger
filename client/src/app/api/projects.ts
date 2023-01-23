const BASE_URL = "http://localhost:3001/api";
import { ProjectProps } from "../types/ProjectProps";

  export async function getAll(): Promise<Array<ProjectProps>> {
      let projectData = await fetch(`${BASE_URL}/projects`)
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) => { console.log(data);
      return data });
      return projectData;
  }
  
  export async function createProject(project: ProjectProps) {
    try {
      let response = await fetch(`${BASE_URL}/projects/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
      });
      let data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  export async function deleteProject(id: number) {
    try {
      let response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "DELETE"
      });
      let data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  export async function updateProject(id: number, project: ProjectProps) {
    try {
      let response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
      });
      let data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }