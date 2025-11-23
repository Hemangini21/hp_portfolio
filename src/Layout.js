import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&display=swap');
          body {
            font-family: 'Georgia', serif;
            background-color: #000;
            color: #fff;
          }
        `}
      </style>
      <div className="font-georgia">
        {/* Advanced Spline 3D Background */}
        <div className="fixed top-0 left-0 w-full h-full z-0">
          <iframe
            src='https://my.spline.design/untitled-c1081f7275f93638c1c03c54c8ab0ccb/'
            frameBorder='0'
            width='100%'
            height='100%'
            loading="lazy"
            title="3D Background Animation"
            style={{ pointerEvents: 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
          
          {/* Custom watermark */}
          <div className="absolute bottom-5 right-4 z-10 bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-6 py-3 rounded-lg border border-white/10">
            Hemangini Patel
          </div>
        </div>
        
        {/* Main content, scrolls over the background */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}