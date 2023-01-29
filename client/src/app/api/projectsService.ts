const BASE_URL = "http://localhost:3001/api";
import { ProjectProps } from "../types/ProjectProps";
// import { TimeRegistration } from "../types/TimeRegistration";

  // get all projects
  export async function getAll(): Promise<Array<ProjectProps>> {
      let projectData = await fetch(`${BASE_URL}/projects`)
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((data) =>  data );
      return projectData;
  }
  
  // create project function, taking a project object as parameter
  export async function createProject(project: ProjectProps) {
    try {
      let response = await fetch(`${BASE_URL}/projects/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
      });
      return await response.json();;
    } catch (err) {
      console.log(err);
    }
  }

  // delete project based on id
  export async function deleteProject(id: number) {
    try {
      let response = await fetch(`${BASE_URL}/projects/delete/${id}`, {
        method: "DELETE"
      });     
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  // update project based on id and project object
  export async function updateProject(id: number, project: ProjectProps) {
    try {
      let response = await fetch(`${BASE_URL}/projects/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({...project})
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
}