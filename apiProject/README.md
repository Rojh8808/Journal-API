# Journal REST API

A RESTful web application built with Spring Boot and MongoDB for managing personal journal entries. Includes an integrated single-page dashboard for interactive CRUD management.

## Team Members
- **Rojh Khadka**
- **Bijaya Hayu**
- **Saurav Nyapuane**
- **Rikesh Shrestha**
- **Nischal Gurung**

---

## REST Endpoints

The backend exposes the following API routes under `/journal`:

| Method | Endpoint | Description | Request Payload / Params |
| ------ | -------- | ----------- | ------------------------ |
| `GET` | `/journal` | Fetch all journal entries | None |
| `GET` | `/journal/id/{id}` | Fetch entry by ID | Path variable: `id` |
| `POST` | `/journal` | Create a new entry | JSON: `{ "title": "...", "content": "..." }` |
| `PUT` | `/journal/id/{id}` | Update existing entry | Path variable: `id`, JSON: `{ "title": "...", "content": "..." }` |
| `DELETE` | `/journal/id/{id}` | Delete an entry | Path variable: `id` |

---

## Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Data MongoDB
- **Database**: MongoDB (Local instance on port `27017`)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Modular architecture)
- **Build Tool**: Maven

---

## Project Directory Structure

```text
apiProject/
├── src/
│   ├── main/
│   │   ├── java/com/pgs/apiProject/
│   │   │   ├── controller/      # REST Controllers (JournalController)
│   │   │   ├── entity/          # Mongo Document Entity (Journal)
│   │   │   ├── repository/      # Mongo Repository (JournalRepository)
│   │   │   └── service/         # Service Layer (JournalService)
│   │   └── resources/
│   │       ├── static/          # Web Client (index.html, style.css, app.js)
│   │       └── application.properties
├── index.html                   # Dashboard Markup
├── style.css                    # Dashboard Styles
├── app.js                       # Frontend Application Logic
├── pom.xml                      # Dependencies
└── README.md
```

---

## Setup & Running Locally

### Prerequisites
- JDK 17 or higher installed
- Local MongoDB running on port `27017`

### Execution Steps

1. Clone the repository and move into the project folder:
   ```bash
   git clone <repository-url>
   cd apiProject/apiProject
   ```

2. Run the Spring Boot application using Maven wrapper:
   - **Windows**:
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - **macOS / Linux**:
     ```bash
     ./mvnw spring-boot:run
     ```

3. Open your browser and navigate to:
   - **Web App**: `http://localhost:8080/`
   - **REST API**: `http://localhost:8080/journal`
