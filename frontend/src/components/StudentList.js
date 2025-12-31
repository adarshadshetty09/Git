import { useEffect, useState } from "react";

export default function StudentList({ refreshKey }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, [refreshKey]);

  return (
    <div className="border p-4">
      <h2 className="font-semibold">Students</h2>
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} - {s.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
