import React, {useState, useEffect} from 'react'
import { ProjectProps } from '../types/ProjectProps'
import { deleteProject } from '../api/projectsService'
import { updateProject } from '../api/projectsService'
import { TimeRegistration } from '../types/TimeRegistration'

type Props = {
  project: ProjectProps
  onDelete: (id: number) => void
  onUpdate: (data: ProjectProps) => void
}

export default function Project({project, onDelete, onUpdate}: Props) {

  // Hacky solution to store time registrations in local storage
  const initialTimeRegistrations = JSON.parse(localStorage.getItem(`timeRegistrations-${project.id}`) || '[]');
  const [timeRegistrations, setTimeRegistrations] = useState<TimeRegistration[]>(initialTimeRegistrations);
  useEffect(() => {
    localStorage.setItem(`timeRegistrations-${project.id}`, JSON.stringify(timeRegistrations));
  }, [timeRegistrations, project.id]);

  // Ref for modal to close it after submit
  const modalRef = React.useRef<HTMLButtonElement>(null);

  // Handle time registration form submit
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Getting the input value from the form
    const input = event.currentTarget.querySelector('#projectTimeSpent') as HTMLInputElement;
    let newTimeSpent = Number(input.value);
    
    // Validation for time input
    if (newTimeSpent === 0) {
      newTimeSpent = 30;
    }
    
    // Creating a new time registration object and adding it to the time registrations array
    const newTimeRegistration = {
      projectId: project.id,
      timeSpent: newTimeSpent,
      date: new Date(project.startDate).toLocaleDateString("da-DK", {day: '2-digit', month: '2-digit', year: 'numeric'}) 
    }
    setTimeRegistrations([...timeRegistrations, newTimeRegistration]);

    // Oject to update the project with
    const updateData = {...project,
      timeSpent: project.timeSpent + newTimeSpent,
      // Code that would replace the more hacky frontend solution of time registrations.
      // timeRegistrations: [...project.timeRegistrations, newTimeRegistration]
    }

    // Updating the project using the updateProject function from the projectsService
    updateProject(project.id, updateData).then(data => {
      if (data.error) {
          console.log(data.error);
      } else {
          onUpdate(data);
      }
    });

    // Resetting the form and closing the modal
    event.currentTarget.reset();
    modalRef.current!.click();
  }
  
  // Function to toggle the completed status of a project
  const handleToggleCompleted = (id: number) => {
    const updatedProject = {...project, completed: !project.completed};
    updateProject(id, updatedProject).then(data => {
      onUpdate(data);
    });
  }

  // Function to handle deletion of a project
  const handleDelete = () => {
    deleteProject(project.id).then(() => {
      onDelete(project.id);
    });
  }

  // Converting timeSpent from minutes to hours and minutes
  const hours = Math.floor(project.timeSpent / 60);
  const minutes = project.timeSpent % 60;
  let timeSpent = "";

  // Semantics and removing hours if 0
  if (hours === 1) { timeSpent = `${hours} \n hour ${minutes} minutes` }
  else if (hours === 0) { timeSpent = `${minutes} minutes` }
  else { timeSpent = `${hours} hours \n ${minutes} minutes` }


  return (
    <tr>
      <td className="border px-4 py-2">{project.id}</td>
      <td className="border px-4 py-2">{project.name}</td>
      <td className="border px-4 py-2">{project.description}</td>
      <td className="border px-4 py-2">{project.client}</td>
      <td className="border px-4 py-2">{project.contributorName}</td>
      <td className="border px-4 py-2">{timeSpent}</td>
      {/* Formatting the date inline */}
      <td className="border px-4 py-2">{new Date(project.startDate).toLocaleDateString("da-DK", {day: '2-digit', month: '2-digit', year: 'numeric'})}</td> 
      <td className="border px-4 py-2">{new Date(project.endDate).toLocaleDateString("da-DK", {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
      <td className="border px-4 py-2"> {project.completed ? "Completed" : "In Progress"} 
        <input className='hover:cursor-pointer' onChange={() => handleToggleCompleted(project.id)} type="checkbox" checked={project.completed} />
        </td>
      <td className="border px-4 py-2">
        <button type="button"
          className={`inline-block px-4 py-4 text-white text-xs rounded ${project.completed ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600"}`}
          data-bs-toggle="modal"
          data-bs-target={`#addTimeModal-${project.id}`}
          disabled={project.completed}
        >+</button>

        {/* Time reg. Modal */}
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id={`addTimeModal-${project.id}`} tabIndex={-1} aria-labelledby="addTimeModalLabel" aria-hidden="true">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800" id="addTimeModalLabel">Time registration for project: <strong>{project.name}</strong></h5>
              </div>
              <div className="block p-6 bg-white max-w-md">
                <form onSubmit={handleUpdate}>
                  <div className="form-group mb-6">
                    <label htmlFor="projectTimeSpent">Timespent (inc. by 30min)</label>
                    <input
                      type="number"
                      id="projectTimeSpent"
                      name="projectTimeSpent"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter time spent"
                      min="30"
                      step="30"
                      defaultValue={30} />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded"
                    >Save
                  </button>
                </form>
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
                  data-bs-dismiss="modal" ref={modalRef}>Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End time reg. Modal */}
      </td>

      {/* Delete functionality */}
      <td className="border px-4 py-2">
        <button type="button" className="inline-block px-4 py-4 text-white text-xs rounded bg-red-600"
          data-bs-toggle="modal"
          data-bs-target={`#deleteModal-${project.id}`}
        >Delete</button>

        {/* Delete Modal */}
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id={`deleteModal-${project.id}`} tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800" id="deleteModalLabel">Are you sure you want to delete the project: <strong>{project.name}</strong></h5>
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
                  data-bs-dismiss="modal" >No
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md ml-1"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}>Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End delete Modal */}
      </td>

      {/* Time overview */}
      <td className="border px-4 py-2">
        <button type="button" className="inline-block px-2 py-2 text-white text-xs rounded bg-blue-600"
          data-bs-toggle="modal"
          data-bs-target={`#timeModal-${project.id}`}>Time Overview</button>

        {/* Time overview modal */}
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id={`timeModal-${project.id}`} tabIndex={-1} aria-labelledby="overviewModalLabel" aria-hidden="true">
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800" id="overviewModalLabel">Time registration for project: <strong>{project.name}</strong></h5>
              </div>
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="border-b">
                            <tr>
                              <th scope="col" className="text-sm font-bold font-medium text-gray-900 px-6 py-4 text-left">
                                Time spent
                              </th>
                              <th scope="col" className="text-sm font-bold font-medium text-gray-900 px-6 py-4 text-left">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {timeRegistrations.map((timeRegistration, index) => (
                              <tr className="bg-white border-b" key={index}>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {Math.floor(timeRegistration.timeSpent / 60)}h {timeRegistration.timeSpent % 60}m
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {timeRegistration.date}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
                  data-bs-dismiss="modal" >Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
      {/* End Time overview */}
    </tr>
  )
}
