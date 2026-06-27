# Journal REST API

A lightweight RESTful web application built with Java, Spring Boot, and MongoDB for managing personal journal entries. This project provides full CRUD functionality along with an integrated dashboard frontend interface.

## Team Members
- **Rojh Khadka**
- **Bijaya Hayu**
- **Saurav Nyapuane**
- **Rikesh Shrestha**
- **Nischal Gurung**

---

## API Reference

The backend exposes standard REST endpoints under the `/journal` route:

| Method | Endpoint | Description | Request Body / Parameters |
| shadow | -------- | ----------- | ------------------------- |
| `GET` | `/journal` | Fetch all journal entries | None |
| `GET` | `/journal/id/{id}` | Fetch a single journal by ID | Path variable: `id` |
| `POST` | `/journal` | Create a new journal entry | JSON: `{ "title": "...", "content": "..." }` |
| `PUT` | `/journal/id/{id}` | Update an existing journal entry | Path variable: `id`, JSON: `{ "title": "...", "content": "..." }` |
| `DELETE` | `/journal/id/{id}` | Delete a journal entry | Path variable: `id` |

---

## Tech Stack

- **Java** (JDK 17)
- **Spring Boot** (REST Controller, Dependency Injection)
- **Spring Data MongoDB** (Document Persistence)
- **MongoDB** (NoSQL Database)
- **HTML5 / CSS3 / Vanilla JavaScript** (Frontend Dashboard)
- **Maven** (Build Tool)

---

## Project Structure

```text
apiProject/
├── src/
│   ├── main/
│   │   ├── java/com/pgs/apiProject/
│   │   │   ├── controller/      # REST API Controllers (JournalController)
│   │   │   ├── entity/          # MongoDB Document Models (Journal)
│   │   │   ├── repository/      # Spring Data Repositories (JournalRepository)
│   │   │   └── service/         # Business Logic Layer (JournalService)
│   │   └── resources/
│   │       ├── static/          # Web frontend (index.html)
│   │       └── application.properties
├── index.html                   # Standalone dashboard client
├── pom.xml                      # Maven dependencies
└── README.md
```

---

## Getting Started

### Prerequisites
- Java Development Kit (JDK 17 or higher)
- MongoDB running locally on port `27017`

### Running the Application

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd apiProject/apiProject
   ```

2. Start the Spring Boot application:
   - On Linux/macOS:
     ```bash
     ./mvnw spring-boot:run
     ```
   - On Windows:
     ```cmd
     mvnw.cmd spring-boot:run
     ```

3. Access the application:
   - **Web Dashboard**: Open `http://localhost:8080/` in your browser.
   - **API Base URL**: `http://localhost:8080/journal`
