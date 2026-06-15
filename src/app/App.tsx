import { useState, useEffect, useRef } from "react";
import {
  Shield, Fingerprint, Lock, Unlock, History, Users, LogIn,
  LogOut, UserPlus, Eye, EyeOff, ChevronRight, Activity,
  CheckCircle, XCircle, AlertTriangle, Clock, Settings,
  BarChart2, Cpu, Wifi, Key, Menu, X, ArrowRight, RefreshCw,
  Download, Search, Filter, Bell, User
} from "lucide-react";

type Page = "home" | "login" | "register" | "admin" | "history" | "secure-access";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const historyData = [
  { id: 1, user: "Elena Vasquez", role: "Admin", action: "Access Granted", location: "Server Room A", time: "2024-01-15 09:42:11", status: "granted" },
  { id: 2, user: "Marcus Chen", role: "Engineer", action: "Access Denied", location: "R&D Lab", time: "2024-01-15 09:38:04", status: "denied" },
  { id: 3, user: "Priya Patel", role: "Staff", action: "Access Granted", location: "Main Entrance", time: "2024-01-15 09:31:57", status: "granted" },
  { id: 4, user: "Unknown", role: "—", action: "Intrusion Attempt", location: "Vault Door", time: "2024-01-15 09:17:33", status: "alert" },
  { id: 5, user: "Daniel Okafor", role: "Security", action: "Access Granted", location: "Control Room", time: "2024-01-15 08:55:20", status: "granted" },
  { id: 6, user: "Sofia Russo", role: "Manager", action: "Access Granted", location: "Executive Floor", time: "2024-01-15 08:44:08", status: "granted" },
  { id: 7, user: "James Thornton", role: "Contractor", action: "Access Denied", location: "Server Room B", time: "2024-01-15 08:22:45", status: "denied" },
  { id: 8, user: "Aisha Nakamura", role: "Staff", action: "Access Granted", location: "Main Entrance", time: "2024-01-15 08:10:12", status: "granted" },
  { id: 9, user: "Unknown", role: "—", action: "Intrusion Attempt", location: "Emergency Exit", time: "2024-01-15 07:58:39", status: "alert" },
  { id: 10, user: "Leo Fontaine", role: "Engineer", action: "Access Granted", location: "R&D Lab", time: "2024-01-15 07:45:00", status: "granted" },
];

