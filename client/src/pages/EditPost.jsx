import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

export default function EditPost() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setForm({ title: res.data.title, body: res.data.body }));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/posts/${id}`, form);
    navigate(`/posts/${id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Edit Post</h2>
        <input style={styles.input} placeholder="Post title"
          value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <textarea style={styles.textarea} rows={10} placeholder="Write your post..."
          value={form.body} onChange={e => setForm({...form, body: e.target.value})} required />
        <button style={styles.btn} onClick={handleSubmit}>Update Post</button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth:'700px', margin:'40px auto', padding:'0 20px' },
  card: { background:'white', padding:'32px', borderRadius:'12px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', display:'flex', flexDirection:'column', gap:'16px' },
  input: { padding:'12px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'16px' },
  textarea: { padding:'12px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'15px', resize:'vertical' },
  btn: { padding:'12px', background:'#6c63ff', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer' },
};