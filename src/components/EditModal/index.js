import "./EditModal.scss";
import { useState } from "react";

const EditModal = (props) => {
  const [name, setName] = useState(props.name);
  const [priority, setPriority] = useState(props.priority);

  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Job Edit</h5>
          </div>
          <div className="modal-body">
            <label htmlFor="editJobName">Job Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control mb-3"
              id="editJobName"
              disabled
            />
            <label htmlFor="editJobPriority">Job Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              id="editJobPriority"
              className="form-select"
            >
              <option value={0}>Choose</option>
              <option value={1}>Urgent</option>
              <option value={2}>Regular</option>
              <option value={3}>Trivial</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => props.setIsEditModalOpen(false)}
              type="button"
              className="btn btn-light"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                priority != 0 &&
                name != "" &&
                props.editJobSubmit(name, priority)
              }
              type="button"
              className="btn btn-danger"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
