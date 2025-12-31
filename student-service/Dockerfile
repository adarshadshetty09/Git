# =========================
# Base Image
# =========================
FROM python:3.12-slim

# =========================
# Set working directory
# =========================
WORKDIR /app

# =========================
# Install system dependencies
# (needed for mysql-connector)
# =========================
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# =========================
# Copy dependency file first
# (Docker layer caching)
# =========================
COPY requirements.txt .

# =========================
# Install Python dependencies
# =========================
RUN pip install --no-cache-dir -r requirements.txt

# =========================
# Copy application code
# =========================
COPY app.py .
COPY db ./db

# =========================
# Expose service port
# =========================
EXPOSE 5001

# =========================
# Run the application
# =========================
CMD ["python", "app.py"]
