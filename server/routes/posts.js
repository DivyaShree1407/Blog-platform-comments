const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', (req, res) => {
  const posts = db.prepare(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC'
  ).all();
  res.json(posts);
});

// Get single post
router.get('/:id', (req, res) => {
  const post = db.prepare(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?'
  ).get(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Create post
router.post('/', auth, (req, res) => {
  const { title, body } = req.body;
  const result = db.prepare(
    'INSERT INTO posts (user_id, title, body) VALUES (?, ?, ?)'
  ).run(req.user.id, title, body);
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(post);
});

// Update post
router.put('/:id', auth, (req, res) => {
  const { title, body } = req.body;
  const result = db.prepare(
    'UPDATE posts SET title = ?, body = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?'
  ).run(title, body, req.params.id, req.user.id);
  if (!result.changes) return res.status(403).json({ error: 'Not authorized or post not found' });
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  res.json(post);
});

// Delete post
router.delete('/:id', auth, (req, res) => {
  const result = db.prepare(
    'DELETE FROM posts WHERE id = ? AND user_id = ?'
  ).run(req.params.id, req.user.id);
  if (!result.changes) return res.status(403).json({ error: 'Not authorized' });
  res.json({ message: 'Post deleted' });
});

module.exports = router;