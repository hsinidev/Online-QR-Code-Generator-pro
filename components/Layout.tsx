import React, { useState, useCallback, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Modal: React.FC<{ title: string; content: ReactNode; onClose: () => void }> = ({ title, content, onClose }) => (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_0_50px_rgba(76,29,149,0.5)] w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative" onClick={(e) => e.stopPropagation()}>
      
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 p-6 flex justify-between items-center z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{title}</h2>
        <button 
          onClick={onClose} 
          className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full p-2 transition-all"
          aria-label="Close Modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 md:p-10 text-slate-300 prose prose-invert prose-lg max-w-none leading-relaxed">
        {content}
      </div>

      <div className="p-6 border-t border-slate-800 bg-slate-900 sticky bottom-0 flex justify-end">
        <button onClick={onClose} className="px-8 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg transform hover:scale-105">Close</button>
      </div>
    </div>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<{ title: string; content: ReactNode } | null>(null);

  const openModal = useCallback((title: string, content: ReactNode) => {
    setModalContent({ title, content });
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);

  // Comprehensive Content definitions for Google/Legal compliance
  const modalLinks = [
    { 
      name: 'About', 
      content: (
        <div className="space-y-6">
          <p className="lead text-xl text-white">Welcome to Doodax.com — The Standard in Privacy-First QR Technology.</p>
          <p>Doodax.com is a cutting-edge web utility designed and engineered by <strong className="text-cyan-400">HSINI MOHAMED</strong>. In an era where digital privacy is constantly compromised, we founded Doodax with a clear, non-negotiable mission: to empower users with professional-grade tools that respect their data sovereignty.</p>
          
          <h3 className="text-white font-bold text-xl">The Architecture of Trust</h3>
          <p>Unlike conventional QR generators that process your data on remote servers—potentially logging your URLs, contact info, or Wi-Fi passwords—Doodax operates entirely within your browser. Utilizing advanced WebAssembly and JavaScript client-side execution, the QR codes are rendered locally on your device. This means your data never leaves your computer. It is mathematically impossible for us to see, store, or sell your input because we never receive it.</p>

          <h3 className="text-white font-bold text-xl">Why Choose Doodax?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Zero Latency:</strong> Generation happens instantly, limited only by your device's processor.</li>
            <li><strong>High Fidelity:</strong> We output production-ready PNG files suitable for professional printing on signage, business cards, and merchandise.</li>
            <li><strong>Universal Accessibility:</strong> Our tool is free, requires no sign-up, and imposes no scan limits on the static codes you create.</li>
          </ul>
        </div>
      ) 
    },
    { 
      name: 'Contact', 
      content: (
        <div className="space-y-6">
          <p>We value open communication and are dedicated to providing support for our users. If you have encountered a bug, have a feature request, or wish to discuss a business partnership, please reach out using the official channels below.</p>
          
          <div className="grid gap-6 md:grid-cols-1 mt-8">
            <div className="bg-slate-800/60 p-8 rounded-xl border border-slate-600 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Official Contact Information</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">Project Lead & Developer</p>
                  <p className="text-xl text-white font-medium">HSINI MOHAMED</p>
                </div>

                <div>
                   <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">Official Email Support</p>
                   <a href="mailto:hsini.web@gmail.com" className="text-xl text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center">
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                     hsini.web@gmail.com
                   </a>
                </div>

                <div>
                  <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-1">Website</p>
                  <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-xl text-purple-400 hover:text-purple-300 transition-colors font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    doodax.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">We aim to respond to all legitimate inquiries within 48 hours.</p>
        </div>
      ) 
    },
    { 
      name: 'Guide', 
      content: (
        <div className="space-y-8">
          <div className="bg-slate-800/40 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">Getting Started</h3>
            <p>Creating a functional QR code on Doodax is a seamless process designed for both beginners and professionals.</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Select Your Data Type</h4>
                <p className="text-slate-400">Before generating, determine the purpose of your code.
                  <ul className="list-disc pl-4 mt-2 space-y-1 text-sm">
                    <li><strong>URL:</strong> For websites, landing pages, or social media profiles.</li>
                    <li><strong>Text:</strong> For simple messages, Wi-Fi passwords, or serial numbers.</li>
                    <li><strong>Phone/Email:</strong> For creating instant contact links.</li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Input & Configuration</h4>
                <p className="text-slate-400">Enter your data into the input field. The QR code will update in real-time. 
                <br/><br/>
                <em>Pro Tip:</em> Keep your URL short. Longer URLs create denser QR codes which are harder to scan. If possible, use a URL shortener before pasting your link here.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Styling & Download</h4>
                <p className="text-slate-400">Customize the foreground and background colors to match your brand. Ensure high contrast (Dark on Light is best). Use the slider to set the resolution, then click "Download PNG" to save the asset.</p>
              </div>
            </div>
          </div>
        </div>
      ) 
    },
    { 
      name: 'Privacy Policy', 
      content: (
        <div className="space-y-6 text-slate-300">
          <div className="bg-slate-800 p-4 rounded text-sm font-mono text-cyan-400">Effective Date: October 2023 | Last Updated: January 2024</div>
          
          <p>At Doodax.com (operated by HSINI MOHAMED), we prioritize your privacy above all else. This document outlines our practices regarding data collection, usage, and protection.</p>
          
          <h4 className="text-white text-lg font-bold mt-4">1. No Server-Side Data Processing</h4>
          <p>Our unique selling proposition is privacy. When you use our QR Code Generator, the processing of your input data (URLs, text, contact info) occurs exclusively within your web browser using JavaScript. <strong>We do not send your input data to our servers.</strong> Consequently, we do not store, view, or share the content of the QR codes you generate.</p>

          <h4 className="text-white text-lg font-bold mt-4">2. Information We Collect</h4>
          <p>While we do not collect User Generated Content (UGC), we may collect standard web traffic logs including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP Addresses (anonymized where possible)</li>
            <li>Browser Type and Version</li>
            <li>Time and Date of Visit</li>
            <li>Referring Website</li>
          </ul>
          <p>This data is used solely for the purpose of maintaining the stability and security of our infrastructure.</p>

          <h4 className="text-white text-lg font-bold mt-4">3. Cookies & Local Storage</h4>
          <p>Doodax.com uses essential cookies to ensure the website functions correctly. We may use third-party analytics tools (such as Google Analytics) to understand aggregate user behavior. You possess the right to decline cookies via your browser settings.</p>

          <h4 className="text-white text-lg font-bold mt-4">4. Data Security</h4>
          <p>We employ industry-standard HTTPS encryption to ensure that the connection between your browser and our static file host is secure. However, since we do not store your generated data, there is no database of user content to breach.</p>
          
          <p className="mt-4 border-t border-slate-700 pt-4">For privacy-related concerns, contact: <strong className="text-white">hsini.web@gmail.com</strong></p>
        </div>
      ) 
    },
    { 
      name: 'Terms of Service', 
      content: (
        <div className="space-y-6 text-slate-300">
           <div className="bg-slate-800 p-4 rounded text-sm font-mono text-purple-400">Terms of Service Agreement</div>

           <p>By accessing Doodax.com, you agree to these Terms of Service. If you do not agree, do not use our services.</p>

           <h4 className="text-white text-lg font-bold mt-4">1. Usage License</h4>
           <p>HSINI MOHAMED grants you a revocable, non-exclusive, non-transferable license to use Doodax.com for personal or commercial purposes, subject to these terms. You may:</p>
           <ul className="list-disc pl-6 space-y-1">
             <li>Generate unlimited static QR codes.</li>
             <li>Use the generated images in commercial print or digital media.</li>
           </ul>

           <h4 className="text-white text-lg font-bold mt-4">2. Restrictions</h4>
           <p>You agree strictly NOT to use this service to:</p>
           <ul className="list-disc pl-6 space-y-1">
             <li>Generate QR codes linking to malware, viruses, or phishing sites.</li>
             <li>Generate QR codes linking to illegal content, hate speech, or harassment.</li>
             <li>Attempt to reverse engineer the website's source code.</li>
           </ul>

           <h4 className="text-white text-lg font-bold mt-4">3. Disclaimer of Liability</h4>
           <p>Doodax.com is provided "AS IS". HSINI MOHAMED makes no warranties regarding the reliability of the QR codes generated. It is the user's responsibility to test all codes before mass printing. We shall not be liable for any printing costs or damages resulting from non-functional codes.</p>

           <h4 className="text-white text-lg font-bold mt-4">4. Governing Law</h4>
           <p>These terms are governed by the laws of the jurisdiction in which HSINI MOHAMED resides, without regard to conflict of law principles.</p>
        </div>
      ) 
    },
    { 
      name: 'DMCA', 
      content: (
        <div className="space-y-6 text-slate-300">
          <p>Doodax.com respects the intellectual property rights of others. Since our tool generates content dynamically on the client-side and does not host user content, it is technically unlikely for us to "host" infringing material. However, we comply with the Digital Millennium Copyright Act (DMCA).</p>
          
          <h4 className="text-white text-lg font-bold mt-4">Reporting Infringement</h4>
          <p>If you believe any asset on our website infringes your copyright, please send a formal notice to <strong className="text-white">hsini.web@gmail.com</strong> including:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Identification of the copyrighted work.</li>
            <li>Identification of the infringing material on our site.</li>
            <li>Your contact information.</li>
            <li>A statement of good faith belief that the use is unauthorized.</li>
            <li>A statement under penalty of perjury that the information is accurate.</li>
          </ol>
        </div>
      ) 
    },
  ];

  return (
    <div className="min-h-screen w-full text-slate-200 font-sans selection:bg-purple-500 selection:text-white flex flex-col">
      
      <header className="py-6 w-full z-20">
        <nav className="flex flex-wrap justify-center items-center gap-2 md:gap-6 p-4 bg-slate-900/60 backdrop-blur-xl rounded-full max-w-fit mx-auto border border-white/10 shadow-2xl ring-1 ring-white/5">
          {modalLinks.map(link => (
            <button 
              key={link.name} 
              onClick={() => openModal(link.name, link.content)} 
              className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300 ease-out"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </header>

      <div className="flex-grow w-full flex flex-col relative z-10">
        {children}
      </div>

      <footer className="relative z-10 py-12 px-4 mt-20 bg-gradient-to-t from-black via-slate-900/95 to-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-8">
          
          <div className="flex flex-col items-center text-center space-y-3">
            <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-bold">Designed & Developed By</p>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-6 py-3 bg-slate-900 ring-1 ring-slate-800 rounded-lg leading-none flex items-center space-x-2">
                 <span className="text-slate-400">Powered by</span>
                 <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 hover:to-white transition-all duration-300 text-lg">
                   HSINI MOHAMED
                 </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium text-slate-500">
            <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
              GitHub
            </a>
            <a href="mailto:hsini.web@gmail.com" className="flex items-center hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email
            </a>
            <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              Doodax.com
            </a>
          </div>

          <div className="pt-8 w-full border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>&copy; {new Date().getFullYear()} Doodax. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
               <button onClick={() => openModal(modalLinks[3].name, modalLinks[3].content)} className="hover:text-cyan-400 transition-colors">Privacy Policy</button>
               <button onClick={() => openModal(modalLinks[4].name, modalLinks[4].content)} className="hover:text-cyan-400 transition-colors">Terms of Service</button>
               <button onClick={() => openModal(modalLinks[5].name, modalLinks[5].content)} className="hover:text-cyan-400 transition-colors">DMCA</button>
            </div>
          </div>
        </div>
      </footer>

      {modalContent && <Modal title={modalContent.title} content={modalContent.content} onClose={closeModal} />}
    </div>
  );
};

export default Layout;