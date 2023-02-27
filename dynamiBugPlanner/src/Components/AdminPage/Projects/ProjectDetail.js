import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function useSessionStorage(key, defaultValue = "") {
  const [state, setState] = useState(() => {
    return JSON.parse(sessionStorage.getItem(key)) || defaultValue;
  });
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default function ProjectDetail({ api }) {
  sessionStorage.removeItem('navSearchBar');
  let projectDetailId = window.location.search;
  if (projectDetailId === null || projectDetailId === "") {
    window.location.href = "/Projects";
  } else {
    projectDetailId = Number(projectDetailId.substring(1));
    if (isNaN(projectDetailId)) {
      window.location.href = "/Projects";
    } else {
      return (
        <div className="container">
          <h4>Project Detail</h4>
          <a href="/Projects">Go to Projects</a>
          <br />
          <a href="/Browse">Go to Reports</a>
          <DisplayProject api={api} id={projectDetailId} />
        </div>
      );
    }
  }
}

function ShowReportsList({ reports }) {
  if (typeof reports != "undefined" && reports.length > 0) {
    return (
      <Table>
        <thead>
          <tr>
            <th>Report Title</th>
            <th>Report Type</th>
            <th>Report Status</th>
            <th>Report Priority</th>
            <th>Report Date</th>
          </tr>
        </thead>
        <tbody>
          {
            reports.map((report) => {
              return (
                <tr key={report.id}>
                  <td>
                    <a href={`/Report?${report.id}`}>{report.title}</a>
                  </td>
                  <td>{report.type}</td>
                  <td>{report.status}</td>
                  <td>{report.priority}</td>
                  <td>{new Date(report.modifyDate).toLocaleString()}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );
  } else {
    return <p>No information.</p>;
  }
}

function DisplayProject({ api, id }) {
  const [projectDetail, setProjectDetail] = useSessionStorage("projectDetail", {
    isArchived: false,
    id: 0,
    name: "",
    description: "",
    githubId: null,
    user: {username: ""},
    reports: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      let result = await api.getProject(id);
      result
        .json()
        .then((json) => setProjectDetail(json))
        .catch((err) => console.log(err.message));
    };
    fetchData();
  }, [api, id, setProjectDetail]);

  const deleteProject = async () => {
    let result = await api.deleteProject(id);
    result
      .json()
      .then((window.location.href = "/Projects"))
      .catch((err) => console.log(err.message));
  };

  const showGithub = () => {
    if (projectDetail.githubId != null) {
      return <p>Showing Information.</p>;
    } else {
      return <p>No information.</p>;
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "1rem" }}>
        {projectDetail.isArchived ? (
          <h5>Archived</h5>
        ) : (
          <a
            className="btn btn-primary RDbutton"
            href={`/EditProject?${projectDetail.id}`}
          >
            Edit Project
          </a>
        )}
        <button onClick={deleteProject} className="btn btn-primary RDbutton">
          Delete Project
        </button>
        <div className="row" style={{ marginTop: "1rem" }}>
          <label className="RDlabel col-15" htmlFor="projectId">
            Id:{" "}
          </label>{" "}
          <input
            type="number"
            id="projectId"
            className="RDinput col-25"
            value={projectDetail.id}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15" htmlFor="projectOwner">
            Username:{" "}
          </label>{" "}
          <input
            type="text"
            id="projectOwner"
            className="RDinput col-25"
            value={projectDetail.user.userName}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15" htmlFor="projectName">
            Title:{" "}
          </label>{" "}
          <input
            type="text"
            id="projectName"
            className="RDinput col-75"
            value={projectDetail.name}
            readOnly
          />
        </div>
        <div className="row">
          <label className="RDlabel col-15" htmlFor="projectDescription">
            Description:{" "}
          </label>{" "}
          <textarea
            type="text"
            id="projectDescription"
            rows="10"
            cols="70"
            className="RDinput col-75"
            value={
              projectDetail.description != null ||
                projectDetail.description !== ""
                ? projectDetail.description
                : "No Description"
            }
            readOnly
          />
        </div>
      </div>
      <div className="row">
        <h6>Github Information</h6>
        {showGithub()}
      </div>
      <div className="row">
        <h6>Reports</h6>
        <ShowReportsList reports={projectDetail.reports} />
      </div>
    </div>
  );
}
