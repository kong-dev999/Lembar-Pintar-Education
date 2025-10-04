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
  Receipt,
  Calendar,
  Download,
  AlertCircle,
  RefreshCw,
  Eye,
  User,
  Shield,
  Crown,
  Zap,
} from "lucide-react";

export default function BillingDashboard() {
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

  const [activeTab, setActiveTab] = useState("overview");

  // Mock current subscription data
  const currentSubscription = {
    plan: "Pro",
    status: "active",
    nextBilling: "2025-09-30",
    amount: 350000,
    billingCycle: "yearly",
    renewalDate: "2025-09-30",
    daysLeft: 31,
  };

  // Mock billing history
  const billingHistory = [
    {
      id: "INV-2024-001",
      date: "2024-09-30",
      description: "Pro Plan (Tahunan)",
      amount: 350000,
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2024-002",
      date: "2024-08-30",
      description: "Pro Plan (Bulanan)",
      amount: 30000,
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-2024-003",
      date: "2024-07-30",
      description: "Pro Plan (Bulanan)",
      amount: 30000,
      status: "paid",
      downloadUrl: "#",
    },
  ];

  // Mock usage stats
  const usageStats = {
    storage: { used: 2.4, total: 100, unit: "GB" },
    aiCredits: { used: 25, total: 50, unit: "credits" },
    projects: { used: 12, total: "unlimited", unit: "projects" },
    exports: { used: 156, total: "unlimited", unit: "exports" },
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "paid":
        return "Lunas";
      case "pending":
        return "Pending";
      case "failed":
        return "Gagal";
      default:
        return status;
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
              <SidebarItem href="/account-frontend">Beranda</SidebarItem>
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

              <SidebarItem href="/account-frontend/payment">
                Pembayaran
              </SidebarItem>
              <SidebarItem href="/account-frontend/billing" active>
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
            <h1 className="text-xl font-semibold"> Tagihan</h1>
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Billing & Langganan
            </h1>
            <p className="text-slate-600 mt-2">
              Kelola langganan dan riwayat pembayaran Anda
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200 mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Overview
                </div>
              </button>
              <button
                onClick={() => setActiveTab("subscription")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "subscription"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Langganan
                </div>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "history"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4" />
                  Riwayat Pembayaran
                </div>
              </button>
              <button
                onClick={() => setActiveTab("usage")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "usage"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Usage
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Current Subscription Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h3 className="text-xl font-bold">Langganan Aktif</h3>
                      <p className="opacity-90">
                        Paket {currentSubscription.plan}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        Rp{formatPrice(currentSubscription.amount)}
                      </div>
                      <p className="opacity-90 text-sm">per tahun</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            currentSubscription.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="font-semibold text-slate-900">
                          Status
                        </span>
                      </div>
                      <p
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          currentSubscription.status
                        )}`}
                      >
                        {getStatusText(currentSubscription.status)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="font-semibold text-slate-900">
                          Renewal Berikutnya
                        </span>
                      </div>
                      <p className="text-slate-600">
                        {formatDate(currentSubscription.renewalDate)}
                      </p>
                      <p className="text-sm text-blue-600 font-medium">
                        {currentSubscription.daysLeft} hari lagi
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="w-4 h-4 text-slate-500" />
                        <span className="font-semibold text-slate-900">
                          Siklus Billing
                        </span>
                      </div>
                      <p className="text-slate-600 capitalize">
                        {currentSubscription.billingCycle === "yearly"
                          ? "Tahunan"
                          : "Bulanan"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200 flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
                      Ubah Paket
                    </button>
                    <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg font-medium transition">
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">Storage</p>
                      <p className="font-bold text-slate-900">
                        {usageStats.storage.used}/{usageStats.storage.total} GB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">AI Credits</p>
                      <p className="font-bold text-slate-900">
                        {usageStats.aiCredits.used}/{usageStats.aiCredits.total}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">Projects</p>
                      <p className="font-bold text-slate-900">
                        {usageStats.projects.used} / ∞
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm">Exports</p>
                      <p className="font-bold text-slate-900">
                        {usageStats.exports.used} / ∞
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Aktivitas Terbaru
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-medium">
                          Pembayaran berhasil
                        </p>
                        <p className="text-slate-600 text-sm">
                          Pro Plan (Tahunan) - Rp350.000
                        </p>
                      </div>
                      <span className="text-slate-500 text-sm">
                        30 Sep 2024
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-slate-900 font-medium">
                          Paket diupgrade
                        </p>
                        <p className="text-slate-600 text-sm">
                          Dari Free ke Pro Plan
                        </p>
                      </div>
                      <span className="text-slate-500 text-sm">
                        30 Sep 2024
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6">
              {/* Current Plan Details */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Detail Langganan
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                        <Crown className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">
                          Pro Plan
                        </h4>
                        <p className="text-slate-600">
                          Untuk profesional dan freelancer
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">
                        Rp{formatPrice(currentSubscription.amount)}
                      </div>
                      <p className="text-slate-600">per tahun</p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-4">
                        Fitur yang Aktif
                      </h5>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>Export PNG/PDF (1080p)</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>Tak terbatas proyek</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>Brand Kit & Font kustom</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>50 kredit AI Assist / bulan</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>Scheduler Post (IG/TikTok)</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>Tanpa watermark</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-slate-900 mb-4">
                        Informasi Billing
                      </h5>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Status
                          </label>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              currentSubscription.status
                            )}`}
                          >
                            {getStatusText(currentSubscription.status)}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Tanggal Renewal
                          </label>
                          <p className="text-slate-900">
                            {formatDate(currentSubscription.renewalDate)}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Siklus Billing
                          </label>
                          <p className="text-slate-900 capitalize">
                            {currentSubscription.billingCycle === "yearly"
                              ? "Tahunan"
                              : "Bulanan"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                      Ubah ke Paket Lain
                    </button>
                    <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition">
                      Ubah ke Bulanan
                    </button>
                    <button className="border border-red-300 hover:bg-red-50 text-red-700 px-6 py-3 rounded-lg font-medium transition">
                      Batalkan Langganan
                    </button>
                  </div>
                </div>
              </div>

              {/* Renewal Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">
                      Renewal Otomatis
                    </h4>
                    <p className="text-blue-700 mt-1">
                      Langganan Anda akan diperpanjang otomatis pada{" "}
                      {formatDate(currentSubscription.renewalDate)}. Kami akan
                      mengirim reminder 7 hari sebelumnya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Riwayat Pembayaran
                    </h3>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Download Semua
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-6 font-semibold text-slate-900">
                          Invoice
                        </th>
                        <th className="text-left py-3 px-6 font-semibold text-slate-900">
                          Tanggal
                        </th>
                        <th className="text-left py-3 px-6 font-semibold text-slate-900">
                          Deskripsi
                        </th>
                        <th className="text-left py-3 px-6 font-semibold text-slate-900">
                          Jumlah
                        </th>
                        <th className="text-left py-3 px-6 font-semibold text-slate-900">
                          Status
                        </th>
                        <th className="text-left py-3 px-6 font-semibold text-slate-900">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >
                          <td className="py-4 px-6">
                            <span className="font-mono text-sm text-slate-600">
                              {item.id}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-slate-900">
                              {formatDate(item.date)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-slate-900">
                              {item.description}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-slate-900">
                              Rp{formatPrice(item.amount)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {getStatusText(item.status)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-6">
              {/* Usage Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900">
                      Storage Usage
                    </h4>
                    <span className="text-sm text-slate-600">
                      {usageStats.storage.used} / {usageStats.storage.total} GB
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (usageStats.storage.used / usageStats.storage.total) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    {(
                      (usageStats.storage.used / usageStats.storage.total) *
                      100
                    ).toFixed(1)}
                    % terpakai
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900">AI Credits</h4>
                    <span className="text-sm text-slate-600">
                      {usageStats.aiCredits.used} / {usageStats.aiCredits.total}{" "}
                      credits
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (usageStats.aiCredits.used /
                            usageStats.aiCredits.total) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Reset pada {formatDate(currentSubscription.renewalDate)}
                  </p>
                </div>
              </div>

              {/* Detailed Usage */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Detail Penggunaan Bulan Ini
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-slate-900">
                        {usageStats.storage.used} GB
                      </h4>
                      <p className="text-slate-600 text-sm">Storage Terpakai</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-slate-900">
                        {usageStats.aiCredits.used}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        AI Credits Terpakai
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-slate-900">
                        {usageStats.projects.used}
                      </h4>
                      <p className="text-slate-600 text-sm">Total Projects</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Download className="w-8 h-8 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-slate-900">
                        {usageStats.exports.used}
                      </h4>
                      <p className="text-slate-600 text-sm">Total Exports</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Section */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="text-center">
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Butuh Bantuan?
              </h4>
              <p className="text-slate-600 mb-4">
                Tim support kami siap membantu Anda dengan segala pertanyaan
                terkait billing dan langganan.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Hubungi Support
                </button>
                <button className="border border-slate-300 hover:bg-white text-slate-700 px-6 py-3 rounded-lg font-medium transition">
                  Lihat Dokumentasi
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
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