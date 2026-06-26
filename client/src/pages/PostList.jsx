import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then(res => setPosts(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Latest Posts</h1>
      {posts.length === 0 && <p style={styles.empty}>No posts yet. Be the first to write one!</p>}
      {posts.map(post => (
        <div key={post.id} style={styles.card}>
          <h2 style={styles.title}>
            <Link to={`/posts/${post.id}`} style={styles.link}>{post.title}</Link>
          </h2>
          <p style={styles.meta}>By <strong>{post.username}</strong> · {new Date(post.created_at).toLocaleDateString()}</p>
          <p style={styles.preview}>{post.body.substring(0, 150)}...</p>
          <Link to={`/posts/${post.id}`} style={styles.readMore}>Read more →</Link>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { maxWidth:'700px', margin:'40px auto', padding:'0 20px' },
  heading: { fontSize:'28px', marginBottom:'24px' },
  empty: { color:'#888', textAlign:'center', marginTop:'60px' },
  card: { background:'white', padding:'24px', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', marginBottom:'20px' },
  title: { margin:'0 0 8px' },
  link: { color:'#1e1e2e', textDecoration:'none' },
  meta: { color:'#888', fontSize:'13px', marginBottom:'12px' },
  preview: { color:'#555', lineHeight:'1.6' },
  readMore: { color:'#6c63ff', textDecoration:'none', fontSize:'14px', fontWeight:'bold' }
};