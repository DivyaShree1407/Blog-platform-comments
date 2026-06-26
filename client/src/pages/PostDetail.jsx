import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Avatar({ name, size = 36, color = '#eff6ff', textColor = '#2563eb' }) {
  const initials = name ? name.slice(0, 2).toUpperCase() : '??';
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', background:color,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:size*0.35, fontWeight:'600', color:textColor, flexShrink:0 }}>
      {initials}
    </div>
  );
}

const COLORS = [
  ['#eff6ff','#2563eb'], ['#f0fdf4','#16a34a'],
  ['#fefce8','#ca8a04'], ['#fdf4ff','#9333ea'],
];

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState({});

  useEffect(() => {
    api.get(`/posts/${id}`).then(r => setPost(r.data));
    api.get(`/posts/${id}/comments`).then(r => setComments(r.data));
  }, [id]);

  const deletePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete(`/posts/${id}`);
    navigate('/');
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    const res = await api.post(`/posts/${id}/comments`, { body: newComment });
    setComments([...comments, { ...res.data, username: user.username }]);
    setNewComment('');
  };

  const deleteComment = async (commentId) => {
    await api.delete(`/posts/${id}/comments/${commentId}`);
    setComments(comments.filter(c => c.id !== commentId));
  };

  const toggleLike = (commentId) => {
    setLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const timeAgo = (date) => {
    const diff = (Date.now() - new Date(date)) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  };

  if (!post) return <p style={{textAlign:'center',marginTop:'80px',color:'#999'}}>Loading…</p>;

  const wordCount = post.body.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <div style={s.page}>
      {/* Post */}
      <div style={s.card}>
        <div style={s.postMeta}>
          <Avatar name={post.username} size={40} />
          <div>
            <p style={s.authorName}>{post.username}</p>
            <p style={s.postInfo}>{timeAgo(post.created_at)} · {readTime} min read · {wordCount} words</p>
          </div>
          {user?.id === post.user_id && (
            <div style={{marginLeft:'auto', display:'flex', gap:'8px'}}>
              <Link to={`/edit/${post.id}`} style={s.editBtn}>
                <i className="ti ti-edit" /> Edit
              </Link>
              <button onClick={deletePost} style={s.deleteBtn}>
                <i className="ti ti-trash" /> Delete
              </button>
            </div>
          )}
        </div>

        <h1 style={s.postTitle}>{post.title}</h1>
        <div style={s.divider} />
        <p style={s.postBody}>{post.body}</p>
      </div>

      {/* Comments */}
      <div style={s.card}>
        <div style={s.commentsHeader}>
          <span style={s.commentsTitle}>Comments</span>
          <span style={s.countBadge}>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
        </div>

        {/* Compose */}
        {user ? (
          <div style={s.compose}>
            <Avatar name={user.username} size={36} />
            <div style={{flex:1}}>
              <textarea style={s.composeTextarea} rows={3}
                placeholder="Share your thoughts…"
                value={newComment} onChange={e => setNewComment(e.target.value)} />
              <div style={s.composeFooter}>
                <span style={s.composeHint}>Be kind and constructive.</span>
                <button style={s.btnPrimary} onClick={addComment}>Post comment</button>
              </div>
            </div>
          </div>
        ) : (
          <p style={s.loginPrompt}>
            <Link to="/login" style={{color:'#6c63ff'}}>Log in</Link> to leave a comment.
          </p>
        )}

        {/* List */}
        <div style={s.commentList}>
          {comments.length === 0 && (
            <p style={{textAlign:'center', color:'#bbb', padding:'2rem 0', fontSize:'14px'}}>
              No comments yet. Be the first!
            </p>
          )}
          {comments.map((c, i) => {
            const [bg, tc] = COLORS[i % COLORS.length];
            const liked = likes[c.id];
            return (
              <div key={c.id} style={s.commentItem}>
                <Avatar name={c.username} size={32} color={bg} textColor={tc} />
                <div style={{flex:1}}>
                  <div style={s.commentMeta}>
                    <span style={s.commentAuthor}>{c.username}</span>
                    {user?.id === c.user_id && (
                      <span style={s.youBadge}>You</span>
                    )}
                    <span style={s.commentTime}>{timeAgo(c.created_at)}</span>
                  </div>
                  <p style={s.commentBody}>{c.body}</p>
                  <div style={s.commentActions}>
                    <button style={{...s.actionBtn, color: liked ? '#6c63ff' : '#bbb'}}
                      onClick={() => toggleLike(c.id)}>
                      <i className={liked ? 'ti ti-heart-filled' : 'ti ti-heart'} /> {liked ? 1 : 0}
                    </button>
                    {user?.id === c.user_id && (
                      <button style={{...s.actionBtn, color:'#ef4444'}}
                        onClick={() => deleteComment(c.id)}>
                        <i className="ti ti-trash" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { maxWidth:'760px', margin:'0 auto', padding:'2rem 1rem 4rem' },
  card: { background:'white', border:'1px solid #eee', borderRadius:'12px', padding:'2rem', marginBottom:'1.5rem' },
  divider: { height:'1px', background:'#f0f0f0', margin:'1.25rem 0' },
  postMeta: { display:'flex', alignItems:'center', gap:'12px', marginBottom:'1.25rem' },
  authorName: { fontSize:'15px', fontWeight:'600', color:'#1a1a1a' },
  postInfo: { fontSize:'13px', color:'#999', marginTop:'2px' },
  editBtn: { padding:'7px 14px', background:'#f5f5ff', color:'#6c63ff', borderRadius:'8px', textDecoration:'none', fontSize:'13px', display:'flex', alignItems:'center', gap:'4px' },
  deleteBtn: { padding:'7px 14px', background:'#fff5f5', color:'#ef4444', borderRadius:'8px', border:'none', cursor:'pointer', fontSize:'13px', display:'flex', alignItems:'center', gap:'4px', fontFamily:'inherit' },
  postTitle: { fontSize:'28px', fontWeight:'700', lineHeight:'1.3', color:'#1a1a1a', marginBottom:'0' },
  postBody: { fontSize:'16px', lineHeight:'1.9', color:'#444', whiteSpace:'pre-wrap' },
  commentsHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' },
  commentsTitle: { fontSize:'18px', fontWeight:'600' },
  countBadge: { fontSize:'13px', color:'#999', background:'#f5f5f5', border:'1px solid #eee', borderRadius:'20px', padding:'2px 10px' },
  compose: { display:'flex', gap:'12px', marginBottom:'1.5rem' },
  composeTextarea: { width:'100%', padding:'10px 14px', border:'1px solid #eee', borderRadius:'8px', background:'#fafafa', fontSize:'14px', lineHeight:'1.6', resize:'none', fontFamily:'inherit', outline:'none' },
  composeFooter: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'8px' },
  composeHint: { fontSize:'12px', color:'#bbb' },
  btnPrimary: { padding:'8px 18px', borderRadius:'8px', fontSize:'13px', fontWeight:'500', cursor:'pointer', border:'none', background:'#6c63ff', color:'white', fontFamily:'inherit' },
  loginPrompt: { fontSize:'14px', color:'#999', marginBottom:'1.5rem' },
  commentList: { borderTop:'1px solid #f0f0f0', paddingTop:'0.5rem' },
  commentItem: { display:'flex', gap:'12px', padding:'1rem 0', borderBottom:'1px solid #f9f9f9' },
  commentMeta: { display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' },
  commentAuthor: { fontSize:'14px', fontWeight:'600', color:'#1a1a1a' },
  youBadge: { fontSize:'11px', padding:'2px 7px', background:'#f5f0ff', color:'#7c3aed', borderRadius:'20px', fontWeight:'500' },
  commentTime: { fontSize:'12px', color:'#bbb' },
  commentBody: { fontSize:'14px', lineHeight:'1.7', color:'#555' },
  commentActions: { display:'flex', gap:'12px', marginTop:'8px' },
  actionBtn: { background:'none', border:'none', fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', padding:'0', fontFamily:'inherit' },
};