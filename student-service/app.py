from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}

# ============================================================
# ❌ init_db() REMOVED FROM EXECUTION
#
# Reason (PRODUCTION):
# - Database & tables must NOT be created by application
# - DB initialization should happen once (infra responsibility)
# - Docker / Kubernetes uses SQL init scripts
# - Prevents accidental schema changes in prod
#
# We KEEP this code commented for future reference only
# ============================================================

"""
def init_db():
    conn = mysql.connector.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"]
    )
    cursor = conn.cursor()

    with open("db/01-create-database.sql") as f:
        cursor.execute(f.read())

    conn.commit()
    cursor.close()
    conn.close()

    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    with open("db/02-create-schema.sql") as f:
        for stmt in f.read().split(";"):
            if stmt.strip():
                cursor.execute(stmt)

    with open("db/03-create-tables.sql") as f:
        for stmt in f.read().split(";"):
            if stmt.strip():
                cursor.execute(stmt)

    conn.commit()
    cursor.close()
    conn.close()
"""

# ============================================================
# ROUTES
# ============================================================

@app.route("/students", methods=["POST"])
def add_student():
    data = request.json

    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO student_students (name, email) VALUES (%s, %s)",
        (data["name"], data["email"])
    )

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Student added"}, 201


@app.route("/students", methods=["GET"])
def get_students():
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM student_students")
    students = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(students)


@app.route("/health", methods=["GET"])
def health():
    return "OK", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
