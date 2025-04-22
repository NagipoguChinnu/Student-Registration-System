import React from 'react'
import CourseOfferings from './CourseOfferings'
import CourseTypes from './CourseTypes'
import Courses from './Courses';

function CombinedPage() {
  return (
    <div className="container-fluid g-0 p-0 m-0 ms-4">
  <div className="row g-0">
    <div className="col-md-3">
      <Courses />
    </div>
    <div className="col-md-3">
      <CourseTypes />
    </div>
    <div className="col-md-3">
      <CourseOfferings />
    </div>
  </div>
</div>

  )
}

export default CombinedPage
