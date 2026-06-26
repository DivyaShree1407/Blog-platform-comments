import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Email" type="email"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input style={styles.input} placeholder="Password" type="password"
          value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button style={styles.btn} onClick={handleSubmit}>Login</button>
        <p style={styles.link}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', minHeight:'80vh' },
  card: { background:'white', padding:'40px', borderRadius:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', width:'360px', display:'flex', flexDirection:'column', gap:'12px' },
  title: { textAlign:'center', marginBottom:'8px' },
  input: { padding:'12px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'14px' },
  btn: { padding:'12px', background:'#6c63ff', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', cursor:'pointer' },
  error: { color:'red', fontSize:'13px', textAlign:'center' },
  link: { textAlign:'center', fontSize:'13px' }
};