import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  Check,
  X,
  Award,
  CheckCircle,
  XCircle,
  Shield,
  Users,
  Crown,
  Star,
  Zap,
} from "lucide-react";
import Script from "next/script";

// Utility function to format prices
const formatPrice = (price) => {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

// Utility function to calculate savings
const calculateSavings = (yearly, monthly) => {
  if (!yearly || !monthly) return null;
  const yearlyCost = yearly.price * 12;
  const monthlyCost = monthly.price * 12;
  return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
};

export default function PaymentDashboard() {
  // Mock user data for frontend development
  const user = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "/images/gender/male.png",
    },
  };
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown menu

  const toggleMobileSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const [yearly, setYearly] = useState(true); // billing toggle

  // Add state for selectedPackage
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const plans = [
    {
      id: "pro",
      name: "Pro",
      badge: "Paling Populer",
      subtitle: "Untuk profesional dan freelancer",
      icon: <Zap className="w-6 h-6" />,
      highlight: true,
      pricing: {
        monthly: { price: 30000, original: null },
        yearly: { price: 350000, original: 420000 },
      },
      features: [
        { text: "Export PNG/PDF (1080p)", included: true },
        { text: "Tak terbatas proyek", included: true },
        { text: "Brand Kit & Font kustom", included: true },
        { text: "50 kredit AI Assist / bln", included: true },
        { text: "Scheduler Post (IG/TikTok)", included: true },
        { text: "Tanpa watermark", included: true },
        { text: "Kolaborasi realtime", included: false },
        { text: "Analytics & audit log", included: false },
      ],
      benefits: [
        "Cocok untuk freelancer",
        "AI-powered tools",
        "Social media ready",
      ],
      limitations: "Terbatas untuk 1 pengguna",
    },
    {
      id: "edu",
      name: "Edu Team",
      badge: "Untuk Tim / Sekolah",
      subtitle: "Solusi lengkap untuk institusi",
      icon: <Crown className="w-6 h-6" />,
      highlight: false,
      pricing: {
        monthly: { price: 200000, original: null },
        yearly: { price: 2500000, original: 2880000 },
      },
      features: [
        { text: "Semua fitur Pro", included: true },
        { text: "Kolaborasi realtime", included: true },
        { text: "Folder & izin anggota", included: true },
        { text: "Template institusi", included: true },
        { text: "SSO (Google Workspace)", included: true },
        { text: "Analytics & audit log", included: true },
        { text: "Prioritas dukungan", included: true },
        { text: "Custom branding", included: true },
      ],
      benefits: [
        "Multi-user collaboration",
        "Enterprise security",
        "Dedicated support",
      ],
      limitations: "Minimal 3 pengguna",
    },
  ];

  // Function to handle package selection
  const handleSelectPackage = (plan) => {
    setSelectedPackage(plan);
  };

  // Create order and call Midtrans Snap via server API
  const handlePayment = async (plan) => {
    const pkg = plan || selectedPackage;
    if (!pkg) return alert('Pilih paket terlebih dahulu');

    setLoading(true);
    setProcessingId(pkg.id);

    try {
      // determine price based on selection and billing period
      const pricing = yearly ? pkg.pricing.yearly : pkg.pricing.monthly;
      // Note: Edu team pricing may be per-user; adjust if you collect user count
      const users = pkg.id === 'edu' ? 1 : 1;
      const amount = pricing.price * users;

      const res = await fetch('/api/midtrans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: `ORDER-${pkg.id}-${Date.now()}`,
          amount,
          customer: {
            name: user?.user?.name || 'Guest',
            email: user?.user?.email || '',
          },
        }),
      });

      const data = await res.json();

      if (!data?.token) {
        throw new Error('No token returned from server');
      }

      if (!window.snap) {
        // load snap script dynamically if not present
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || process.env.NEXT_PUBLIC_CLIENT || '');
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
          script.onerror = resolve;
        });
      }

      // set selected package state so UI reflects the choice
      setSelectedPackage(pkg);

      window.snap.pay(data.token, {
        onSuccess: function (result) {
          alert('Pembayaran berhasil');
          console.log(result);
        },
        onPending: function (result) {
          alert('Menunggu pembayaran');
          console.log(result);
        },
        onError: function (result) {
          alert('Pembayaran gagal');
          console.log(result);
        },
        onClose: function () {
          console.log('Midtrans popup closed');
        },
      });
    } catch (err) {
      console.error('payment error', err);
      alert('Terjadi kesalahan saat memproses pembayaran');
    } finally {
      setLoading(false);
      setProcessingId(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Backdrop Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full w-72"}
          md:translate-x-0 md:static
          ${sidebarCollapsed ? "md:w-16" : "md:w-72"}
        `}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between px-3 py-2 mb-3">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-10 h-10   bg-cover bg-center"
              style={{ backgroundImage: "url('/images/logoLP.png')" }}
            />
            {!sidebarCollapsed && (
              <span className="leading-none -ml-1">
                <span className="block text-[22px] md:text-[26px] font-extrabold tracking-tight text-slate-900 dark:text-black">
                  Lembar{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                    Pintar
                  </span>
                </span>
              </span>
            )}
          </Link>

          {/* Tombol collapse (desktop) */}
          <button
            onClick={toggleSidebarCollapse}
            className="hidden md:inline-flex p-1 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

          {/* Tombol close (mobile) */}
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden p-1 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Konten Sidebar */}
        {!sidebarCollapsed && (
          <>
            <button
              onClick={() => router.push("/editor")}
              className="mx-3 mb-3 rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-500"
            >
              + Buat Baru
            </button>

            <nav className="flex-1 space-y-1 px-3">
              <SidebarItem href="/account-frontend">
                Beranda
              </SidebarItem>
              <SidebarItem href="/account-frontend/design">
                Desain Saya
              </SidebarItem>

              <div className="border-t border-gray-200 my-2 pt-2">
                <SidebarDropdown label="Template">
                  <SidebarDropdown label="SD">
                    <SidebarItem href="/kelas/SD/1">Kelas 1</SidebarItem>
                    <SidebarItem href="/kelas/SD/2">Kelas 2</SidebarItem>
                    <SidebarItem href="/kelas/SD/3">Kelas 3</SidebarItem>
                    <SidebarItem href="/kelas/SD/4">Kelas 4</SidebarItem>
                    <SidebarItem href="/kelas/SD/5">Kelas 5</SidebarItem>
                    <SidebarItem href="/kelas/SD/6">Kelas 6</SidebarItem>
                  </SidebarDropdown>
                  <SidebarDropdown label="SMP">
                    <SidebarItem href="/kelas/SMP/7">Kelas 7</SidebarItem>
                    <SidebarItem href="/kelas/SMP/8">Kelas 8</SidebarItem>
                    <SidebarItem href="/kelas/SMP/9">Kelas 9</SidebarItem>
                  </SidebarDropdown>
                  <SidebarDropdown label="SMA">
                    <SidebarItem href="/kelas/SMA/10">Kelas 10</SidebarItem>
                    <SidebarItem href="/kelas/SMA/11">Kelas 11</SidebarItem>
                    <SidebarItem href="/kelas/SMA/12">Kelas 12</SidebarItem>
                  </SidebarDropdown>
                  <SidebarItem href="/PerguruanTinggi">
                    Perguruan Tinggi
                  </SidebarItem>
                </SidebarDropdown>
              </div>

              <SidebarItem href="/account-frontend/payment" active>
                Pembayaran
              </SidebarItem>
              <SidebarItem href="/account-frontend/billing">
                Tagihan
              </SidebarItem>
              <SidebarItem href="/account-frontend/profile">Profil</SidebarItem>
            </nav>

            <div className="mt-auto rounded-xl border bg-white p-3 mx-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={user?.user?.image || "/avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user?.user?.name || "Pengguna"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.user?.email || ""}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  alert("Sign out clicked");
                  router.push("/");
                }}
                className="mt-3 w-full rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                Keluar
              </button>
            </div>
          </>
        )}
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-24 bg-white border-b px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Tombol Mobile Sidebar */}
            <button
              onClick={toggleMobileSidebar}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Pembayaran</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="relative hidden md:block">
              <input
                placeholder="Cari…"
                className="w-64 rounded-md border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div> */}
            <div className="relative" style={{ zIndex: 50 }}>
              <img
                src={user?.user?.image || "/avatar.png"}
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
                alt="user"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-2 mt-2 w-36 bg-white rounded-md">
                  <div className="py-2">
                    <button
                      className="block w-full px-2 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded-t-xl flex items-center gap-2"
                      onClick={() => router.push("profile")}
                    >
                      <i className="fa-solid fa-circle-user"></i>
                      Profil
                    </button>
                    <button
                      className="block w-full px-2 py-2 text-center border-b border-gray-100 hover:bg-blue-600 hover:text-white rounded-b-xl flex items-center gap-2"
                      onClick={() => {
                        alert("Sign out clicked");
                        router.push("/");
                      }}
                    >
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-5 space-y-6">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4 md:mb-6">
              <Award className="w-4 h-4" />
              Dipercaya 10,000+ pengguna
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Pilih Paket{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Premium
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 text-base md:text-lg">
              Tingkatkan produktivitas dengan fitur lengkap. Bayar hanya untuk
              paket yang sesuai dengan kebutuhan Anda.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 md:mt-10 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <button
                onClick={() => setYearly(false)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  !yearly
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  yearly
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Tahunan{" "}
                <span className="ml-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  Hemat 17%
                </span>
              </button>
            </div>
          </div>

          {/* 🔥 Comparison Free vs Paid - VERSI YANG DIPERBAIKI */}
          <div className="relative mt-16 mb-20">
            <div className="text-center mb-12 md:mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Gratis <span className="text-slate-400">atau</span>{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  Berlangganan ?
                </span>
              </h3>
              <p className="max-w-2xl mx-auto text-slate-600">
                Gratis hanya sekadar coba. Versi berlangganan membuat Anda
                produktif, efisien, dan profesional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Gratis */}
              <div className="rounded-2xl md:rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 transition-all hover:shadow-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Gratis</h4>
                </div>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span>Penyimpanan 50MB</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span>AI Assist terbatas (5x/hari)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span>Tidak ada kolaborasi tim</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span>5 template dasar</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <span>Dukungan forum komunitas</span>
                  </li>
                </ul>
              </div>

              {/* Berbayar */}
              <div className="rounded-2xl md:rounded-3xl border-2 border-blue-600 bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-xl p-6 md:p-8 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-300" />
                  </div>
                  <h4 className="text-xl font-bold">Berlangganan</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span>Penyimpanan Unlimited</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span>AI Assist tanpa batas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span>Kolaborasi multi-user realtime</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span>500+ template premium</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span>Dukungan prioritas 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 mb-16">
            {plans.map((plan) => {
              const currentPricing =
                plan.pricing[yearly ? "yearly" : "monthly"];
              const savings = yearly
                ? calculateSavings(plan.pricing.yearly, plan.pricing.monthly)
                : null;

              return (
                <div
                  key={plan.id}
                  className={[
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition hover:shadow-lg",
                    plan.highlight
                      ? "border-blue-300 shadow-xl shadow-blue-500/10"
                      : "border-slate-200 shadow-sm",
                    selectedPackage?.id === plan.id
                      ? "ring-4 ring-blue-200"
                      : "",
                  ].join(" ")}
                >
                  {/* Popular Badge */}
                  {plan.highlight && (
                    <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow">
                      Rekomendasi
                    </div>
                  )}

                  {/* Header */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
                        {plan.icon}
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {plan.badge}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {plan.subtitle}
                    </p>

                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-extrabold text-slate-900">
                        {formatPrice(currentPricing.price)}
                      </span>
                      <span className="pb-1 text-sm text-slate-500">
                        /
                        {yearly
                          ? plan.id === "edu"
                            ? "user/bln (tahunan)"
                            : "bln (tahunan)"
                          : plan.id === "edu"
                          ? "user/bln"
                          : "bln"}
                      </span>
                    </div>

                    {currentPricing.original && (
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-slate-400 line-through text-sm">
                          {formatPrice(currentPricing.original)}
                        </span>
                        {savings && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                            Hemat {savings}%
                          </span>
                        )}
                      </div>
                    )}

                    {plan.limitations && (
                      <p className="text-orange-600 text-sm font-medium">
                        {plan.limitations}
                      </p>
                    )}
                  </div>

                  <div className="mx-6 h-px bg-slate-200" />

                  {/* Benefits */}
                  <div className="px-6 sm:px-8 py-4">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Keunggulan utama:
                    </h4>
                    <ul className="space-y-2">
                      {plan.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-slate-600"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"></div>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <ul className="grid gap-3 px-6 sm:px-8 pb-6 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-slate-700"
                      >
                        {feature.included ? (
                          <Check className="mt-0.5 h-5 w-5 text-blue-600 flex-shrink-0" />
                        ) : (
                          <X className="mt-0.5 h-5 w-5 text-slate-300 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-slate-700"
                              : "text-slate-400"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                    <div className="p-6 sm:p-8 pt-0">
                    <button
                      onClick={() => handlePayment(plan)}
                      disabled={processingId === plan.id}
                      className={[
                        "inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-center text-sm font-semibold shadow transition",
                        plan.highlight
                          ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:brightness-110"
                          : processingId === plan.id
                          ? "bg-green-600 text-white"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-50",
                        "disabled:opacity-75",
                      ].join(" ")}
                    >
                      {processingId === plan.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Memproses...
                        </div>
                      ) : (
                        "Bayar Sekarang"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-8 opacity-60 text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">SSL Terenkripsi</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">10,000+ Pengguna</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* disini*/}
          {/* Why Subscribe Section */}
          <div className="relative mt-24 mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900">
                Kenapa Harus{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                  Berlangganan?
                </span>
              </h3>
              <p className="mt-3 max-w-2xl mx-auto text-slate-600">
                Kami tidak hanya menyediakan fitur, tapi juga memberikan nilai
                tambah yang membuat pekerjaan Anda lebih cepat, aman, dan
                profesional.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">
                  Produktivitas Maksimal
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Automasi dengan AI Assist, integrasi social media, dan fitur
                  premium lain yang mempercepat workflow Anda.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">
                  Keamanan Terjamin
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Semua data terenkripsi dengan standar internasional (SSL
                  256-bit, SOC 2). Privasi Anda adalah prioritas kami.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">
                  Kolaborasi Tanpa Batas
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Baik untuk individu maupun tim. Bekerja bersama secara
                  realtime dan tetap sinkron di semua perangkat.
                </p>
              </div>

              {/* Card 4 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">
                  Dukungan Premium
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tim support selalu siap membantu. Respon cepat untuk Pro,
                  prioritas untuk Edu Team.
                </p>
              </div>

              {/* Card 5 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white mb-4">
                  <Crown className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">
                  Harga Transparan
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tidak ada biaya tersembunyi. Pilihan fleksibel bulanan atau
                  tahunan dengan diskon hingga 17%.
                </p>
              </div>

              {/* Card 6 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">
                  Dipercaya Ribuan Pengguna
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Lebih dari 10,000+ profesional dan institusi telah menggunakan
                  layanan kami untuk mendukung produktivitas mereka.
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <p className="mt-8 text-center text-xs text-slate-500">
            Harga dapat berubah sewaktu-waktu. Paket Tahunan ditagihkan per
            tahun. Paket Edu Team minimal 3 pengguna.
          </p>
        </main>
      </div>

      {/* Load Snap.js from Midtrans */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || process.env.NEXT_PUBLIC_CLIENT}
      />
    </div>
  );
}

// No authentication required for frontend development
// export async function getServerSideProps(context) {
//   return { props: {} };
// }

/* ===== Komponen SidebarItem ===== */
function SidebarItem({ href, children, active }) {
  const router = useRouter();
  const validHref = href || "/"; // Default to '/' if href is undefined

  return (
    <Link
      href={validHref}
      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm ${
        active ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
      }`}
      onClick={() => router.push(validHref)}
    >
      <span className="truncate">{children}</span>
      {active && <span className="w-2 h-2 rounded-full bg-blue-600" />}
    </Link>
  );
}

/* ===== Komponen SidebarDropdown ===== */
function SidebarDropdown({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-gray-50"
      >
        <span>{label}</span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && (
        <div className="ml-4 pl-2 border-l border-gray-200 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}