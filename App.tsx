import React from 'react';
import Layout from './components/Layout';
import QRCodeTool from './components/QRCodeTool';
import SeoArticle from './components/SeoArticle';

const App: React.FC = () => {
  return (
    <Layout>
      {/* Main Container - Centralized with Zero Gravity Float Effect */}
      <div className="container mx-auto px-4 py-12 md:py-24 max-w-6xl flex flex-col items-center relative z-10 zero-gravity">
        
        {/* Hero Section - SEO Optimized H1 */}
        <header className="text-center mb-20 animate-fade-in-down w-full max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm text-cyan-400 text-sm font-semibold tracking-wide uppercase shadow-lg">
            ✨ 100% Free & Private
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] leading-tight">
            Free Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">QR Code Generator</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Create, Customize, and Download. 
            <span className="block mt-2 text-slate-400">Secure client-side generation for Wi-Fi, URLs, vCards, and more. No sign-up required.</span>
          </h2>
        </header>
        
        {/* Main Content Stack */}
        <main className="w-full flex flex-col gap-20 md:gap-32 items-center">
          {/* Tool Section - Hover effect for friendliness */}
          <div className="w-full transform transition-all hover:-translate-y-1 duration-500 hover:shadow-[0_20px_80px_-20px_rgba(14,165,233,0.3)] rounded-2xl">
            <QRCodeTool />
          </div>
          
          {/* SEO Content Section */}
          <SeoArticle />
        </main>
      </div>
    </Layout>
  );
};

export default App;