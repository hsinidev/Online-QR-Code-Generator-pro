
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QRCodeType, WifiData, VCardData, SmsData } from '../types';

declare var QRCode: any;

// Helper to construct QR raw data strings
const generateQRString = (type: QRCodeType, text: string, wifi: WifiData, vcard: VCardData, sms: SmsData): string => {
  switch (type) {
    case QRCodeType.URL:
    case QRCodeType.TEXT:
      return text;
    case QRCodeType.EMAIL:
      return `mailto:${text}`;
    case QRCodeType.PHONE:
      return `tel:${text}`;
    case QRCodeType.SMS:
      return `SMSTO:${sms.phone}:${sms.message}`;
    case QRCodeType.WIFI:
      return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};H:${wifi.hidden};;`;
    case QRCodeType.VCARD:
      return `BEGIN:VCARD
VERSION:3.0
N:${vcard.lastName};${vcard.firstName}
FN:${vcard.firstName} ${vcard.lastName}
ORG:${vcard.organization}
TITLE:${vcard.position}
TEL:${vcard.phone}
EMAIL:${vcard.email}
URL:${vcard.website}
ADR:;;${vcard.address}
END:VCARD`;
    default:
      return text;
  }
};

interface HistoryItem {
  id: string;
  type: QRCodeType;
  data: string; // Display label
  timestamp: number;
  fullString: string; // The actual QR content
}

const QRCodeTool: React.FC = () => {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState<QRCodeType>(QRCodeType.URL);
  
  // Data Inputs
  const [text, setText] = useState<string>('https://doodax.com');
  const [wifi, setWifi] = useState<WifiData>({ ssid: '', password: '', encryption: 'WPA', hidden: false });
  const [vcard, setVcard] = useState<VCardData>({ firstName: '', lastName: '', organization: '', position: '', phone: '', email: '', website: '', address: '' });
  const [sms, setSms] = useState<SmsData>({ phone: '', message: '' });

  // Customization
  const [fgColor, setFgColor] = useState<string>('#FFFFFF');
  const [bgColor, setBgColor] = useState<string>('#0f172a'); // Slate-900
  const [size, setSize] = useState<number>(350);
  const [logo, setLogo] = useState<string | null>(null);
  
  // App Logic
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeSection, setActiveSection] = useState<'input' | 'design'>('input');

  // Load History on Mount
  useEffect(() => {
    const saved = localStorage.getItem('doodax_qr_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const addToHistory = useCallback((type: QRCodeType, contentLabel: string, fullData: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      type,
      data: contentLabel,
      timestamp: Date.now(),
      fullString: fullData
    };
    
    setHistory(prev => {
      const updated = [newItem, ...prev.filter(i => i.fullString !== fullData)].slice(0, 5);
      localStorage.setItem('doodax_qr_history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // --- QR Generation Logic ---
  useEffect(() => {
    if (canvasRef.current && typeof QRCode !== 'undefined') {
      const qrString = generateQRString(activeTab, text, wifi, vcard, sms);
      
      // 1. Generate basic QR on Canvas
      QRCode.toCanvas(canvasRef.current, qrString || ' ', {
        width: size,
        margin: 1, // Small margin, we handle background manually for clean look
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: 'H' // High error correction allows for logos
      }, (error: Error | null) => {
        if (error) console.error(error);
        
        // 2. Draw Logo if exists
        if (logo && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = logo;
            img.onload = () => {
                if (ctx) {
                    const logoSize = size * 0.2; // 20% of QR size
                    const x = (size - logoSize) / 2;
                    const y = (size - logoSize) / 2;
                    
                    // Draw background box for logo (to ensure readability)
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
                    
                    // Draw Logo
                    ctx.drawImage(img, x, y, logoSize, logoSize);
                }
            };
        }
      });
    }
  }, [activeTab, text, wifi, vcard, sms, fgColor, bgColor, size, logo]);

  // --- Handlers ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setLogo(ev.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `doodax-qr-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
      
      // Add to history on download
      let label = text;
      if (activeTab === QRCodeType.WIFI) label = `Wi-Fi: ${wifi.ssid}`;
      if (activeTab === QRCodeType.VCARD) label = `Contact: ${vcard.firstName} ${vcard.lastName}`;
      if (activeTab === QRCodeType.SMS) label = `SMS: ${sms.phone}`;
      
      addToHistory(activeTab, label.substring(0, 20) + (label.length > 20 ? '...' : ''), generateQRString(activeTab, text, wifi, vcard, sms));
    }
  };

  const handleShare = async () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob(async (blob) => {
        if (blob && navigator.share) {
          try {
            const file = new File([blob], "qr-code.png", { type: "image/png" });
            await navigator.share({
              title: 'My Doodax QR Code',
              text: 'Created with Doodax.com',
              files: [file],
            });
          } catch (err) {
            console.error("Share failed", err);
          }
        } else {
          alert("Sharing is not supported on this device/browser.");
        }
      });
    }
  };

  const icons = {
    [QRCodeType.URL]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
    [QRCodeType.TEXT]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    [QRCodeType.EMAIL]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    [QRCodeType.PHONE]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    [QRCodeType.SMS]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />,
    [QRCodeType.WIFI]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />,
    [QRCodeType.VCARD]: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />,
  };

  return (
    <section className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        
        {/* --- LEFT: Input & Configuration --- */}
        <div className="w-full lg:w-7/12 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-800">
          
          {/* Type Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-8 gap-3 scrollbar-hide mask-gradient">
            {Object.values(QRCodeType).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  activeTab === type 
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {icons[type]}
                </svg>
                {type}
              </button>
            ))}
          </div>

          {/* Section Toggles */}
          <div className="flex gap-6 mb-6 border-b border-slate-800">
             <button 
                onClick={() => setActiveSection('input')}
                className={`pb-3 text-sm font-bold tracking-wide transition-colors ${activeSection === 'input' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
             >
               CONTENT INPUT
             </button>
             <button 
                onClick={() => setActiveSection('design')}
                className={`pb-3 text-sm font-bold tracking-wide transition-colors ${activeSection === 'design' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-500 hover:text-slate-300'}`}
             >
               DESIGN & LOGO
             </button>
          </div>

          {/* Content Inputs */}
          {activeSection === 'input' && (
            <div className="space-y-6 animate-fade-in">
              {/* URL & TEXT */}
              {(activeTab === QRCodeType.URL || activeTab === QRCodeType.TEXT || activeTab === QRCodeType.PHONE || activeTab === QRCodeType.EMAIL) && (
                 <div className="group">
                   <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
                      {activeTab === QRCodeType.URL ? 'Website URL' : activeTab === QRCodeType.PHONE ? 'Phone Number' : activeTab === QRCodeType.EMAIL ? 'Email Address' : 'Plain Text'}
                   </label>
                   <input 
                     type={activeTab === QRCodeType.URL ? 'url' : 'text'}
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                     placeholder={activeTab === QRCodeType.URL ? 'https://' : 'Enter data here...'}
                   />
                 </div>
              )}

              {/* SMS */}
              {activeTab === QRCodeType.SMS && (
                <div className="space-y-4">
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Phone Number</label>
                     <input value={sms.phone} onChange={e => setSms({...sms, phone: e.target.value})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="+1 234 567 8900" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Message</label>
                     <textarea rows={3} value={sms.message} onChange={e => setSms({...sms, message: e.target.value})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="I'm interested in your services..." />
                   </div>
                </div>
              )}

              {/* WI-FI */}
              {activeTab === QRCodeType.WIFI && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Network Name (SSID)</label>
                    <input value={wifi.ssid} onChange={e => setWifi({...wifi, ssid: e.target.value})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="MyHomeWiFi" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Password</label>
                    <input type="text" value={wifi.password} onChange={e => setWifi({...wifi, password: e.target.value})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="SecurePassword123" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Encryption</label>
                    <select value={wifi.encryption} onChange={e => setWifi({...wifi, encryption: e.target.value as any})} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" checked={wifi.hidden} onChange={e => setWifi({...wifi, hidden: e.target.checked})} className="w-5 h-5 rounded bg-slate-800 border-slate-600 text-cyan-500 focus:ring-cyan-500" />
                      <span className="ml-3 text-slate-300">Hidden Network</span>
                    </label>
                  </div>
                </div>
              )}

              {/* VCARD */}
              {activeTab === QRCodeType.VCARD && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input value={vcard.firstName} onChange={e => setVcard({...vcard, firstName: e.target.value})} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="First Name" />
                  <input value={vcard.lastName} onChange={e => setVcard({...vcard, lastName: e.target.value})} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Last Name" />
                  <input value={vcard.phone} onChange={e => setVcard({...vcard, phone: e.target.value})} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Phone" />
                  <input value={vcard.email} onChange={e => setVcard({...vcard, email: e.target.value})} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Email" />
                  <input value={vcard.organization} onChange={e => setVcard({...vcard, organization: e.target.value})} className="md:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Company / Organization" />
                  <input value={vcard.position} onChange={e => setVcard({...vcard, position: e.target.value})} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Job Title" />
                  <input value={vcard.website} onChange={e => setVcard({...vcard, website: e.target.value})} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Website" />
                  <textarea rows={2} value={vcard.address} onChange={e => setVcard({...vcard, address: e.target.value})} className="md:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Street Address" />
                </div>
              )}
            </div>
          )}

          {/* Design Inputs */}
          {activeSection === 'design' && (
            <div className="space-y-6 animate-fade-in">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Code Color</label>
                   <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-xl p-2">
                     <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent p-0" />
                     <span className="text-sm text-slate-300 font-mono">{fgColor}</span>
                   </div>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Background</label>
                   <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-xl p-2">
                     <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-none bg-transparent p-0" />
                     <span className="text-sm text-slate-300 font-mono">{bgColor}</span>
                   </div>
                 </div>
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Add Logo (Center)</label>
                  <div className="relative group">
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="bg-slate-800/50 border border-dashed border-slate-600 group-hover:border-cyan-500 rounded-xl p-4 flex items-center justify-center gap-3 transition-colors">
                       {logo ? (
                         <div className="flex items-center gap-3">
                           <img src={logo} alt="Logo" className="w-8 h-8 object-contain rounded" />
                           <span className="text-sm text-cyan-400 font-medium">Logo Uploaded (Click to change)</span>
                           <button onClick={(e) => {e.preventDefault(); setLogo(null)}} className="z-20 text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500 hover:text-white">Remove</button>
                         </div>
                       ) : (
                         <>
                           <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                           <span className="text-sm text-slate-400 group-hover:text-slate-200">Click to upload logo image</span>
                         </>
                       )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Tip: Use a square image with a transparent background. We automatically ensure high error correction so the logo doesn't break the code.</p>
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Resolution: {size}px</label>
                 <input type="range" min="200" max="1000" step="50" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
               </div>
            </div>
          )}

        </div>

        {/* --- RIGHT: Preview & Action --- */}
        <div className="w-full lg:w-5/12 bg-slate-900/50 flex flex-col relative">
          <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-12">
            
            <div className="relative group">
               {/* Glow Effect */}
               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
               
               {/* Canvas Container */}
               <div className="relative bg-white p-4 rounded-xl shadow-2xl overflow-hidden">
                 <canvas ref={canvasRef} className="w-full h-auto max-w-[280px] lg:max-w-[320px] rounded" />
               </div>
            </div>

            <div className="flex gap-3 mt-8 w-full max-w-xs">
               <button 
                 onClick={handleDownload}
                 className="flex-1 bg-white text-slate-900 hover:bg-slate-100 font-bold py-3 px-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 Download
               </button>
               <button 
                 onClick={handleShare}
                 className="bg-slate-800 text-white hover:bg-slate-700 font-semibold py-3 px-4 rounded-xl shadow-lg border border-slate-700 transform hover:-translate-y-1 transition-all"
                 title="Share Code"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
               </button>
            </div>
          </div>

          {/* Recent History Panel */}
          {history.length > 0 && (
             <div className="p-6 border-t border-slate-800 bg-slate-900/30">
               <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Recent Creations</h4>
               <div className="space-y-2">
                 {history.map(item => (
                   <div key={item.id} className="flex items-center justify-between bg-slate-800/50 p-2.5 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors group">
                     <div className="flex items-center gap-3 overflow-hidden">
                       <div className="p-1.5 bg-slate-700 rounded text-slate-300">
                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[item.type]}</svg>
                       </div>
                       <div className="flex flex-col min-w-0">
                         <span className="text-xs text-slate-300 font-medium truncate">{item.data}</span>
                         <span className="text-[10px] text-slate-500">{new Date(item.timestamp).toLocaleTimeString()}</span>
                       </div>
                     </div>
                     <button 
                       onClick={() => {
                          // Restore logic is complex because activeTab dictates visible inputs. 
                          // For simplicity in this engagement feature, we mainly allow re-download/view logic conceptually, 
                          // or just let user know this tracks what they made. 
                          // A full restore would requires mapping back all state variables.
                          alert("History is currently read-only reference.");
                       }}
                       className="text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       Info
                     </button>
                   </div>
                 ))}
               </div>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QRCodeTool;
