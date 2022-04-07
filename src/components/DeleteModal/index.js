import "./DeleteModal.scss";

const DeleteModal = (props) => {
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body delete-modal-body">
            <i className="fa-solid fa-circle-exclamation mb-3"></i>
            <h5>Are you sure you want to delete it?</h5>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => props.setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={props.deleteJobSubmit}
              type="button"
              className="btn btn-danger"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
