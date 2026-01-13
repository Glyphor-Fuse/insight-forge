import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LuSparkles, LuZap, LuLayoutDashboard, LuRefreshCw } from 'react-icons/lu';
import { Reveal } from '../components/motion/Reveal';
import { SignatureEffect } from '../components/effects/SignatureEffect';
import { SignatureInteraction } from '../components/effects/SignatureInteraction';

// --- Styles & Types ---

const COLORS = {
  bgRail: '#050505',
  bgMain: '#0a0a0a',
  cardBg: 'rgba(255, 255, 255, 0.03)',
  textPrimary: '#ffffff',
  textSecondary: '#888888',
  accent: '#00f0ff',
  accentDim: 'rgba(0, 240, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.1)',
};

const FONTS = {
  body: "'Inter', sans-serif",
  heading: "'Space Grotesk', sans-serif",
};

// --- Components ---

const NavItem = ({ 
  label, 
  target, 
  active, 
  onClick 
}: { 
  label: string; 
  target: string; 
  active: boolean; 
  onClick: () => void; 
}) => (
  <li 
    onClick={onClick}
    className={`
      relative pl-4 cursor-pointer text-[0.9rem] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${active ? 'text-white translate-x-[5px]' : 'text-[#888888] hover:text-white hover:translate-x-[5px]'}
    `}
    style={{ fontFamily: FONTS.heading }}
  >
    <span 
      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#00f0ff] transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
    />
    {label}
  </li>
);

const Card = ({ icon: Icon, title, desc }: { icon: React.ElementType, title: string, desc: string }) => (
  <SignatureInteraction type="hover" className="bg-white/5 border border-white/10 p-10 rounded-[4px] relative overflow-hidden transition-colors duration-300">
    <div className="text-[2rem] mb-6 text-[#00f0ff] font-light">
      <Icon />
    </div>
    <h3 className="text-[1.5rem] mb-4 font-medium" style={{ fontFamily: FONTS.heading }}>{title}</h3>
    <p className="text-[#888888] leading-relaxed">{desc}</p>
  </SignatureInteraction>
);

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col">
    <h4 className="text-[4rem] text-[#00f0ff] leading-none mb-2" style={{ fontFamily: FONTS.heading }}>{value}</h4>
    <span className="text-[#888888] uppercase tracking-[0.1em] text-[0.8rem]">{label}</span>
  </div>
);

