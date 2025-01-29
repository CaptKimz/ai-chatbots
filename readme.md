# Chat Knowledge Base Server

## Overview
The Chat Knowledge Base Server is a Bun-based application written in TypeScript. It serves as a central hub for managing and querying a knowledge base, supporting various routes for user interactions and data handling.

## Installation

### Prerequisites
- Bun

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/chat-knowledge-base-server.git
   cd chat-knowledge-base-server
   ```

2. **Install Dependencies**
   ```bash
   bun install
   ```

## Usage

### Running the Server
```bash
bun run dev
```

### Running in Production Mode
```bash
bun run start
```

## API Documentation

### Swagger UI
Interactive API documentation is available at `/api/docs` when the server is running.

To view the API documentation:
1. Start the server
2. Navigate to `http://localhost:3000/api/docs` in your browser
3. Explore the available endpoints, request/response schemas, and try out the API directly from the Swagger UI

### Users Endpoints
- **GET /api/users**
  - Retrieve a list of users.
- **POST /api/users**
  - Create a new user.
- **GET /api/users/:id**
  - Retrieve a user by ID.
- **PUT /api/users/:id**
  - Update a user by ID.
- **DELETE /api/users/:id**
  - Delete a user by ID.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
