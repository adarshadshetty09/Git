import { useState } from "react";

export default function TeacherForm({ onAdded }) {
  const [teacher, setTeacher] = useState({ name: "", subject: "" });

  const submit = async (e) => {
    e.preventDefault();

    await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher)
    });

    alert("Teacher added");
    setTeacher({ name: "", subject: "" });
    onAdded();
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold">Add Teacher</h2>
      <form onSubmit={submit} className="space-y-2">
        <input
          className="border p-1 w-full"
          placeholder="Name"
          value={teacher.name}
          onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
        />
        <input
          className="border p-1 w-full"
          placeholder="Subject"
          value={teacher.subject}
          onChange={(e) => setTeacher({ ...teacher, subject: e.target.value })}
        />
        <button className="bg-green-500 text-white px-3 py-1">
          Save
        </button>
      </form>
    </div>
  );
}
