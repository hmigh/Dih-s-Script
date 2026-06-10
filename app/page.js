'use client'
import { useState } from 'react'

export default function Home() {
  const [script, setScript] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    if (!script.trim()) return alert('Vui lòng dán script vào trước!')
    setLoading(true)
    setLink('')
    setCopied(false)
    
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
      alert('Lỗi kết nối database!')
    }
    setLoading(false)
  }

  const copyToClipboard = () => {
    if (link) {
      navigator.clipboard.writeText(`loadstring(game:HttpGet("${link}"))()`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #1a1a2e 0%, #0f0f1b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '850px', background: 'rgba(20, 20, 35, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0, 255, 136, 0.15)', borderRadius: '16px', padding: '35px', boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(0, 255, 136, 0.03)', boxSizing: 'border-box' }}>
        
        {/* Tiêu đề hiệu ứng chuyển màu RGB */}
        <h1 style={{ textAlign: 'center', margin: '0 0 30px 0', fontSize: '32px', fontWeight: '800', background: 'linear-gradient(45deg, #00ff88, #00bfff, #9932cc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Tày's Script Hub
        </h1>

        {/* Khung dán Script */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <textarea 
            placeholder="-- Dán đoạn script Lua của bạn vào đây...&#10;-- Hỗ trợ chạy mượt mà trên mọi Executor!" 
            value={script} 
            onChange={(e) => setScript(e.target.value)}
            style={{ width: '100%', height: '380px', backgroundColor: '#0b0b14', color: '#e0e0ff', border: '1px solid #252538', borderRadius: '10px', padding: '16px', fontSize: '14px', fontFamily: '"Fira Code", "Courier New", monospace', resize: 'vertical', boxSizing: 'border-box', outline: 'none', transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)' }}
            onFocus={(e) => e.target.style.borderColor = '#00ff88'}
            onBlur={(e) => e.target.style.borderColor = '#252538'}
          />
        </div>

        {/* Nút Tạo Link phát sáng */}
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          style={{ width: '100%', padding: '14px', backgroundColor: '#00ff88', color: '#05050a', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', letterSpacing: '0.5px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)', opacity: loading ? 0.7 : 1 }}
          onMouseOver={(e) => e.target.style.boxShadow = '0 6px 20px rgba(0, 255, 136, 0.5)'}
          onMouseOut={(e) => e.target.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)'}
        >
          {loading ? 'ĐANG TẠO LINK RAW...' : 'TẠO LINK SẠCH (RAW LINK)'}
        </button>

        {/* Khung kết quả khi có Link */}
        {link && (
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#0b0b14', border: '1px solid rgba(0, 191, 255, 0.3)', borderRadius: '10px', animation: 'fadeIn 0.5s ease' }}>
            <p style={{ margin: '0 0 10px 0', color: '#00bfff', fontWeight: '600', fontSize: '14px' }}>🔥 Link Loadstring của bạn đã sẵn sàng:</p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                readOnly 
                value={`loadstring(game:HttpGet("${link}"))()`} 
                onClick={(e) => e.target.select()}
                style={{ flex: 1, padding: '12px', backgroundColor: '#141423', color: '#00ff88', border: '1px solid #252538', borderRadius: '6px', fontFamily: 'monospace', fontSize: '13px', outline: 'none' }}
              />
              
              <button 
                onClick={copyToClipboard}
                style={{ padding: '0 20px', backgroundColor: copied ? '#00ff88' : '#00bfff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                {copied ? 'ĐÃ COPY! ✅' : 'COPY SCRIPT'}
              </button>
            </div>
            <small style={{ display: 'block', marginTop: '10px', color: '#666680' }}>* Bạn chỉ cần bấm "COPY SCRIPT" rồi dán thẳng vào Executor trong game là chạy luôn.</small>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
