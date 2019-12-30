import React, { useState, useEffect } from "react";

export default function Courses(props) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("/course", {
      headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("ïnvalid response from error");
      })
      .then(response => {
        console.log(response.courses);
        setCourses(response.courses);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <ul>
        {courses.map(course => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
    </div>
  );
}
