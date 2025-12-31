import { useEffect, useState } from "react";

export default function TeacherList({ refreshKey }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/teachers")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch teachers");
        return res.json();
      })
      .then(data => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [refreshKey]);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-semibold text-lg">Teachers</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul>
          {teachers.map(t => (
            <li key={t.id}>
              {t.name} — {t.subject}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
