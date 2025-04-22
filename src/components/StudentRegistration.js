import React, { useEffect, useState } from 'react';

function StudentRegistration() {
  const [courseTypes] = useState(['Individual', 'Group', 'Special']);
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [filteredOfferings, setFilteredOfferings] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  const [studentName, setStudentName] = useState('');

  const [nameError, setNameError] = useState('');
  const [offeringError, setOfferingError] = useState('');

  useEffect(() => {
    const storedOfferings = JSON.parse(localStorage.getItem('courseOfferings')) || [];
    setCourseOfferings(storedOfferings);
    setFilteredOfferings(storedOfferings);
  }, []);

  useEffect(() => {
    const filtered = selectedTypeFilter
      ? courseOfferings.filter(off => off.startsWith(selectedTypeFilter))
      : courseOfferings;
    setFilteredOfferings(filtered);
  }, [selectedTypeFilter, courseOfferings]);

  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name);

  const handleRegister = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateName(studentName)) {
      setNameError('Name must be at least 3 letters and contain only alphabets.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!selectedOffering) {
      setOfferingError('Please select a course offering.');
      valid = false;
    } else {
      setOfferingError('');
    }

    if (!valid) return;

    const newRegistration = {
      name: studentName,
      offering: selectedOffering
    };

    const storedData = JSON.parse(localStorage.getItem('studentRegistrations')) || [];
    storedData.push(newRegistration);
    localStorage.setItem('studentRegistrations', JSON.stringify(storedData));

    setStudentName('');
    setSelectedOffering('');
    setSelectedTypeFilter('');
    setFilteredOfferings(courseOfferings);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center text-success mb-4">Student Registration</h2>
            <form onSubmit={handleRegister} noValidate>
              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Enter student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`form-control ${nameError ? 'is-invalid' : ''}`}
                  required
                />
                {nameError && <div className="invalid-feedback">{nameError}</div>}
              </div>

              <div className="form-group mb-3">
                <label>Filter by Course Type</label>
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="form-control"
                >
                  <option value="">All</option>
                  {courseTypes.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <select
                  value={selectedOffering}
                  onChange={(e) => setSelectedOffering(e.target.value)}
                  className={`form-control ${offeringError ? 'is-invalid' : ''}`}
                  required
                >
                  <option value="">Select Course Offering</option>
                  {filteredOfferings.map((offering, i) => (
                    <option key={i} value={offering}>{offering}</option>
                  ))}
                </select>
                {offeringError && (
                  <div className="invalid-feedback d-block">{offeringError}</div>
                )}
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-success px-4">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentRegistration;
