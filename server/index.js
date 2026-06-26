const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'blog-platform-comments-4gh5nqaeb-divya-shree-b-s-projects.vercel.app'  // ← your vercel URL
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes); // nested: /api/posts/:id/comments

app.listen(5000, () => console.log('Server running on port 5000'));