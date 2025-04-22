import React, { useState, useEffect } from 'react';

function RegisteredStudents() {
  const [registrations, setRegistrations] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [editOffering, setEditOffering] = useState('');

  useEffect(() => {
    const storedRegistrations = localStorage.getItem('studentRegistrations');
    if (storedRegistrations) {
      setRegistrations(JSON.parse(storedRegistrations));
    }
  }, []);

  const handleDelete = (index) => {
    const updated = [...registrations];
    updated.splice(index, 1);
    setRegistrations(updated);
    localStorage.setItem('studentRegistrations', JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(registrations[index].name);
    setEditOffering(registrations[index].offering);
  };

  const handleUpdate = () => {
    const updated = [...registrations];
    updated[editIndex] = { name: editName, offering: editOffering };
    setRegistrations(updated);
    setEditIndex(null);
    localStorage.setItem('studentRegistrations', JSON.stringify(updated));
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">Registered Students</h3>

            {registrations.length === 0 ? (
              <p className="text-center text-muted">No students registered yet.</p>
            ) : (
              <ul className="list-group">
                {registrations.map((reg, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
                  >
                    {editIndex === index ? (
                      <div className="w-100">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="form-control mb-2"
                        />
                        <input
                          type="text"
                          value={editOffering}
                          onChange={(e) => setEditOffering(e.target.value)}
                          className="form-control mb-2"
                        />
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            onClick={handleUpdate}
                            className="btn btn-primary btn-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setEditIndex(null)}
                            className="btn btn-secondary btn-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-2 mb-md-0">
                          <strong>{reg.name}</strong> - {reg.offering}
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredStudents;
