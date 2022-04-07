import "./ListItem.scss";

const ListItem = (props) => {
  const badgeMapper = (val) => {
    switch (val) {
      case "1":
        return <span className="badge bg-danger px-3 py-2">Urgent</span>;
      case "2":
        return <span className="badge bg-warning px-3 py-2">Regular</span>;
      case "3":
        return <span className="badge bg-primary px-3 py-2">Trivial</span>;
      default:
        return <></>;
    }
  };

  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{badgeMapper(props.priority)}</td>
        <td className="list-actions">
          <button onClick={() => props.editJob(props.index)} type="button" className="btn btn-light">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={() => props.deleteJob(props.index)} type="button" className="btn btn-light mx-3">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default ListItem;