export default function Index() {
  const [activeSection, setActiveSection] = useState('overview');

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'capabilities', 'analytics', 'security'];
      let current = '';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section is in the upper third of the viewport
          if (rect.top <= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans">
      {/* Global Styles for Fonts & Resets */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Space+Grotesk:wght@300;500;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .gradient-text {
          background: linear-gradient(90deg, #fff, #888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(0, 255, 136, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
        }
        .status-dot {
          animation: pulse 2s infinite;
        }
      `}</style>

      {/* RAIL NAVIGATION */}
      <aside className="w-full lg:w-[280px] lg:h-screen bg-[#050505] border-b lg:border-b-0 lg:border-r border-white/10 fixed lg:left-0 lg:top-0 flex flex-row lg:flex-col justify-between p-6 lg:p-10 z-50 transition-transform duration-300">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[1.5rem] font-bold tracking-tight" style={{ fontFamily: FONTS.heading }}>
            <span className="text-[#00f0ff]">//</span> METRIC
          </div>
          
          <ul className="hidden lg:flex flex-col gap-6 mt-16">
            <NavItem label="01. Overview" target="overview" active={activeSection === 'overview'} onClick={() => scrollTo('overview')} />
            <NavItem label="02. Capabilities" target="capabilities" active={activeSection === 'capabilities'} onClick={() => scrollTo('capabilities')} />
            <NavItem label="03. Analytics" target="analytics" active={activeSection === 'analytics'} onClick={() => scrollTo('analytics')} />
            <NavItem label="04. Security" target="security" active={activeSection === 'security'} onClick={() => scrollTo('security')} />
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="hidden lg:flex items-center text-[0.75rem] text-[#888888]">
            <span className="inline-block w-2 h-2 bg-[#00ff88] rounded-full mr-2 shadow-[0_0_10px_rgba(0,255,136,0.4)] status-dot"></span>
            Systems Operational
          </div>
          <motion.button 
            whileHover={{ y: -2, boxShadow: '0 10px 20px -5px rgba(0, 240, 255, 0.1)' }}
            className="bg-white text-[#050505] border-none p-4 font-semibold cursor-pointer uppercase tracking-[0.05em] text-[0.8rem] transition-all duration-300 hover:bg-[#00f0ff]"
            style={{ fontFamily: FONTS.heading }}
          >
            Start Trial
          </motion.button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="w-full lg:ml-[280px] lg:w-[calc(100%-280px)] relative">
        
        {/* SECTION 1: HERO */}
        <section id="overview" className="min-h-screen p-8 lg:p-24 flex flex-col justify-center border-b border-white/10 relative">
          <SignatureEffect effect="hero-viz" />
          <Reveal>
            <p className="text-[#00f0ff] tracking-[0.1em] uppercase mb-4 font-medium">Enterprise Intelligence</p>
            <h1 className="text-[3.5rem] lg:text-[clamp(3rem,6vw,6rem)] leading-[0.95] font-light mb-8 tracking-tight" style={{ fontFamily: FONTS.heading }}>
              Clarify the <br />
              <strong className="font-bold gradient-text block">Absolute Chaos.</strong>
            </h1>
            <p className="text-[1.25rem] text-[#888888] max-w-[600px] leading-relaxed mb-12">
              Metric transforms disparate data lakes into actionable decision velocity. 
              Stop guessing. Start knowing. An analytics platform built for the executive cortex.
            </p>
            <motion.button 
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="bg-transparent border border-white text-white py-4 px-8 uppercase tracking-[0.05em] text-[0.8rem] font-semibold cursor-pointer transition-all"
              style={{ fontFamily: FONTS.heading }}
            >
              Watch The Demo
            </motion.button>
          </Reveal>
        </section>

        {/* SECTION 2: CAPABILITIES */}
        <section id="capabilities" className="min-h-screen p-8 lg:p-24 flex flex-col justify-center border-b border-white/10 relative">
          <Reveal>
            <h2 className="text-[3rem] mb-8 font-medium" style={{ fontFamily: FONTS.heading }}>
              Orchestrate <br /><span className="text-[#888888]">Every Signal.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
              <Card 
                icon={LuSparkles} 
                title="Predictive Modeling" 
                desc="Our proprietary AI engine, Cortex-9, analyzes historical trends to forecast market shifts with 94.3% accuracy. See the future before it renders."
              />
              <Card 
                icon={LuZap} 
                title="Real-Time Pipelines" 
                desc="Latency is the enemy of profit. Ingest millions of rows per second with zero-drag infrastructure designed for high-frequency environments."
              />
              <Card 
                icon={LuLayoutDashboard} 
                title="Unified Dashboarding" 
                desc="Drag, drop, and drill down. Create glass-panel interfaces that synthesize marketing, sales, and product data into a single source of truth."
              />
              <Card 
                icon={LuRefreshCw} 
                title="Automated Sync" 
                desc="Two-way write-back to your warehouse. Metric doesn't just read your data; it cleans, enriches, and returns it better than it found it."
              />
            </div>
          </Reveal>
        </section>

        {/* SECTION 3: ANALYTICS */}
        <section 
          id="analytics" 
          className="min-h-screen p-8 lg:p-24 flex flex-col justify-center border-b border-white/10 relative"
          style={{ background: 'radial-gradient(circle at 80% 50%, #111, #0a0a0a)' }}
        >
          <Reveal>
            <h2 className="text-[3rem] mb-8 font-medium" style={{ fontFamily: FONTS.heading }}>
              Performance <br /> <span className="text-[#888888]">At Scale.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
              <StatItem value="50PB" label="Processed Daily" />
              <StatItem value="12ms" label="Query Latency" />
              <StatItem value="99.9%" label="Uptime SLA" />
            </div>
            
            <motion.div 
              className="mt-24 w-full h-[400px] rounded-[4px] border border-white/10 bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
              }}
              initial={{ filter: 'grayscale(100%) contrast(120%)', scale: 1, opacity: 0.8 }}
              whileHover={{ filter: 'grayscale(0%) contrast(110%)', scale: 1.02, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </Reveal>
        </section>

        {/* SECTION 4: SECURITY */}
        <section id="security" className="min-h-screen p-8 lg:p-24 flex flex-col justify-center border-b border-white/10 relative">
          <Reveal className="w-full flex flex-col items-start">
            <div 
              className="border border-[#00f0ff] text-[#00f0ff] py-2 px-4 text-[0.8rem] mb-8"
              style={{ fontFamily: FONTS.heading }}
            >
              SOC2 TYPE II COMPLIANT
            </div>
            <h2 className="text-[3rem] mb-8 font-medium max-w-[800px]" style={{ fontFamily: FONTS.heading }}>
              Your data is your fortress.<br />We just guard the gates.
            </h2>
            <p className="text-[1.25rem] text-[#888888] max-w-[600px] leading-relaxed mb-12">
              Enterprise-grade encryption at rest and in transit. Granular RBAC permissions. 
              Audit logs that track every pixel accessed. We take security as seriously as you take revenue.
            </p>
            
            <div className="bg-white/5 w-full p-16 border border-white/10 flex flex-wrap items-center justify-between mt-16 gap-8">
              <div>
                <h3 className="text-[2rem] mb-2" style={{ fontFamily: FONTS.heading }}>Ready to deploy?</h3>
                <p className="text-[#888888]">Join 500+ data-driven enterprises.</p>
              </div>
              <motion.button 
                whileHover={{ y: -2, boxShadow: '0 10px 20px -5px rgba(0, 240, 255, 0.1)' }}
                className="bg-white text-[#050505] border-none py-6 px-12 font-semibold cursor-pointer uppercase tracking-[0.05em] text-[1rem] transition-all hover:bg-[#00f0ff]"
                style={{ fontFamily: FONTS.heading }}
              >
                Request Access
              </motion.button>
            </div>
            
            <div className="mt-24 flex gap-8 opacity-50">
               <span className="font-bold" style={{ fontFamily: FONTS.heading }}>GDPR READY</span>
               <span className="font-bold" style={{ fontFamily: FONTS.heading }}>HIPAA COMPLIANT</span>
               <span className="font-bold" style={{ fontFamily: FONTS.heading }}>ISO 27001</span>
            </div>
          </Reveal>
        </section>

      </main>
    </div>
  );
}
