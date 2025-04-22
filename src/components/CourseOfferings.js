import React, { useEffect, useState } from 'react';

function CourseOfferings() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({ type: '', course: '' });

  useEffect(() => {
    const storedOfferings = JSON.parse(localStorage.getItem('courseOfferings')) || [];
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const storedTypes = JSON.parse(localStorage.getItem('courseTypes')) || [];

    setOfferings(storedOfferings);
    setCourses(storedCourses);
    setCourseTypes(storedTypes);
  }, []);

  const saveOfferings = (newOfferings) => {
    setOfferings(newOfferings);
    localStorage.setItem('courseOfferings', JSON.stringify(newOfferings));
  };

  const handleAddOrUpdate = () => {
    let hasError = false;
    const newErrors = { type: '', course: '' };

    if (!selectedType) {
      newErrors.type = 'Please select a course type.';
      hasError = true;
    }
    if (!selectedCourse) {
      newErrors.course = 'Please select a course.';
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const newOffering = `${selectedType} - ${selectedCourse}`;

    if (editIndex !== null) {
      const updated = [...offerings];
      updated[editIndex] = newOffering;
      saveOfferings(updated);
      setEditIndex(null);
    } else {
      if (!offerings.includes(newOffering)) {
        saveOfferings([...offerings, newOffering]);
      }
    }

    setSelectedType('');
    setSelectedCourse('');
    setErrors({ type: '', course: '' });
  };

  const handleEdit = (index) => {
    const [type, course] = offerings[index].split(' - ');
    setSelectedType(type);
    setSelectedCourse(course);
    setEditIndex(index);
    setErrors({ type: '', course: '' });
  };

  const handleDelete = (index) => {
    const updated = offerings.filter((_, i) => i !== index);
    saveOfferings(updated);
  };

  return (
    <div className='container'>
      <div className='row mt-2'>
        <div className='offset-md-5'>
          <div className='card p-4'>
            <h2 className='text-center text-danger'>Course Offerings</h2>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className='form-control my-2'>
              <option value="">Select Course Type</option>
              {courseTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <div className="text-danger mb-2">{errors.type}</div>}

            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className='form-control my-4'>
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && <div className="text-danger mb-2">{errors.course}</div>}

            <button className='btn btn-outline-primary my-2' onClick={handleAddOrUpdate}>
              {editIndex !== null ? "Update" : "Add"} Offering
            </button>
            <ul>
              {offerings.map((offering, index) => (
                <li key={index}>
                  {offering} <br />
                  <button className="btn btn-outline-warning mt-1 mb-2 btn-sm" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="btn btn-outline-danger mt-1 mb-2 ms-4 btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseOfferings;
