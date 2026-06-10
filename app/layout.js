export const metadata = {
  title: "Tày's Script Uploader",
  description: "Upload and get raw script links for Roblox",
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#121212', color: '#fff' }}>
        {children}
      </body>
    </html>
  )
}
