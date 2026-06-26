import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const handleTag = (e) => {
    if (e.key !== 'Enter') return;
    const val = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (val && !tags.includes(val) && tags.length < 5) {
      setTags([...tags, val]);
    }
    setTagInput('');
  };

  const handlePublish = async () => {
    if (!title.trim() || !body.trim()) return setError('Title and body are required.');
    try {
      const res = await api.post('/posts', { title, body, tags: tags.join(',') });
      navigate(`/posts/${res.data.id}`);
    } catch {
      setError('Failed to publish. Make sure you are logged in.');
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <p style={s.label}>New post</p>
        <textarea style={s.titleInput} rows={1} placeholder="Your post title…"
          value={title} onChange={e => setTitle(e.target.value)} />
        <div style={s.divider} />

        {/* Toolbar */}
        <div style={s.toolbar}>
          {['ti-bold','ti-italic','ti-underline','ti-heading','ti-quote','ti-code','ti-list','ti-link','ti-photo'].map(icon => (
            <button key={icon} style={s.tbBtn} title={icon.replace('ti-','')}>
              <i className={`ti ${icon}`} />
            </button>
          ))}
        </div>

        <textarea style={s.bodyInput} rows={12} placeholder="Write something worth reading…"
          value={body} onChange={e => setBody(e.target.value)} />
        <p style={s.charCount}>{wordCount} {wordCount === 1 ? 'word' : 'words'}</p>

        <div style={s.divider} />
        <p style={{...s.label, marginTop:'12px'}}>Tags</p>
        <input style={s.tagInput} placeholder="Add a tag and press Enter…"
          value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTag} />
        <div style={s.chips}>
          {tags.map((t, i) => (
            <span key={t} style={s.chip}>
              #{t} <span style={s.chipX} onClick={() => setTags(tags.filter((_,j)=>j!==i))}>✕</span>
            </span>
          ))}
        </div>

        {error && <p style={s.error}>{error}</p>}

        <div style={s.footer}>
          <span style={s.readTime}>
            <i className="ti ti-clock" /> {wordCount > 0 ? `Estimated read: ${readTime} min` : 'Estimated read: —'}
          </span>
          <div style={{display:'flex', gap:'8px'}}>
            <button style={s.btn} onClick={() => navigate('/')}>Cancel</button>
            <button style={s.btnPrimary} onClick={handlePublish}>Publish post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { maxWidth:'760px', margin:'0 auto', padding:'2rem 1rem' },
  card: { background:'white', border:'1px solid #eee', borderRadius:'12px', padding:'2rem' },
  label: { fontSize:'11px', fontWeight:'600', letterSpacing:'.08em', color:'#999', textTransform:'uppercase', marginBottom:'10px' },
  titleInput: { width:'100%', border:'none', outline:'none', fontSize:'26px', fontWeight:'600', color:'#1a1a1a', background:'transparent', resize:'none', fontFamily:'inherit', marginBottom:'1rem' },
  divider: { height:'1px', background:'#f0f0f0', margin:'1rem 0' },
  toolbar: { display:'flex', gap:'4px', flexWrap:'wrap', marginBottom:'12px' },
  tbBtn: { width:'32px', height:'32px', border:'1px solid #eee', background:'#fafafa', borderRadius:'6px', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center', color:'#666' },
  bodyInput: { width:'100%', minHeight:'240px', border:'none', outline:'none', fontSize:'16px', lineHeight:'1.8', color:'#333', background:'transparent', resize:'none', fontFamily:'inherit' },
  charCount: { fontSize:'12px', color:'#bbb', textAlign:'right', marginTop:'4px' },
  tagInput: { width:'100%', padding:'8px 12px', border:'1px solid #eee', borderRadius:'8px', fontSize:'14px', outline:'none', fontFamily:'inherit' },
  chips: { display:'flex', gap:'6px', flexWrap:'wrap', marginTop:'10px' },
  chip: { display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 10px', background:'#eff6ff', color:'#2563eb', borderRadius:'20px', fontSize:'12px', fontWeight:'500' },
  chipX: { cursor:'pointer', opacity:'.7', fontSize:'11px' },
  error: { color:'#ef4444', fontSize:'13px', marginTop:'12px' },
  footer: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1.5rem', flexWrap:'wrap', gap:'12px' },
  readTime: { fontSize:'13px', color:'#999', display:'flex', alignItems:'center', gap:'6px' },
  btn: { padding:'9px 20px', borderRadius:'8px', fontSize:'14px', cursor:'pointer', border:'1px solid #ddd', background:'white', fontFamily:'inherit' },
  btnPrimary: { padding:'9px 20px', borderRadius:'8px', fontSize:'14px', cursor:'pointer', border:'none', background:'#6c63ff', color:'white', fontFamily:'inherit', fontWeight:'500' },
};