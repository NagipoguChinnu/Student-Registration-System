import React from 'react';

function Home() {
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h1 className="text-primary text-center mb-4">
            Welcome to Student Registration System
          </h1>

          <p>
            Effortlessly manage courses, offerings, and student registrations all in one place.
          </p>

          <p>
            Our Student Registration System is designed to simplify the academic enrollment
            process for both administrators and students. With a user-friendly interface and
            powerful features, this system allows you to:
          </p>

          <ul>
            <li>Define and manage Course Types</li>
            <li>Create and organize Courses with relevant details</li>
            <li>Schedule Course Offerings across different semesters</li>
            <li>Enable Students to register seamlessly for available courses</li>
          </ul>

          <p>
            Whether you're an academic institution or a training provider, this system streamlines
            the way you handle course management and student enrollment — saving time, reducing
            errors, and improving overall efficiency.
          </p>

          <p className="fw-bold text-center mt-4">
            Start your journey with a smarter way to register and manage academic progress.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
