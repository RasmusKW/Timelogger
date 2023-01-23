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