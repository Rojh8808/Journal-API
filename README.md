Journal REST API
A fully functional CRUD REST API built with Spring Boot and MongoDB.

Team Members
[Rojh Khadka]
[Bijaya Hayu]
[Saurav Nyapuane]
[Rikesh Shrestha]
[Nischal Gurung]

Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| GET | /journal | Get all entries |
| GET | /journal/id/{id} | Get entry by ID |
| POST | /journal | Create new entry |
| PUT | /journal/id/{id} | Update entry |
| DELETE | /journal/id/{id} | Delete entry |

How to Run
Make sure MongoDB is running locally on port 27017
Clone this repository
Run: ./mvnw spring-boot:run
API is available at http://localhost:8080

Tech Stack
Java 17
Spring Boot
Spring Data MongoDB
Maven