const adminUsers = [
  { id: 1, name: "Elena Vasquez", role: "Admin", access: "Full", status: "active", lastSeen: "Now" },
  { id: 2, name: "Marcus Chen", role: "Engineer", access: "R&D, Labs", status: "active", lastSeen: "2m ago" },
  { id: 3, name: "Priya Patel", role: "Staff", access: "Main, Cafeteria", status: "active", lastSeen: "14m ago" },
  { id: 4, name: "Daniel Okafor", role: "Security", access: "All except Vault", status: "active", lastSeen: "1h ago" },
  { id: 5, name: "James Thornton", role: "Contractor", access: "Lobby only", status: "suspended", lastSeen: "3d ago" },
  { id: 6, name: "Sofia Russo", role: "Manager", access: "Executive zones", status: "active", lastSeen: "31m ago" },
];

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav({ current, navigate, isLoggedIn, onLogout }: {
  current: Page; navigate: (p: Page) => void; isLoggedIn: boolean; onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ fontFamily: "'Rajdhani', sans-serif" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#00e5ff1e] bg-[#080b10]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate("home")}
          className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="w-7 h-7 text-[#00e5ff] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00e5ff] rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-widest text-white">BIO<span className="text-[#00e5ff]">SECURE</span></span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {([
            { label: "HOME", page: "home" },
            { label: "SECURE ACCESS", page: "secure-access" },
            { label: "HISTORY", page: "history" },
            ...(isLoggedIn ? [{ label: "ADMIN", page: "admin" }] : []),
          ] as { label: string; page: Page }[]).map(({ label, page }) => (
            <button key={page} onClick={() => navigate(page)}
              className={`px-4 py-2 text-sm tracking-widest transition-all ${current === page
                ? "text-[#00e5ff] border-b border-[#00e5ff]"
                : "text-slate-400 hover:text-[#00e5ff]"}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <User className="w-4 h-4 text-[#00e5ff]" />
                <span style={{ fontFamily: "'Inter', sans-serif" }}>Elena Vasquez</span>
              </div>
              <button onClick={onLogout}
                className="flex items-center gap-2 px-4 py-1.5 border border-[#00e5ff33] text-[#00e5ff] text-sm tracking-widest hover:bg-[#00e5ff15] transition-colors rounded-sm">
                <LogOut className="w-3.5 h-3.5" /> LOGOUT
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("login")}
                className="px-4 py-1.5 text-sm tracking-widest text-slate-400 hover:text-[#00e5ff] transition-colors">
                LOGIN
              </button>
              <button onClick={() => navigate("register")}
                className="flex items-center gap-2 px-4 py-1.5 bg-[#00e5ff] text-[#080b10] text-sm tracking-widest font-bold hover:bg-[#00ccee] transition-colors rounded-sm">
                REGISTER <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#00e5ff1e] bg-[#080b10] px-6 py-4 flex flex-col gap-3">
          {(["home", "secure-access", "history", ...(isLoggedIn ? ["admin"] : [])] as Page[]).map(p => (
            <button key={p} onClick={() => { navigate(p); setOpen(false); }}
              className={`text-left text-sm tracking-widest py-2 border-b border-[#00e5ff0e] ${current === p ? "text-[#00e5ff]" : "text-slate-400"}`}>
              {p.replace("-", " ").toUpperCase()}
            </button>
          ))}
          {isLoggedIn
            ? <button onClick={() => { onLogout(); setOpen(false); }} className="text-left text-sm tracking-widest text-red-400 py-2">LOGOUT</button>
            : <div className="flex gap-3 pt-2">
              <button onClick={() => { navigate("login"); setOpen(false); }} className="flex-1 py-2 border border-[#00e5ff33] text-[#00e5ff] text-sm tracking-widest rounded-sm">LOGIN</button>
              <button onClick={() => { navigate("register"); setOpen(false); }} className="flex-1 py-2 bg-[#00e5ff] text-[#080b10] text-sm tracking-widest font-bold rounded-sm">REGISTER</button>
            </div>
          }
        </div>
      )}
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  const [scanActive, setScanActive] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setScanActive(v => !v), 2200);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon: Fingerprint, title: "Biometric Authentication", desc: "Sub-100ms fingerprint recognition with 99.97% accuracy using multi-spectral imaging technology." },
    { icon: Cpu, title: "Neural Processing", desc: "On-device AI processes biometric data locally — your data never leaves the hardware." },
    { icon: Wifi, title: "Real-Time Monitoring", desc: "Live access feeds, instant intrusion alerts, and full audit trails across all connected nodes." },
    { icon: Key, title: "Multi-Layer Security", desc: "Combine biometric, PIN, and physical token authentication for critical zone access." },
    { icon: Activity, title: "Anomaly Detection", desc: "Machine learning flags unusual patterns — failed attempts, off-hours access, spoofing attacks." },
    { icon: Shield, title: "Tamper Protection", desc: "Hardened enclosures with cryptographic key destruction on physical breach detection." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#080b10]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-24">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#00e5ff33] rounded-sm mb-8">
              <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-[#00e5ff] text-xs tracking-widest">SYSTEM ONLINE · v4.2.1</span>
            </div>
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-6">
              NEXT-GEN<br />
              <span className="text-[#00e5ff]">BIOMETRIC</span><br />
              SECURITY
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
              Military-grade fingerprint authentication for enterprise facilities. Zero-trust architecture. No compromises.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate("secure-access")}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="flex items-center gap-2 px-8 py-3.5 bg-[#00e5ff] text-[#080b10] font-bold text-sm tracking-widest hover:bg-[#00ccee] transition-all hover:scale-[1.02] rounded-sm">
                TRY BIOMETRIC SCAN <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate("register")}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="flex items-center gap-2 px-8 py-3.5 border border-[#00e5ff44] text-[#00e5ff] font-bold text-sm tracking-widest hover:bg-[#00e5ff0d] transition-all rounded-sm">
                GET ACCESS <UserPlus className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[#00e5ff1a] pt-10">
              {[
                { val: "99.97%", label: "Accuracy" },
                { val: "<80ms", label: "Scan Time" },
                { val: "256-bit", label: "Encryption" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-3xl font-bold text-[#00e5ff]">{s.val}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-500 tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Fingerprint scanner visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80">
              {/* Outer rings */}
              {[0, 1, 2].map(i => (
                <div key={i} className="absolute inset-0 rounded-full border border-[#00e5ff] opacity-10 animate-ping"
                  style={{ animationDelay: `${i * 0.7}s`, animationDuration: "3s" }} />
              ))}
              <div className="absolute inset-6 rounded-full border border-[#00e5ff22]" />
              <div className="absolute inset-12 rounded-full border border-[#00e5ff33]" />

              {/* Scanner */}
              <div className="absolute inset-16 rounded-full bg-[#0f1420] border border-[#00e5ff44] flex items-center justify-center overflow-hidden">
                {/* Scan line */}
                {scanActive && (
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-80 animate-bounce"
                    style={{ animationDuration: "1s" }} />
                )}
                <Fingerprint className={`w-24 h-24 transition-colors duration-500 ${scanActive ? "text-[#00e5ff]" : "text-slate-600"}`} />
              </div>

              {/* Corner brackets */}
              {[
                "top-4 left-4 border-t border-l",
                "top-4 right-4 border-t border-r",
                "bottom-4 left-4 border-b border-l",
                "bottom-4 right-4 border-b border-r",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 border-[#00e5ff] ${cls}`} />
              ))}

              <div style={{ fontFamily: "'JetBrains Mono', monospace" }}
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest transition-colors duration-500 ${scanActive ? "text-[#00e5ff]" : "text-slate-600"}`}>
                {scanActive ? "SCANNING..." : "READY"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-[#00e5ff1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-[#00e5ff] tracking-widest mb-3">// CAPABILITIES</div>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-4xl font-bold text-white">
              ENGINEERED FOR<br />CRITICAL ENVIRONMENTS
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#00e5ff0d]">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#080b10] p-8 hover:bg-[#0f1420] transition-colors group">
                <div className="w-10 h-10 border border-[#00e5ff33] flex items-center justify-center mb-6 group-hover:border-[#00e5ff] transition-colors">
                  <Icon className="w-5 h-5 text-[#00e5ff]" />
                </div>
                <h3 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-lg font-bold text-white tracking-wide mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 border-t border-[#00e5ff1a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-4xl font-bold text-white mb-2">
              READY TO SECURE YOUR FACILITY?
            </h2>
            <p className="text-slate-500">Deploy BioSecure across all access points in under 48 hours.</p>
          </div>
          <div className="flex gap-4 shrink-0">
            <button onClick={() => navigate("register")}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="px-8 py-3.5 bg-[#00e5ff] text-[#080b10] font-bold text-sm tracking-widest hover:bg-[#00ccee] transition-all rounded-sm">
              REGISTER NOW
            </button>
            <button onClick={() => navigate("login")}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="px-8 py-3.5 border border-[#00e5ff33] text-[#00e5ff] font-bold text-sm tracking-widest hover:bg-[#00e5ff0d] transition-all rounded-sm">
              SIGN IN
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00e5ff1a] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00e5ff]" />
            <span className="text-white font-bold tracking-widest">BIO<span className="text-[#00e5ff]">SECURE</span></span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-slate-600 text-xs tracking-widest">
            © 2024 BIOSECURE SYSTEMS · ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

function LoginPage({ navigate, onLogin }: { navigate: (p: Page) => void; onLogin: () => void }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setScanning(true);
    setError("");
    setTimeout(() => {
      setScanDone(true);
      setTimeout(() => { onLogin(); navigate("admin"); }, 800);
    }, 2000);
  };

  const handleBiometric = () => {
    setScanning(true);
    setError("");
    setTimeout(() => { setScanDone(true); setTimeout(() => { onLogin(); navigate("admin"); }, 800); }, 2200);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#080b10] flex items-center justify-center pt-16 px-6">
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-[#00e5ff33] mb-6 rounded-sm">
            <Lock className="w-8 h-8 text-[#00e5ff]" />
          </div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-4xl font-bold text-white tracking-wide">SYSTEM ACCESS</h1>
          <p className="text-slate-500 text-sm mt-2">Authenticate to BioSecure Control Center</p>
        </div>

        {/* Biometric scan button */}
        <button onClick={handleBiometric} disabled={scanning}
          className="w-full mb-6 p-6 border border-[#00e5ff22] hover:border-[#00e5ff55] bg-[#0f1420] hover:bg-[#121a2a] transition-all group flex flex-col items-center gap-3 rounded-sm">
          <div className="relative">
            <Fingerprint className={`w-14 h-14 transition-colors duration-300 ${scanDone ? "text-green-400" : scanning ? "text-[#00e5ff]" : "text-slate-500 group-hover:text-[#00e5ff99]"}`} />
            {scanning && !scanDone && (
              <div className="absolute inset-0 rounded-full border-2 border-[#00e5ff] opacity-50 animate-ping" />
            )}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-widest text-slate-500 group-hover:text-[#00e5ff] transition-colors">
            {scanDone ? "VERIFIED" : scanning ? "SCANNING..." : "TOUCH TO SCAN FINGERPRINT"}
          </span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[#00e5ff1a]" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-600 tracking-widest">OR</span>
          <div className="flex-1 h-px bg-[#00e5ff1a]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-400 mb-2">EMAIL ADDRESS</label>
            <input value={email} onChange={e => setEmail(e.target.value)}
              type="email" placeholder="operator@biosecure.io"
              className="w-full bg-[#0f1420] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-3 outline-none transition-colors rounded-sm placeholder:text-slate-700" />
          </div>
          <div>
            <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-400 mb-2">PASSWORD</label>
            <div className="relative">
              <input value={password} onChange={e => setPassword(e.target.value)}
                type={showPass ? "text" : "password"} placeholder="••••••••••"
                className="w-full bg-[#0f1420] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-3 pr-12 outline-none transition-colors rounded-sm placeholder:text-slate-700" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-[#00e5ff] transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" /> {error}
            </div>
          )}

          <button type="submit" disabled={scanning}
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
            className="w-full py-3.5 bg-[#00e5ff] text-[#080b10] font-bold text-sm tracking-widest hover:bg-[#00ccee] transition-all disabled:opacity-50 rounded-sm mt-2">
            {scanning ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-slate-600 text-sm">No account? </span>
          <button onClick={() => navigate("register")} className="text-[#00e5ff] text-sm hover:underline">
            Request access
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────

function RegisterPage({ navigate }: { navigate: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", dept: "", role: "", password: "" });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleBioScan = () => {
    setScanning(true);
    setTimeout(() => { setScanDone(true); setScanning(false); }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#080b10] flex items-center justify-center pt-20 px-6 pb-10">
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-[#00e5ff33] mb-5 rounded-sm">
            <UserPlus className="w-7 h-7 text-[#00e5ff]" />
          </div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-4xl font-bold text-white tracking-wide">REQUEST ACCESS</h1>
          <p className="text-slate-500 text-sm mt-2">Register for BioSecure facility access</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold transition-all
                ${step >= s ? "bg-[#00e5ff] text-[#080b10]" : "border border-[#00e5ff33] text-slate-600"}`}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-px ${step > s ? "bg-[#00e5ff]" : "bg-[#00e5ff22]"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-[#0f1420] border border-[#00e5ff1a] p-8 rounded-sm space-y-5">
            <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-xs tracking-widest text-[#00e5ff] mb-6">// STEP 1 — IDENTITY</div>
            <div>
              <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-400 mb-2">FULL NAME</label>
              <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Dr. Elena Vasquez"
                className="w-full bg-[#080b10] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-3 outline-none transition-colors rounded-sm placeholder:text-slate-700" />
            </div>
            <div>
              <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-400 mb-2">WORK EMAIL</label>
              <input value={form.email} onChange={e => update("email", e.target.value)} placeholder="vasquez@corp.io" type="email"
                className="w-full bg-[#080b10] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-3 outline-none transition-colors rounded-sm placeholder:text-slate-700" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-400 mb-2">DEPARTMENT</label>
                <select value={form.dept} onChange={e => update("dept", e.target.value)}
                  className="w-full bg-[#080b10] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-3 outline-none transition-colors rounded-sm">
                  <option value="">Select...</option>
                  {["Engineering", "Security", "R&D", "Operations", "Management", "IT"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-400 mb-2">ROLE</label>
                <select value={form.role} onChange={e => update("role", e.target.value)}
                  className="w-full bg-[#080b10] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-3 outline-none transition-colors rounded-sm">
                  <option value="">Select...</option>
                  {["Staff", "Engineer", "Manager", "Admin", "Contractor"].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => setStep(2)}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="w-full py-3.5 bg-[#00e5ff] text-[#080b10] font-bold text-sm tracking-widest hover:bg-[#00ccee] transition-all rounded-sm mt-2">
              CONTINUE →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[#0f1420] border border-[#00e5ff1a] p-8 rounded-sm space-y-5">
            <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-xs tracking-widest text-[#00e5ff] mb-6">// STEP 2 — BIOMETRIC ENROLMENT</div>
            <button onClick={handleBioScan} disabled={scanning || scanDone}
              className="w-full p-8 border border-dashed border-[#00e5ff33] hover:border-[#00e5ff66] transition-all flex flex-col items-center gap-4 rounded-sm group">
              <div className="relative">
                <Fingerprint className={`w-20 h-20 transition-colors duration-300 ${scanDone ? "text-green-400" : scanning ? "text-[#00e5ff]" : "text-slate-600 group-hover:text-slate-400"}`} />
                {scanning && <div className="absolute inset-0 rounded-full border-2 border-[#00e5ff] animate-ping opacity-40" />}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs tracking-widest text-slate-500">
                {scanDone ? "✓ FINGERPRINT ENROLLED" : scanning ? "SCANNING BIOMETRIC DATA..." : "PRESS TO ENROL FINGERPRINT"}
              </span>
            </button>
            <div>
              <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-400 mb-2">SET PASSWORD</label>
              <div className="relative">
                <input value={form.password} onChange={e => update("password", e.target.value)} type={showPass ? "text" : "password"} placeholder="Min. 12 characters"
                  className="w-full bg-[#080b10] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-3 pr-12 outline-none transition-colors rounded-sm placeholder:text-slate-700" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-[#00e5ff] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="flex-1 py-3.5 border border-[#00e5ff22] text-slate-400 font-bold text-sm tracking-widest hover:border-[#00e5ff44] transition-all rounded-sm">
                ← BACK
              </button>
              <button onClick={handleSubmit}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="flex-[2] py-3.5 bg-[#00e5ff] text-[#080b10] font-bold text-sm tracking-widest hover:bg-[#00ccee] transition-all rounded-sm">
                SUBMIT REQUEST
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-[#0f1420] border border-green-500/30 p-10 rounded-sm text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-3xl font-bold text-white mb-3">REQUEST SUBMITTED</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Your access request is pending admin approval. You will receive a notification once your biometric profile is activated.
            </p>
            <button onClick={() => navigate("login")}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="px-8 py-3.5 bg-[#00e5ff] text-[#080b10] font-bold text-sm tracking-widest hover:bg-[#00ccee] transition-all rounded-sm">
              GO TO LOGIN
            </button>
          </div>
        )}

        {step < 3 && (
          <div className="mt-5 text-center">
            <span className="text-slate-600 text-sm">Already have access? </span>
            <button onClick={() => navigate("login")} className="text-[#00e5ff] text-sm hover:underline">Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────

function AdminPage({ navigate }: { navigate: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "settings">("overview");

  const filtered = adminUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const statCards = [
    { label: "ACTIVE USERS", value: "142", delta: "+3", icon: Users, color: "text-[#00e5ff]" },
    { label: "TODAY'S ACCESS", value: "847", delta: "+124", icon: Activity, color: "text-green-400" },
    { label: "DENIED ATTEMPTS", value: "12", delta: "-5", icon: XCircle, color: "text-red-400" },
    { label: "ALERTS", value: "2", delta: "0", icon: Bell, color: "text-yellow-400" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#080b10] pt-16">
      {/* Admin header */}
      <div className="border-b border-[#00e5ff1a] bg-[#0a0d14]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-[#00e5ff] tracking-widest mb-1">// ADMIN CONSOLE</div>
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-3xl font-bold text-white tracking-wide">CONTROL CENTER</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("history")}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="flex items-center gap-2 px-4 py-2 border border-[#00e5ff33] text-[#00e5ff] text-xs tracking-widest hover:bg-[#00e5ff0d] transition-colors rounded-sm">
              <History className="w-3.5 h-3.5" /> ACCESS LOG
            </button>
            <button style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="flex items-center gap-2 px-4 py-2 bg-[#00e5ff] text-[#080b10] text-xs font-bold tracking-widest hover:bg-[#00ccee] transition-colors rounded-sm">
              <Download className="w-3.5 h-3.5" /> EXPORT
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-6">
          {(["overview", "users", "settings"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className={`pb-3 text-sm tracking-widest border-b-2 transition-all ${activeTab === tab
                ? "border-[#00e5ff] text-[#00e5ff]"
                : "border-transparent text-slate-500 hover:text-slate-300"}`}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map(({ label, value, delta, icon: Icon, color }) => (
                <div key={label} className="bg-[#0f1420] border border-[#00e5ff1a] p-6 hover:border-[#00e5ff33] transition-colors rounded-sm">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className={`text-xs ${parseFloat(delta) > 0 ? "text-green-400" : parseFloat(delta) < 0 ? "text-red-400" : "text-slate-600"}`}>{delta}</span>
                  </div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-3xl font-bold text-white mb-1">{value}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-500 tracking-widest">{label}</div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="bg-[#0f1420] border border-[#00e5ff1a] rounded-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#00e5ff1a] flex items-center justify-between">
                <span style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-sm font-bold text-white tracking-widest">RECENT ACTIVITY</span>
                <button onClick={() => navigate("history")} className="text-[#00e5ff] text-xs hover:underline">View all →</button>
              </div>
              <div>
                {historyData.slice(0, 5).map(row => (
                  <div key={row.id} className="flex items-center gap-4 px-6 py-3.5 border-b border-[#00e5ff08] hover:bg-[#080b10] transition-colors">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${row.status === "granted" ? "bg-green-400" : row.status === "denied" ? "bg-red-400" : "bg-yellow-400 animate-pulse"}`} />
                    <div className="flex-1 min-w-0">
                      <span className="text-slate-300 text-sm">{row.user}</span>
                      <span className="text-slate-600 text-sm mx-2">·</span>
                      <span className="text-slate-500 text-sm">{row.location}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-600 shrink-0">{row.time.split(" ")[1]}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-sm shrink-0 ${row.status === "granted" ? "bg-green-400/10 text-green-400" : row.status === "denied" ? "bg-red-400/10 text-red-400" : "bg-yellow-400/10 text-yellow-400"}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {row.action.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="bg-[#0f1420] border border-[#00e5ff1a] rounded-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#00e5ff1a] flex items-center justify-between gap-4">
              <span style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-sm font-bold text-white tracking-widest shrink-0">USER MANAGEMENT</span>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                  className="w-full bg-[#080b10] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm pl-10 pr-4 py-2 outline-none transition-colors rounded-sm placeholder:text-slate-700" />
              </div>
              <button style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="flex items-center gap-2 px-4 py-2 bg-[#00e5ff] text-[#080b10] text-xs font-bold tracking-widest hover:bg-[#00ccee] transition-colors rounded-sm shrink-0">
                <UserPlus className="w-3.5 h-3.5" /> ADD USER
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#00e5ff1a]">
                    {["USER", "ROLE", "ACCESS ZONES", "STATUS", "LAST SEEN", "ACTIONS"].map(h => (
                      <th key={h} style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        className="px-6 py-3 text-left text-xs text-slate-600 tracking-widest font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id} className="border-b border-[#00e5ff08] hover:bg-[#080b10] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-[#00e5ff15] border border-[#00e5ff22] flex items-center justify-center">
                            <span className="text-[#00e5ff] text-xs font-bold">{u.name.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                          <span className="text-slate-300 text-sm">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{u.role}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{u.access}</td>
                      <td className="px-6 py-4">
                        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          className={`text-xs px-2 py-0.5 rounded-sm ${u.status === "active" ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                          {u.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace" }} className="px-6 py-4 text-slate-600 text-xs">{u.lastSeen}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-xs text-[#00e5ff] hover:underline">Edit</button>
                          <button className="text-xs text-red-400 hover:underline">Revoke</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "SECURITY POLICY",
                items: [
                  { label: "Max failed attempts before lockout", value: "3", type: "number" },
                  { label: "Lockout duration (minutes)", value: "15", type: "number" },
                  { label: "Session timeout (minutes)", value: "30", type: "number" },
                ],
              },
              {
                title: "BIOMETRIC THRESHOLDS",
                items: [
                  { label: "Minimum confidence score (%)", value: "94", type: "number" },
                  { label: "Anti-spoofing sensitivity", value: "High", type: "text" },
                  { label: "Liveness detection", value: "Enabled", type: "text" },
                ],
              },
            ].map(section => (
              <div key={section.title} className="bg-[#0f1420] border border-[#00e5ff1a] rounded-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#00e5ff1a]">
                  <span style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-sm font-bold text-white tracking-widest">{section.title}</span>
                </div>
                <div className="p-6 space-y-5">
                  {section.items.map(item => (
                    <div key={item.label}>
                      <label style={{ fontFamily: "'Rajdhani', sans-serif" }} className="block text-xs tracking-widest text-slate-500 mb-2">{item.label.toUpperCase()}</label>
                      <input defaultValue={item.value}
                        className="w-full bg-[#080b10] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm px-4 py-2.5 outline-none transition-colors rounded-sm" />
                    </div>
                  ))}
                  <button style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    className="w-full py-3 bg-[#00e5ff] text-[#080b10] font-bold text-xs tracking-widest hover:bg-[#00ccee] transition-all rounded-sm mt-2">
                    SAVE CHANGES
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────────────────

function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "granted" | "denied" | "alert">("all");
  const [search, setSearch] = useState("");

  const filtered = historyData.filter(row => {
    const matchFilter = filter === "all" || row.status === filter;
    const matchSearch = row.user.toLowerCase().includes(search.toLowerCase()) ||
      row.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    granted: historyData.filter(r => r.status === "granted").length,
    denied: historyData.filter(r => r.status === "denied").length,
    alert: historyData.filter(r => r.status === "alert").length,
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#080b10] pt-16">
      <div className="border-b border-[#00e5ff1a] bg-[#0a0d14]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-[#00e5ff] tracking-widest mb-1">// ACCESS LOG</div>
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-3xl font-bold text-white tracking-wide">ACCESS HISTORY</h1>
          </div>
          <div className="flex items-center gap-3">
            <button style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="flex items-center gap-2 px-4 py-2 border border-[#00e5ff33] text-[#00e5ff] text-xs tracking-widest hover:bg-[#00e5ff0d] transition-colors rounded-sm">
              <RefreshCw className="w-3.5 h-3.5" /> REFRESH
            </button>
            <button style={{ fontFamily: "'Rajdhani', sans-serif" }}
              className="flex items-center gap-2 px-4 py-2 bg-[#00e5ff] text-[#080b10] text-xs font-bold tracking-widest hover:bg-[#00ccee] transition-colors rounded-sm">
              <Download className="w-3.5 h-3.5" /> EXPORT CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary badges */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "GRANTED", count: counts.granted, color: "green", status: "granted" as const },
            { label: "DENIED", count: counts.denied, color: "red", status: "denied" as const },
            { label: "ALERTS", count: counts.alert, color: "yellow", status: "alert" as const },
          ].map(({ label, count, color, status }) => (
            <button key={label} onClick={() => setFilter(filter === status ? "all" : status)}
              className={`p-5 border transition-all text-left rounded-sm ${filter === status
                ? `border-${color}-400/50 bg-${color}-400/10`
                : "border-[#00e5ff1a] bg-[#0f1420] hover:border-[#00e5ff33]"}`}>
              <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className={`text-3xl font-bold mb-1 ${color === "green" ? "text-green-400" : color === "red" ? "text-red-400" : "text-yellow-400"}`}>{count}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-600 tracking-widest">{label}</div>
            </button>
          ))}
        </div>

        {/* Filters & search */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user or location..."
              className="w-full bg-[#0f1420] border border-[#00e5ff22] focus:border-[#00e5ff66] text-slate-300 text-sm pl-10 pr-4 py-2.5 outline-none transition-colors rounded-sm placeholder:text-slate-700" />
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-600 ml-auto">
            {filtered.length} RECORDS
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0f1420] border border-[#00e5ff1a] rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00e5ff1a]">
                  {["#", "USER", "ROLE", "ACTION", "LOCATION", "TIMESTAMP", "STATUS"].map(h => (
                    <th key={h} style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      className="px-5 py-3 text-left text-xs text-slate-600 tracking-widest font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(row => (
                  <tr key={row.id} className="border-b border-[#00e5ff08] hover:bg-[#080b10] transition-colors">
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }} className="px-5 py-4 text-slate-700 text-xs">{String(row.id).padStart(3, "0")}</td>
                    <td className="px-5 py-4 text-slate-300 text-sm">{row.user}</td>
                    <td className="px-5 py-4 text-slate-600 text-sm">{row.role}</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{row.action}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{row.location}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }} className="px-5 py-4 text-slate-600 text-xs">{row.time}</td>
                    <td className="px-5 py-4">
                      <span style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        className={`text-xs px-2.5 py-1 rounded-sm inline-flex items-center gap-1.5 ${row.status === "granted" ? "bg-green-400/10 text-green-400" : row.status === "denied" ? "bg-red-400/10 text-red-400" : "bg-yellow-400/10 text-yellow-400"}`}>
                        {row.status === "granted" ? <CheckCircle className="w-3 h-3" /> : row.status === "denied" ? <XCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {row.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SECURE ACCESS PAGE ───────────────────────────────────────────────────────

function SecureAccessPage({ navigate }: { navigate: (p: Page) => void }) {
  const [phase, setPhase] = useState<"idle" | "scanning" | "success" | "fail">("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startScan = () => {
    if (phase === "scanning") return;
    setPhase("scanning");
    setProgress(0);
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        const result = Math.random() > 0.25 ? "success" : "fail";
        setPhase(result);
        setProgress(100);
      }
      setProgress(p);
    }, 80);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhase("idle");
    setProgress(0);
  };

  const zones = [
    { name: "Main Entrance", status: "online", clearance: "Standard" },
    { name: "Server Room A", status: "online", clearance: "High" },
    { name: "R&D Laboratory", status: "online", clearance: "High" },
    { name: "Executive Floor", status: "online", clearance: "Admin" },
    { name: "Vault Door", status: "locked", clearance: "Maximum" },
    { name: "Emergency Exit", status: "online", clearance: "Standard" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-[#080b10] pt-16">
      <div className="border-b border-[#00e5ff1a] bg-[#0a0d14]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-[#00e5ff] tracking-widest mb-1">// BIOMETRIC TERMINAL</div>
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-3xl font-bold text-white tracking-wide">SECURE ACCESS</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10">
        {/* Scanner panel */}
        <div className="bg-[#0f1420] border border-[#00e5ff1a] rounded-sm p-8 flex flex-col items-center">
          <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-sm font-bold text-white tracking-widest mb-8">FINGERPRINT SCANNER</div>

          {/* Scanner visual */}
          <div className="relative mb-8" onClick={startScan}>
            <div className="w-56 h-56 rounded-sm border border-[#00e5ff33] relative cursor-pointer hover:border-[#00e5ff66] transition-colors flex items-center justify-center bg-[#080b10] overflow-hidden group">
              {/* Corner brackets */}
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute w-5 h-5 border-[#00e5ff] ${cls}`} />
              ))}

              {/* Scan line animation */}
              {phase === "scanning" && (
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-80"
                  style={{ animation: "scanLine 1s linear infinite", top: `${progress}%` }} />
              )}

              <Fingerprint className={`w-28 h-28 transition-all duration-500 ${phase === "success" ? "text-green-400" : phase === "fail" ? "text-red-400" : phase === "scanning" ? "text-[#00e5ff]" : "text-slate-700 group-hover:text-slate-500"}`} />

              {phase === "scanning" && (
                <div className="absolute inset-0 bg-[#00e5ff03]" />
              )}
            </div>
          </div>

          {/* Progress bar */}
          {phase === "scanning" && (
            <div className="w-full mb-5">
              <div className="h-1 bg-[#161d2e] rounded-full overflow-hidden">
                <div className="h-full bg-[#00e5ff] transition-all duration-100 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-600 text-center mt-2 tracking-widest">
                ANALYZING... {Math.round(progress)}%
              </div>
            </div>
          )}

          {/* Status */}
          <div className={`text-center mb-6 transition-all duration-300 ${phase === "idle" ? "opacity-70" : "opacity-100"}`}>
            {phase === "idle" && (
              <><div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-500 tracking-widest">PRESS SCANNER TO AUTHENTICATE</div></>
            )}
            {phase === "scanning" && (
              <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-[#00e5ff] tracking-widest animate-pulse">BIOMETRIC SCAN IN PROGRESS</div>
            )}
            {phase === "success" && (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-xl font-bold text-green-400 tracking-widest">ACCESS GRANTED</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-500">Identity verified · Elena Vasquez</div>
              </div>
            )}
            {phase === "fail" && (
              <div className="flex flex-col items-center gap-2">
                <XCircle className="w-8 h-8 text-red-400" />
                <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-xl font-bold text-red-400 tracking-widest">ACCESS DENIED</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-500">Biometric mismatch · Alert logged</div>
              </div>
            )}
          </div>

          <div className="flex gap-3 w-full">
            {phase === "idle" ? (
              <button onClick={startScan}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="flex-1 py-3.5 bg-[#00e5ff] text-[#080b10] font-bold text-sm tracking-widest hover:bg-[#00ccee] transition-all rounded-sm">
                START SCAN
              </button>
            ) : phase !== "scanning" ? (
              <button onClick={reset}
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                className="flex-1 py-3.5 border border-[#00e5ff33] text-[#00e5ff] font-bold text-sm tracking-widest hover:bg-[#00e5ff0d] transition-all rounded-sm">
                SCAN AGAIN
              </button>
            ) : null}
          </div>
        </div>

        {/* Access zones */}
        <div className="flex flex-col gap-4">
          <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-sm font-bold text-white tracking-widest mb-2">ACCESS ZONES</div>
          {zones.map(zone => (
            <div key={zone.name} className="flex items-center gap-4 bg-[#0f1420] border border-[#00e5ff1a] px-6 py-4 hover:border-[#00e5ff33] transition-colors rounded-sm">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${zone.status === "online" ? "bg-green-400" : "bg-red-400 animate-pulse"}`} />
              <div className="flex-1">
                <div className="text-slate-300 text-sm">{zone.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-600 mt-0.5 tracking-widest">{zone.status.toUpperCase()}</div>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  className={`text-xs px-2 py-0.5 rounded-sm ${zone.clearance === "Maximum" ? "bg-red-400/10 text-red-400" : zone.clearance === "High" ? "bg-yellow-400/10 text-yellow-400" : zone.clearance === "Admin" ? "bg-purple-400/10 text-purple-400" : "bg-green-400/10 text-green-400"}`}>
                  {zone.clearance.toUpperCase()}
                </span>
                {zone.status === "online"
                  ? <Unlock className="w-4 h-4 text-slate-600" />
                  : <Lock className="w-4 h-4 text-red-400" />}
              </div>
            </div>
          ))}

          <div className="mt-4 bg-[#0f1420] border border-yellow-400/20 rounded-sm p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-sm font-bold text-yellow-400 tracking-widest mb-1">ACTIVE ALERT</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-xs text-slate-500 leading-relaxed">
                  2 unauthorized access attempts detected at Vault Door · 07:58 — Security notified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (p: Page) => {
    if ((p === "admin") && !isLoggedIn) { setPage("login"); return; }
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => { setIsLoggedIn(false); setPage("home"); };

  return (
    <div className="bg-[#080b10] min-h-screen">
      <Nav current={page} navigate={navigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "login" && <LoginPage navigate={navigate} onLogin={() => setIsLoggedIn(true)} />}
      {page === "register" && <RegisterPage navigate={navigate} />}
      {page === "admin" && <AdminPage navigate={navigate} />}
      {page === "history" && <HistoryPage />}
      {page === "secure-access" && <SecureAccessPage navigate={navigate} />}
    </div>
  );
}
