import React, { useEffect, useState } from 'react';

function CourseTypes() {
  const [CourseTypes, setCourseTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('courseTypes')) || [];
    setCourseTypes(stored);
  }, []);

  const saveTypes = (updated) => {
    setCourseTypes(updated);
    localStorage.setItem('courseTypes', JSON.stringify(updated));
  };

  const handleAdd = () => {
    if (!newType.trim()) {
      setError('Course type cannot be empty.');
      return;
    }

    const duplicate = CourseTypes.some(
      (type, index) => type.toLowerCase() === newType.toLowerCase() && index !== editingIndex
    );
    if (duplicate) {
      setError('Course type already exists.');
      return;
    }

    const updated = [...CourseTypes];
    if (editingIndex != null) {
      updated[editingIndex] = newType;
    } else {
      updated.push(newType);
    }

    saveTypes(updated);
    setNewType('');
    setEditingIndex(null);
    setError('');
  };

  const handleEdit = (index) => {
    setNewType(CourseTypes[index]);
    setEditingIndex(index);
    setError('');
  };

  const handleDelete = (index) => {
    const updated = CourseTypes.filter((_, i) => i !== index);
    saveTypes(updated);
  };

  return (
    <div className='container justify-content-center'>
      <div className='row mt-2'>
        <div className='offset-md-4 md-4'>
          <div className='card p-4'>
            <h2 className='text text-center text-danger'>Course Types</h2>

            <input
              type='text'
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder='Enter new course type'
              className='form-control my-2'
            />
            {error && <div className="text-danger mb-2">{error}</div>}

            <button className='btn btn-outline-primary my-2' onClick={handleAdd}>
              {editingIndex != null ? 'Update' : 'Add'}
            </button>

            <ul className='mt-3 p-3'>
              {CourseTypes.map((type, index) => (
                <li key={index}>
                  {type} <br />
                  <button className="btn btn-outline-warning mt-1 mb-2 btn-sm" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="btn btn-outline-danger ms-4 mt-1 mb-2 btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseTypes;
