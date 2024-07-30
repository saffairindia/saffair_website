## 🛠 Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB 
- Storage: firebase storage
- Authentication: JWT and firebase
- Styling: Tailwind CSS
- State Management: Redux 

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm
- Docker and Docker Compose (for containerized setup)

### Environment Variables

Create `.env` files in both `frontend` and `api` directories. Example:

```env
# frontend/.env
NEXT_PUBLIC_API_BACKEND_URL=http://localhost:5000

# api/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/saffair 
JWT_SECRET=your_jwt_secret_here
Setup Without Docker

Clone the repository:


Setup Frontend:
cd frontend
npm install
npm satrt

Setup API:
cd api
npm install
npm start


Setup With Docker

Clone the repository:

Build and run with Docker Compose:
Copydocker-compose up --build


Access the application at http://localhost:3000
