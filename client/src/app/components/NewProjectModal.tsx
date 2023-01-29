import React,  {useState} from 'react'
import { ProjectProps } from '../types/ProjectProps'
import { createProject } from '../api/projectsService'

// callback function to pass the new project to the parent component
type NewProjectCallback = (project: ProjectProps) => void;

interface Props {
    onNewProject: NewProjectCallback;
}

export default function NewProjectModal(props: Props) {

    //using useState hook to set the initial state of the project object
    const [project, setProject] = useState<ProjectProps>({
        id: 0,
        name: '',
        description: '',
        client: '',
        contributorName: '',
        timeSpent: 0,
        completed: false,
        startDate: new Date(),        
        endDate: new Date(),
        timeRegistrations: []
    });
    
    const modalRef = React.useRef<HTMLButtonElement>(null);

    // submit handler for the form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // a little bit of validation
        if (!project.description) {
            project.description = "No description provided";
        }
        if (!project.client) {
            project.client = "No client provided";
        }
        if (!project.contributorName) {
            project.contributorName = "No contributor provided";
        }
        if (!project.timeSpent) {
            project.timeSpent = 0; 
        }
        

        // setProject({ ...project, id: Date.now() + Math.random()});

        // call the createProject function from the projectsService to create a new project
        createProject(project).then((data) => {
            props.onNewProject(data);
        });

        // reset the project object so that the form is empty
        setProject({
            id: 0,
            name: '',
            description: '',
            client: '',
            contributorName: '',
            timeSpent: 0,
            completed: false,
            startDate: new Date(),
            endDate: new Date(),
            timeRegistrations: []
        });

        // close the modal
        modalRef.current!.click();
    }

    return (
        <div>
            {/* Button to trigger modal */}
            <button type="button" className="px-6 py-2.5 bg-blue-600 text-white text-xs uppercase rounded" data-bs-toggle="modal" data-bs-target="#projectModal">
                Add Project
            </button>

            {/* Modal */}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="projectModal" tabIndex={-1} aria-labelledby="projectModalLabel" aria-hidden="true">
                <div className="modal-dialog relative w-auto pointer-events-none">
                    <div
                        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">

                            {/* Title */}
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="projectModalLabel">Add New Project</h5>

                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>

                        {/* Form */}
                        <div className="block p-6 bg-white max-w-md">
                            <form onSubmit={handleSubmit}>

                                {/* Project name */}
                                <div className="form-group mb-6">
                                <label htmlFor="projectName">Project Name</label>
                                    <input
                                    type="text"
                                    id="projectName"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    value={project.name} 
                                    onChange={e => setProject({ ...project, name: e.target.value })} 
                                    placeholder="Enter project name"
                                    required/>
                                        
                                </div>

                                {/* Description */}
                                <div className="form-group mb-6">
                                <label htmlFor="projectDescription">Description</label>
                                    <textarea
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="projectDescription"
                                    rows={3}
                                    value={project.description} 
                                    onChange={e => setProject({ ...project, description: e.target.value })} 
                                    placeholder="Enter project description">
                                    </textarea>
                                </div>

                                {/* Client */}
                                <div className="form-group mb-6">
                                <label htmlFor="projectClient">Client Name</label>
                                    <input
                                    type="text"
                                    id="projectClient"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    value={project.client} 
                                    onChange={e => setProject({ ...project, client: e.target.value })} 
                                    placeholder="Enter client name" />
                                </div>

                                {/* Contributor */}
                                <div className="form-group mb-6">
                                <label htmlFor="projectContributor">Contributor</label>
                                    <input
                                    type="text"
                                    id="projectContributor"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    value={project.contributorName} 
                                    onChange={e => setProject({ ...project, contributorName: e.target.value })} 
                                    placeholder="Enter contributor name"/>
                                </div>

                                {/* Timespent */}
                                <div className="form-group mb-6">
                                <label htmlFor="projectTimeSpent">Timespent (inc. by 30min)</label>
                                    <input
                                    type="number"
                                    id="projectTimeSpent"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                                    value={project.timeSpent} 
                                    onChange={e => setProject({ ...project, timeSpent: parseFloat(e.target.value) })} 
                                    placeholder="Enter time spent" 
                                    min="0"
                                    step="30"/>
                                </div>

                                {/* End date */}
                                <div className="form-group mb-6">
                                    <label htmlFor="floatingInput" className="text-gray-700">End date</label>
                                    <input type="date"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                                    placeholder="Select a date" data-mdb-toggle="datepicker" 
                                    
                                    value={project.endDate.toISOString().substring(0,10)} 
                                    onChange={e => {
                                        // validation for the date, if it's not filled out then set it to today's date
                                        if (e.target.value) {
                                            setProject({ ...project, endDate: new Date(e.target.value) });
                                        } else {
                                            setProject({ ...project, endDate: new Date() });
                                        }
                                    }} />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >Add Project
                                </button>
                            </form>
                        </div>
                        {/* Form end */}
                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button" ref={modalRef} className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs uppercase rounded" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
