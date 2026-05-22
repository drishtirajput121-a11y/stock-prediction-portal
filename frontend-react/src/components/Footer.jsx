import React from 'react'

const Footer = () => {
  return (
    <footer className='footer mt-auto py-4 text-center' style={{
      background: 'rgba(11, 9, 10, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <p className='text-light mb-0' style={{ fontSize: '0.9rem', opacity: 0.7 }}>© 2026 Build with ❤ by <a href="https://www.linkedin.com/in/drishti-rajput-181790316/" class="text-light" >Drishti Rajput</a></p>
    </footer>
  )
}

export default Footer