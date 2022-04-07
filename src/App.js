import { useState, useEffect } from "react";
import "./App.scss";
import ListItem from "./components/ListItem";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";

const initialValues = { createJobName: "", createJobPriority: 0 };
const regEx = /^[0-9a-zA-Z]+$/;
const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [form, setForm] = useState(initialValues);
  const [checkCreateJobName, setCheckCreateJobName] = useState(false);
  const [filterJobName, setFilterJobName] = useState("");
  const [filterJobPriority, setFilterJobPriority] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJobIndex, setSelectedJobIndex] = useState(-1);

  const createJob = () => {
    if (form.createJobPriority == 0 || form.createJobName == "") return;

   
    if (form.createJobName.match(regEx) === null) {
      setCheckCreateJobName(true);
      return;
    }
    setJobs([
      ...jobs,
      {
        name: form.createJobName,
        priority: form.createJobPriority,
      },
    ]);
    setForm(initialValues);
    setCheckCreateJobName(false);
  };

  const onChangeInput = (e) => {
    if(form.createJobName==='') setCheckCreateJobName(false)
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const editJob = (index) => {
    setIsEditModalOpen(true);
    setSelectedJobIndex(index);
  };

  const editJobSubmit = (name, priority) => {
    jobs[selectedJobIndex] = { name, priority };
    setJobs(jobs);
    setIsEditModalOpen(false);
    setSelectedJobIndex(-1);
  };

  const deleteJob = (index) => {
    setIsDeleteModalOpen(true);
    setSelectedJobIndex(index);
  };

  const deleteJobSubmit = () => {
    jobs.splice(selectedJobIndex, 1);
    setJobs(jobs);
    setIsDeleteModalOpen(false);
    setSelectedJobIndex(-1);
  };

  useEffect(() => {
    const filteredJobs = [];

    jobs.map((item) => {
      if (
        (filterJobName == "" || item.name.indexOf(filterJobName) > -1) &&
        (filterJobPriority == 0 || filterJobPriority == item.priority)
      ) {
        filteredJobs.push(item);
      }
    });

    setFilteredJobs(filteredJobs);
  }, [filterJobName, filterJobPriority]);

  const isFiltered = filterJobName != "" || filterJobPriority != 0;

  return (
    <>
      {isEditModalOpen && (
        <EditModal
          {...{
            setIsEditModalOpen,
            editJobSubmit,
            name: jobs[selectedJobIndex].name,
            priority: jobs[selectedJobIndex].priority,
          }}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal {...{ setIsDeleteModalOpen, deleteJobSubmit }} />
      )}

      <div className="container">
        <h4 className="mb-3 mt-5">Create New Job</h4>
        <div className="row mb-5">
          <div className="col-md-9">
            <label htmlFor="createJobName">Job Name</label>
            <input
              value={form.createJobName}
              onChange={onChangeInput}
              type="text"
              className="form-control"
              id="createJobName"
              name="createJobName"
            />
            {checkCreateJobName && (
              <span className="alert-message">
                Job name must be alpha numeric
              </span>
            )}
          </div>
          <div className="col-md-2">
            <label htmlFor="createJobPriority">Job Priority</label>
            <select
              value={form.createJobPriority}
              onChange={onChangeInput}
              id="createJobPriority"
              className="form-select"
              name="createJobPriority"
            >
              <option value={0} disabled>
                Choose
              </option>
              <option value={1}>Urgent</option>
              <option value={2}>Regular</option>
              <option value={3}>Trivial</option>
            </select>
          </div>
          <div className="col-md-1 create-job-button">
            <button
              onClick={() => createJob()}
              type="button"
              className="btn btn-primary"
            >
              <i className="fa-solid fa-plus"></i> Create
            </button>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-8">
            <h4>Job List</h4>
          </div>
          <div className="col-md-4 job-counter">
            ({isFiltered ? filteredJobs.length : jobs.length}/{jobs.length})
          </div>
        </div>
        <div className="row mb-3  job-list">
          <div className="col-md-9">
            <input
              value={filterJobName}
              onChange={(e) => setFilterJobName(e.target.value)}
              type="text"
              className="form-control"
              id="listJobName"
              placeholder="Job Name"
            />
          </div>
          <div className="col-md-3">
            <select
              value={filterJobPriority}
              onChange={(e) => setFilterJobPriority(e.target.value)}
              id="listJobPriority"
              className="form-select"
            >
              <option value={0}>Priority (All)</option>
              <option value={1}>Urgent</option>
              <option value={2}>Regular</option>
              <option value={3}>Trivial</option>
            </select>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Priority</th>
                  <th scope="col" className="list-actions">Action</th>
                </tr>
              </thead>
              <tbody>
                {(isFiltered ? filteredJobs : jobs)
                  .sort((a, b) => (a.priority > b.priority ? 1 : -1))
                  .map((item, i) => (
                    <ListItem
                      key={i}
                      {...{ ...item, editJob, deleteJob, index: i }}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
