# 📓 Journal REST API

> A fully functional CRUD REST API built with **Spring Boot** and **MongoDB**.

---

## 👥 Team Members
- Bijaya Hayu
- Saurav Nyapuane
- Rikesh Shrestha
- Nischal Gurung

---

## 🔗 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/journal` | Get all entries |
| `GET` | `/journal/id/{id}` | Get entry by ID |
| `POST` | `/journal` | Create new entry |
| `PUT` | `/journal/id/{id}` | Update entry |
| `DELETE` | `/journal/id/{id}` | Delete entry |

---

## 🚀 How to Run

1. Make sure **MongoDB** is running locally on port `27017`
2. Clone this repository
```bash
   git clone <your-repo-url>
   cd <your-repo-name>
```
3. Run the application
```bash
   ./mvnw spring-boot:run
```
4. API is available at: `http://localhost:8080`

---

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| Java | 17 |
| Spring Boot | Latest |
| Spring Data MongoDB | Latest |
| Maven | Latest |
