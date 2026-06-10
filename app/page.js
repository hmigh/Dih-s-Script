'use client'
import { useState } from 'react'

export default function Home() {
  const [script, setScript] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!script.trim()) return alert('Vui lòng dán script vào trước!')
    setLoading(true)
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: script })
      })
      const data = await res.json()
      if (data.id) {
        setLink(`${window.location.origin}/raw/${data.id}`)
      } else {
        alert('Có lỗi xảy ra khi tạo link!')
      }
    } catch (e) {
      alert('Lỗi kết nối!')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#00ff88' }}>Tày's Script Uploader</h1>
      <textarea 
        placeholder="Dán đoạn script Lua của bạn vào đây..." 
        value={script} 
        onChange={(e) => setScript(e.target.value)}
        style={{ width: '100%', height: '350px', backgroundColor: '#1e1e1e', color: '#fff', border: '1px solid #333', borderRadius: '6px', padding: '12px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical' }}
      />
      <button 
        onClick={handleSubmit} 
        disabled={loading}
        style={{ width: '100%', padding: '12px', marginTop: '15px', backgroundColor: '#00ff88', color: '#000', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        {loading ? 'Đang tạo link...' : 'TẠO LINK RAW'}
      </button>

      {link && (
        <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#1e1e1e', border: '1px solid #00ff88', borderRadius: '6px' }}>
          <p style={{ margin: '0 0 8px 0', color: '#00ff88' }}>Link Raw của bạn (Dùng cho game:HttpGet):</p>
          <input 
            type="text" 
            readOnly 
            value={link} 
            onClick={(e) => e.target.select()}
            style={{ width: '100%', padding: '8px', backgroundColor: '#121212', color: '#fff', border: '1px solid #333', borderRadius: '4px', fontFamily: 'monospace' }}
          />
        </div>
      )}
    </div>
  )
}
