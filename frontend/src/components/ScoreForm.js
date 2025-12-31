import { useState } from "react";

export default function ScoreForm({ onAdded }) {
  const [score, setScore] = useState({
    studentId: "",
    subject: "",
    marks: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(score)
    });

    alert("Score added");
    setScore({ studentId: "", subject: "", marks: "" });
    onAdded();
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold">Add Score</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="border p-1 w-full"
          placeholder="Student ID"
          value={score.studentId}
          onChange={(e) => setScore({ ...score, studentId: e.target.value })}
        />
        <input className="border p-1 w-full"
          placeholder="Subject"
          value={score.subject}
          onChange={(e) => setScore({ ...score, subject: e.target.value })}
        />
        <input className="border p-1 w-full"
          placeholder="Marks"
          value={score.marks}
          onChange={(e) => setScore({ ...score, marks: e.target.value })}
        />
        <button className="bg-purple-500 text-white px-3 py-1">
          Save
        </button>
      </form>
    </div>
  );
}
