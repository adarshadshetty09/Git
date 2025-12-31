import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import TeacherForm from "./components/TeacherForm";
import TeacherList from "./components/TeacherList";
import ScoreForm from "./components/ScoreForm";
import ScoreList from "./components/ScoreList";

export default function App() {
  const [refreshStudent, setRefreshStudent] = useState(0);
  const [refreshTeacher, setRefreshTeacher] = useState(0);
  const [refreshScore, setRefreshScore] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold text-center">
          School Management Dashboard
        </h1>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto p-6 grid gap-8">
        
        {/* STUDENTS */}
        <section className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Students
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <StudentForm onAdded={() => setRefreshStudent(r => r + 1)} />
            <StudentList refreshKey={refreshStudent} />
          </div>
        </section>

        {/* TEACHERS */}
        <section className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Teachers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <TeacherForm onAdded={() => setRefreshTeacher(r => r + 1)} />
            <TeacherList refreshKey={refreshTeacher} />
          </div>
        </section>

        {/* SCORES */}
        <section className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            Scores
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ScoreForm onAdded={() => setRefreshScore(r => r + 1)} />
            <ScoreList refreshKey={refreshScore} />
          </div>
        </section>

      </main>
    </div>
  );
}
