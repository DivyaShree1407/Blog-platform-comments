import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>📝 BlogApp</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.username}>Hi, {user.username}</span>
            <Link to="/create" style={styles.btn}>New Post</Link>
            <button onClick={handleLogout} style={styles.btnOutline}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.btn}>Login</Link>
            <Link to="/register" style={styles.btn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px', background:'#1e1e2e', color:'white' },
  brand: { color:'white', textDecoration:'none', fontSize:'20px', fontWeight:'bold' },
  links: { display:'flex', gap:'12px', alignItems:'center' },
  username: { color:'#aaa', fontSize:'14px' },
  btn: { padding:'8px 16px', background:'#6c63ff', color:'white', borderRadius:'6px', textDecoration:'none', border:'none', cursor:'pointer', fontSize:'14px' },
  btnOutline: { padding:'8px 16px', background:'transparent', color:'white', borderRadius:'6px', border:'1px solid #555', cursor:'pointer', fontSize:'14px' }
};