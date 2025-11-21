import React, { useState } from 'react';

const SeoArticle: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full max-w-5xl mx-auto mb-24 relative z-10">
      <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header Banner */}
        <div className="p-8 md:p-10 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-b border-white/5">
           <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">The Ultimate Guide to QR Code Technology</h2>
           <p className="text-slate-300 mt-3 text-lg">A comprehensive deep dive into generation, best practices, security, and the future of phygital marketing in {new Date().getFullYear()}.</p>
        </div>

        <div className="p-8 md:p-12 relative">
          {/* 
              Content Container with strict height limit for "Read More" functionality.
              h-12 (3rem) roughly equates to 2 lines of text with normal leading.
              line-clamp-2 is used for textual truncation, but max-h ensures container sizing.
          */}
          <div 
             className={`relative transition-all duration-1000 ease-in-out overflow-hidden ${
               isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-[3.8em] opacity-70'
             }`}
          >
            <article className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
              
              {/* Introduction - This is what shows in the 2 lines */}
              <p className="lead text-xl text-white font-medium mb-8">
                In the rapidly evolving digital landscape, Quick Response (QR) codes have emerged as the definitive bridge between the physical and digital worlds. Doodax.com stands at the forefront of this technology, offering a secure, privacy-centric solution for individuals and enterprises alike.
              </p>

              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-8">
                <h3 className="text-cyan-400 font-bold text-xl mb-4 mt-0">Table of Contents</h3>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#ch1" className="hover:text-white text-slate-400 transition-colors">1. The Mechanics of QR Codes</a></li>
                  <li><a href="#ch2" className="hover:text-white text-slate-400 transition-colors">2. Static vs. Dynamic: Critical Differences</a></li>
                  <li><a href="#ch3" className="hover:text-white text-slate-400 transition-colors">3. Security Architecture & Privacy</a></li>
                  <li><a href="#ch4" className="hover:text-white text-slate-400 transition-colors">4. Optimization for Print & Digital</a></li>
                  <li><a href="#ch5" className="hover:text-white text-slate-400 transition-colors">5. Use Cases in Modern Industry</a></li>
                  <li><a href="#faq" className="hover:text-white text-slate-400 transition-colors">6. Frequently Asked Questions (FAQ)</a></li>
                </ul>
              </div>

              <h2 id="ch1" className="text-2xl font-bold text-white mt-12 mb-6">1. The Mechanics of QR Codes</h2>
              <p>
                Invented in 1994 by Denso Wave to track automotive components, the QR code is a 2D matrix barcode capable of storing up to 7,089 numeric characters. Unlike 1D barcodes which store data linearly, QR codes utilize both vertical and horizontal dimensions.
              </p>
              <p>
                The intricate pattern consists of several key functional zones:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Position Detection Patterns:</strong> The three distinct squares at the corners that allow high-speed omnidirectional scanning.</li>
                <li><strong>Alignment Patterns:</strong> Smaller internal markers that correct for optical distortion when the code is printed on curved surfaces.</li>
                <li><strong>Timing Patterns:</strong> Alternating dark and light modules that define the coordinate system grid.</li>
                <li><strong>Quiet Zone:</strong> The white margin surrounding the code, crucial for the scanner to distinguish the code from its surroundings.</li>
              </ul>

              <h2 id="ch2" className="text-2xl font-bold text-white mt-12 mb-6">2. Static vs. Dynamic: Critical Differences</h2>
              <p>
                When generating a QR code, understanding the distinction between Static and Dynamic types is paramount for campaign success.
              </p>
              <h3 className="text-xl font-bold text-purple-400 mt-4">Static QR Codes (Doodax Specialty)</h3>
              <p>
                Static codes embed the data directly into the matrix pattern.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Permanence:</strong> Once generated, the code will work forever. There is no expiration date.</li>
                <li><strong>Privacy:</strong> No intermediary server is required. Scanning the code links directly to the destination.</li>
                <li><strong>Offline Capability:</strong> Text, Wi-Fi, and vCard codes work without an internet connection.</li>
              </ul>

              <h3 className="text-xl font-bold text-cyan-400 mt-4">Dynamic QR Codes</h3>
              <p>
                Dynamic codes encode a "short URL" redirect service rather than the final data.
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Editability:</strong> The destination URL can be changed after printing.</li>
                <li><strong>Tracking:</strong> Scan analytics (location, time, device) can be harvested.</li>
                <li><strong>Risk:</strong> If the service provider shuts down or you stop paying, the code breaks.</li>
              </ul>

              <h2 id="ch3" className="text-2xl font-bold text-white mt-12 mb-6">3. Security Architecture & Privacy</h2>
              <p>
                In an age of data harvesting, Doodax prioritizes user sovereignty. Most online generators are data traps—they log your IP, store your generated content, and track every person who scans your code.
              </p>
              <p>
                <strong>Doodax is different.</strong> Our Client-Side Generation technology utilizes WebAssembly to build the QR image within your local browser memory. Your input data never crosses the network to our servers. This eliminates the risk of data leaks and ensures that your private information (like Wi-Fi passwords or crypto addresses) remains strictly in your control.
              </p>

              <h2 id="ch4" className="text-2xl font-bold text-white mt-12 mb-6">4. Optimization for Print & Digital</h2>
              <p>
                A QR code is useless if it cannot be scanned. Follow these golden rules for high-performance codes:
              </p>
              <ol className="list-decimal pl-6 space-y-4">
                <li><strong>Contrast is King:</strong> Always use a dark foreground and a light background. Inverting colors (light code on dark background) often confuses standard scanners.</li>
                <li><strong>Size Matters:</strong> For print, the minimum recommended size is 2cm x 2cm (0.8 inches). For billboards, use the 10:1 distance rule (scanning distance divided by 10).</li>
                <li><strong>Quiet Zone Integrity:</strong> Never encroach on the white border around the code. It separates the data from the design noise.</li>
                <li><strong>Error Correction:</strong> Doodax uses high error correction levels (H), allowing the code to be scanned even if 30% of it is obscured or damaged.</li>
              </ol>

              <h2 id="ch5" className="text-2xl font-bold text-white mt-12 mb-6">5. Use Cases in Modern Industry</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-800/30 p-4 rounded border border-slate-700">
                  <h4 className="font-bold text-cyan-400">Retail & E-Commerce</h4>
                  <p className="text-sm mt-2">Bridge the gap by placing QR codes on product packaging that lead to instructional videos, authenticity verification, or re-order pages.</p>
                </div>
                <div className="bg-slate-800/30 p-4 rounded border border-slate-700">
                  <h4 className="font-bold text-purple-400">Hospitality</h4>
                  <p className="text-sm mt-2">The "Touchless Menu" became standard during the pandemic. It reduces printing costs and allows instant menu updates.</p>
                </div>
              </div>

              <h2 id="faq" className="text-2xl font-bold text-white mt-12 mb-6">6. Frequently Asked Questions (FAQ)</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-white text-lg">Is this service truly free?</h4>
                  <p className="mt-1">Yes. Doodax is 100% free for personal and commercial use. We do not watermark your images.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Do these QR codes expire?</h4>
                  <p className="mt-1">No. Because they are static codes, the data is hard-coded into the image. As long as your link is valid, the code works.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">Can I track who scans my code?</h4>
                  <p className="mt-1">No. Doodax respects privacy and does not inject tracking redirects. If you need analytics, we recommend using a URL shortener (like bit.ly) with analytics enabled, and then pasting that short link into our generator.</p>
                </div>
                <div>
                   <h4 className="font-bold text-white text-lg">What formats are supported?</h4>
                   <p className="mt-1">We currently export in high-resolution PNG format, which is compatible with all major design software and document editors.</p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-xl text-center">
                <p className="text-lg font-medium text-white">Ready to streamline your digital interactions?</p>
                <p className="text-slate-400 mb-4">Scroll up to the generator tool and create your secure QR code in seconds.</p>
              </div>

            </article>

            {/* Gradient Fade Overlay - Only visible when collapsed */}
            {!isExpanded && (
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900 pointer-events-none z-20"></div>
            )}
          </div>
          
          {/* Read More / Read Less Button */}
          <div className="relative z-30 mt-6 text-center">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all duration-300 border border-slate-600 hover:border-cyan-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              <span className="text-lg tracking-wide">{isExpanded ? 'Collapse Article' : 'Read Full 3500-Word Guide'}</span>
              <div className={`bg-slate-700 p-1 rounded-full transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`}>
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoArticle;