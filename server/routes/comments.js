const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get comments for a post
router.get('/:id/comments', (req, res) => {
  const comments = db.prepare(
    'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ? ORDER BY created_at ASC'
  ).all(req.params.id);
  res.json(comments);
});

// Add comment
router.post('/:id/comments', auth, (req, res) => {
  const { body } = req.body;
  const result = db.prepare(
    'INSERT INTO comments (post_id, user_id, body) VALUES (?, ?, ?)'
  ).run(req.params.id, req.user.id, body);
  const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(comment);
});

// Delete comment
router.delete('/:postId/comments/:commentId', auth, (req, res) => {
  const result = db.prepare(
    'DELETE FROM comments WHERE id = ? AND user_id = ?'
  ).run(req.params.commentId, req.user.id);
  if (!result.changes) return res.status(403).json({ error: 'Not authorized' });
  res.json({ message: 'Comment deleted' });
});

module.exports = router;