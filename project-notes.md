====================================================================================================================================

```

student-management-system/
├── frontend/                 # React + Tailwind (Modern UI)
├── backend-nodejs/           # CURRENT FOCUS: Express + MongoDB
│   ├── src/
│   │   ├── models/           # DB Schemas
│   │   └── index.js          # API Logic
│   ├── Dockerfile
│   └── package.json
├── backend-python/           # Phase 2: FastAPI + MySQL
├── backend-java/             # Phase 3: Spring Boot + Postgres
├── backend-go/               # Phase 4: Gin + Redis/Postgres
├── infra/                    # DevOps/Init scripts
│   ├── mongo-init/
│   ├── mysql-init/
│   └── postgres-init/
└── docker-compose.yml        # The "Glue" for everything 

```


# Updated One 

```
school-app/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── api.js
├── student-service/
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
│   └── db/
│       └── mongo.py
├── teacher-service/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
└── score-service/
    ├── Dockerfile
    ├── pom.xml
    └── src/
        └── main/
            └── java/
                └── com/example/score/
                    ├── ScoreApplication.java
                    └── ScoreController.java
```

====================================================================================================================================





====================================================================================================================================

```
sudo apt update
sudo apt install -y postgresql postgresql-contrib

sudo systemctl start postgresql
sudo systemctl enable postgresql

```

school@school:~/My_Notes/school-app/teacher-service$

```
ALTER USER postgres WITH PASSWORD 'postgres123';
```


```
sudo -u postgres psql -f db/create-database.sql
sudo -u postgres psql -f db/create-schema.sql
sudo -u postgres psql -f db/create-tables.sql
sudo -u postgres psql -f db/create-indexes.sql
```

```
CREATE DATABASE
You are now connected to database "school" as user "postgres".
CREATE SCHEMA
You are now connected to database "school" as user "postgres".
CREATE TABLE
You are now connected to database "school" as user "postgres".
CREATE INDEX
school@school:~/My_Notes/school-app/teacher-service$ 
```

```
sudo apt install -y nodejs npm

npm install react-scripts

npm install  

node index.js
 or 

npm start
```


====================================================================================================================================


```
sudo apt update
sudo apt install -y python3-pip


sudo apt update
sudo apt install -y python3-venv python3-full




sudo apt update
sudo apt install mysql-server -y


python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```





```
cd ~/My_Notes/school-app/student-service
python3 -m venv venv


source venv/bin/activate



```

```
STEP 1: Login to MySQL as root (socket auth)
sudo mysql

🟢 STEP 2: Create database user for student service

Inside MySQL:

CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_pass';

🟢 STEP 3: Grant permissions (ONLY what it needs)
GRANT ALL PRIVILEGES ON school_student.* TO 'student_user'@'localhost';
FLUSH PRIVILEGES;


Verify:

SHOW GRANTS FOR 'student_user'@'localhost';
```



```

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement

mysql>
mysql> CREATE USER 'student_user'@'localhost' IDENTIFIED BY 'student_pass';
Query OK, 0 rows affected (0.02 sec)

mysql> GRANT ALL PRIVILEGES ON school_student.* TO 'student_user'@'localhost';
Query OK, 0 rows affected (0.00 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)

mysql> SHOW GRANTS FOR 'student_user'@'localhost';
+--------------------------------------------------------------------------+
| Grants for student_user@localhost                                        |
+--------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `student_user`@`localhost`                         |
| GRANT ALL PRIVILEGES ON `school_student`.* TO `student_user`@`localhost` |
+--------------------------------------------------------------------------+
2 rows in set (0.00 sec)

mysql>

```

Exit MySQL:

EXIT;

```
db = mysql.connector.connect(
    host="localhost",
    user="student_user",
    password="student_pass",
    database="school_student"
)
```
```
python app.py
```
====================================================================================================================================



```
score-service/
├── pom.xml
├── Dockerfile
└── src/
    └── main/
        ├── java/com/school/score/
        │   ├── ScoreServiceApplication.java
        │   ├── controller/ScoreController.java
        │   ├── model/Score.java
        │   └── repository/ScoreRepository.java
        └── resources/application.yaml
```




## Install MongoDB

step:1

```
sudo apt-get install gnupg curl
```


```
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
```

step:2

```
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

step:3

```
sudo apt-get update
```

step:4

```
sudo apt-get install -y mongodb-org  && ps --no-headers -o comm 1
```

step:5 

```
sudo systemctl start mongod

sudo systemctl daemon-reload

sudo systemctl status mongod

sudo systemctl enable mongod

sudo systemctl stop mongod

sudo systemctl restart mongod

```


```
mongosh
```

```
exit
```


## ✅ FIX: Install Maven (Ubuntu / Debian)

```
sudo apt update
sudo apt install -y maven

mvn -v

sudo apt install -y openjdk-17-jdk
java -version

```

## ✅ FIX (BEST PRACTICE): Align EVERYTHING to Java 17

```
sudo apt install openjdk-17-jdk -y
java --version 
javac -version 

sudo update-alternatives --config java
sudo update-alternatives --config javac

java -version
javac -version
mvn -v
```


Step 3️⃣ (IMPORTANT) Add compiler config explicitly to pom.xml

Edit pom.xml → inside <build><plugins> add this:

```
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <release>17</release>
    </configuration>
</plugin>
```
## Step 4️⃣ Clean & rebuild

```
mvn clean
mvn spring-boot:run
```


## 🧪 Test Score Service APIs (NOW)

## Add Score 

```
curl -X POST http://localhost:5003/scores \
-H "Content-Type: application/json" \
-d '{"studentId":1,"subject":"Math","marks":95}'
```


## Get all scores

```
curl http://localhost:5003/score
```

## Health Check

```
curl http://localhost:5003/actuator/health
```

# expected 
```
{"status": "UP"}
```


====================================================================================================================================


# Dockerizing the Application

### Install the docker and docker-compose for ubuntu machine 

https://docs.docker.com/engine/install/ubuntu/

```
sudo apt remove $(dpkg --get-selections docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc | cut -f1)
```

```
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update

```


```
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```
sudo systemctl status docker
```

```
docker run hello-world
```

# docker-compose Installation

```
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

```
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v5.0.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose

```

```
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

```
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
```

```
docker compose version
```

```
git clone https://github.com/adarshadshetty09/My_Notes.git

cd /home/docker/My_Notes/school-app
```

```
docker compose down -v
docker compose up --build
```

```
docker compose down -v
```


```
docker volume ls
```

```
docker volume rm \
school-app_mongo_data \
school-app_mysql_data \
school-app_postgres_data
```

```
docker network prune
```

```
docker network rm $(docker network ls -q)
```

```
docker system prune -a --volumes
```


```
docker ps -a
docker volume ls
docker network ls
```
