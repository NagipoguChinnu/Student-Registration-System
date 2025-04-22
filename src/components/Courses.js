import React, { useEffect, useState } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [courseError, setCourseError] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(stored);
  }, []);

  const saveCourses = (updated) => {
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const handleAddorUpdate = () => {
    if (!courseName.trim()) {
      setCourseError("Course name cannot be empty.");
      return;
    }

    const duplicate = courses.some(
      (course, index) => course.toLowerCase() === courseName.toLowerCase() && index !== editIndex
    );
    if (duplicate) {
      setCourseError("Course already exists.");
      return;
    }

    if (editIndex !== null) {
      const updated = [...courses];
      updated[editIndex] = courseName;
      saveCourses(updated);
      setEditIndex(null);
    } else {
      saveCourses([...courses, courseName]);
    }

    setCourseName('');
    setCourseError('');
  };

  const handleEdit = (index) => {
    setCourseName(courses[index]);
    setEditIndex(index);
    setCourseError('');
  };

  const handleDelete = (index) => {
    const filtered = courses.filter((_, i) => i !== index);
    saveCourses(filtered);
  };

  return (
    <div className='container'>
      <div className='row mt-2'>
        <div className='offset-md-3'>
          <div className='card p-4'>
            <h2 className='text-center text-danger'>Courses</h2>

            <input
              className={`form-control my-2 ${courseError ? 'is-invalid' : ''}`}
              type='text'
              placeholder='Enter new course name'
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            {courseError && <div className='text-danger mb-2'>{courseError}</div>}

            <button className='btn btn-outline-primary my-2' onClick={handleAddorUpdate}>
              {editIndex != null ? 'Update' : 'Add'}
            </button>

            <ul className='mt-3 p-3'>
              {courses.map((course, index) => (
                <li key={index}>
                  {course} <br />
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

export default Courses;
