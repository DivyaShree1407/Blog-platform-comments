📝 BlogApp — Full Stack Blogging Platform
A full-stack blogging platform where users can register, write posts, and interact through comments. Built with React, Node.js, Express, and SQLite.
![BlogApp](https://img.shields.io/badge/React-18-blue?logo=react) ![Node](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) 
<img width="932" height="917" alt="Screenshot 2026-06-26 125312" src="https://github.com/user-attachments/assets/11b62dff-5450-4070-a605-bb263c2b4c4f" />
![SQLite](https://img.shields.io/badge/Database-SQLite-lightblue?logo=sqlite) 
![License](https://img.shields.io/badge/License-MIT-yellow)
---
🌐 Live Demo
Frontend: blog-platform-comments-d1d5x1f0y-divya-shree-b-s-projects.vercel.app
Backend API: https://blog-platform-comments.onrender.com
> Replace the links above with your actual deployment URLs.
---
✨ Features
🔐 User Authentication — Register, login, and logout with JWT tokens
✍️ Create Posts — Rich post editor with word count and reading time estimator
🏷️ Tags — Add up to 5 tags per post
💬 Comments — Add and delete comments on any post
🔒 Protected Routes — Only logged-in users can create posts and comments
🗑️ Owner Controls — Only the author can edit or delete their own posts and comments
📱 Responsive Design — Works on desktop and mobile
---
🛠️ Tech Stack
Layer	Technology
Frontend	React 18, React Router v6, Axios
Backend	Node.js, Express
Database	SQLite (via better-sqlite3)
Auth	JWT (jsonwebtoken), bcryptjs
Deployment	Vercel (frontend), Render (backend)
---

🚀 Getting Started
Prerequisites
Node.js v16 or higher
Git
1. Clone the repository
```bash
git clone https://github.com/YOURUSERNAME/blog-platform.git
cd blog-platform
```
2. Set up the backend
```bash
cd server
npm install
```
Create a `.env` file inside the `server` folder:
```env
JWT_SECRET=your_long_random_secret_key_here
```
Generate a secure secret with:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Start the backend:
```bash
npm run dev
```
The server runs at `http://localhost:5000`. A `blog.db` file is created automatically on first run.
3. Set up the frontend
Open a new terminal:
```bash
cd client
npm install
npm start
```
The app opens at `http://localhost:3000`.
---
🔌 API Endpoints
Auth
Method	Endpoint	Description
POST	`/api/auth/register`	Register a new user
POST	`/api/auth/login`	Login and receive JWT token
Posts
Method	Endpoint	Auth	Description
GET	`/api/posts`	No	Get all posts
GET	`/api/posts/:id`	No	Get a single post
POST	`/api/posts`	✅ Yes	Create a new post
PUT	`/api/posts/:id`	✅ Yes	Update a post (owner only)
DELETE	`/api/posts/:id`	✅ Yes	Delete a post (owner only)
Comments
Method	Endpoint	Auth	Description
GET	`/api/posts/:id/comments`	No	Get comments for a post
POST	`/api/posts/:id/comments`	✅ Yes	Add a comment
DELETE	`/api/posts/:postId/comments/:commentId`	✅ Yes	Delete a comment (owner only)
---
🌍 Deployment
Frontend → Vercel
Push code to GitHub
Go to vercel.com → Import project
Set Root Directory to `client`
Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
Deploy
Backend → Render
Go to render.com → New Web Service
Set Root Directory to `server`
Set Start Command to `node index.js`
Add environment variable: `JWT_SECRET=your_secret`
Deploy
---
🔒 Environment Variables
Server (`server/.env`)
Variable	Description
`JWT_SECRET`	Secret key for signing JWT tokens
Client (`client/.env.production`)
Variable	Description
`REACT_APP_API_URL`	Backend API base URL for production
---

---
🛣️ Future Improvement
[ ] Rich text editor (TipTap / Quill)
[ ] Cover image upload
[ ] Like / reaction system
[ ] User profile pages
[ ] Search posts
[ ] Email notifications
[ ] Dark mode
[ ] Migrate to PostgreSQL for production
---
🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.
Fork the repository
Create your feature branch: `git checkout -b feature/my-feature`
Commit your changes: `git commit -m "add my feature"`
Push to the branch: `git push origin feature/my-feature`
Open a pull request
---




![Uploading Screenshot 2026-06-26 125312.png…]()

👤 Author
Divya Shree B
GitHub: @DivyaShree1407
Live App: blog-platform.vercel.app
---
> Built as a full-stack learning project covering REST APIs, JWT authentication, React state management, and cloud deployment.
