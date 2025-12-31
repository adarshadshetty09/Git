import { useState } from "react";

export default function StudentForm({ onAdded }) {
  const [student, setStudent] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });

    alert("Student added");
    setStudent({ name: "", email: "" });
    onAdded();
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-1 w-full"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
        <input
          className="border p-1 w-full"
          placeholder="Email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-3 py-1">
          Save
        </button>
      </form>
    </div>
  );
}
