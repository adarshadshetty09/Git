import { useEffect, useState } from "react";

export default function ScoreList({ refreshKey }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("/api/scores")
      .then(res => res.json())
      .then(data => setScores(data));
  }, [refreshKey]);

  return (
    <div className="border p-4">
      <h2 className="font-semibold">Scores</h2>
      <ul>
        {scores.map(s => (
          <li key={s.id}>
            Student #{s.studentId} — {s.subject}: {s.marks}
          </li>
        ))}
      </ul>
    </div>
  );
}
