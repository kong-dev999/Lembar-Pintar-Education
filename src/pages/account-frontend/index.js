// pages/account-frontend/index.js - Simplified for Frontend Team
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronDown, ChevronRight, ChevronLeft, Menu, X } from "lucide-react";

export default function AccountDashboard() {
  // Mock user data for frontend development
  const user = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      image: "/images/gender/male.png",
    },
  };
  const router = useRouter();
  const [tab, setTab] = useState("education");
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // desktop
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown menu

  const toggleMobileSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const features = {
    education: [
      {
        title: "Infografis",
        desc: "Visual ringkas untuk materi pembelajaran.",
        img: "/images/dashboard_user/edu01.png",
        badge: null,
        href: "#",
      },
      {
        title: "Video Edukasi",
        desc: "Video singkat untuk menjelaskan konsep.",
        img: "/images/dashboard_user/edu02.png",
        badge: "Populer",
        href: "#",
      },
      {
        title: "Animasi",
        desc: "Pembelajaran interaktif dengan animasi.",
        img: "/images/dashboard_user/edu03.png",
        badge: null,
        href: "#",
      },
      {
        title: "Materi Interaktif",
        desc: "Konten interaktif untuk melatih pemahaman.",
        img: "/images/dashboard_user/edu04.png",
        badge: null,
        href: "#",
      },
      {
        title: "Kuis",
        desc: "Uji pemahaman dengan soal singkat.",
        img: "/images/dashboard_user/edu05.png",
        badge: null,
        href: "#",
      },
      {
        title: "Poster Edukatif",
        desc: "Poster visual untuk meningkatkan literasi.",
        img: "/images/dashboard_user/edu06.png",
        badge: null,
        href: "#",
      },
      {
        title: "Hari Pendidikan",
        desc: "Konten spesial untuk momen penting pendidikan.",
        img: "/images/dashboard_user/edu07.png",
        badge: null,
        href: "#",
      },
      {
        title: "Slide Pembelajaran",
        desc: "Buat presentasi materi dengan mudah.",
        img: "/images/dashboard_user/edu08.png",
        badge: null,
        href: "#",
      },
      {
        title: "Kutipan Inspiratif",
        desc: "Kutipan motivasi untuk semangat belajar.",
        img: "/images/dashboard_user/edu09.png",
        badge: null,
        href: "#",
      },
    ],

    ecommerce: [
      {
        title: "Avatar e-com",
        desc: "Iklan & ulasan produk otomatis.",
        img: "/images/dashboard_user/ecom01.png",
        badge: "Baru",
        href: "#",
      },
      {
        title: "Katalog Produk",
        desc: "Template katalog produk siap posting.",
        img: "/images/dashboard_user/ecom02.png",
        badge: null,
        href: "#",
      },
    ],
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
              <SidebarItem href="/account-frontend" active>
                Beranda
              </SidebarItem>
              <SidebarItem href="/account-frontend/design">
                Desain Saya
              </SidebarItem>

              <div className="border-t border-gray-200 my-2 pt-2">
                <SidebarDropdown label="Template">
                  <SidebarDropdown label="SD">
                    <SidebarItem href="/kelas/SD/1">
                      Kelas 1
                    </SidebarItem>
                    <SidebarItem href="/kelas/SD/2">
                      Kelas 2
                    </SidebarItem>
                    <SidebarItem href="/kelas/SD/3">
                      Kelas 3
                    </SidebarItem>
                    <SidebarItem href="/kelas/SD/4">
                      Kelas 4
                    </SidebarItem>
                    <SidebarItem href="/kelas/SD/5">
                      Kelas 5
                    </SidebarItem>
                    <SidebarItem href="/kelas/SD/6">
                      Kelas 6
                    </SidebarItem>
                  </SidebarDropdown>
                  <SidebarDropdown label="SMP">
                    <SidebarItem href="/kelas/SMP/7">
                      Kelas 7
                    </SidebarItem>
                    <SidebarItem href="/kelas/SMP/8">
                      Kelas 8
                    </SidebarItem>
                    <SidebarItem href="/kelas/SMP/9">
                      Kelas 9
                    </SidebarItem>
                  </SidebarDropdown>
                  <SidebarDropdown label="SMA">
                    <SidebarItem href="/kelas/SMA/10">
                      Kelas 10
                    </SidebarItem>
                    <SidebarItem href="/kelas/SMA/11">
                      Kelas 11
                    </SidebarItem>
                    <SidebarItem href="/kelas/SMA/12">
                      Kelas 12
                    </SidebarItem>
                  </SidebarDropdown>
                  <SidebarItem href="/PerguruanTinggi">
                    Perguruan Tinggi
                  </SidebarItem>
                </SidebarDropdown>
              </div>

              <SidebarItem href="/account-frontend/payment">
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
            <h1 className="text-xl font-semibold">Buat Postingan Baru</h1>
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
                      onClick={() => router.push("account-frontend/profile")}
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
          {/* Hero */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <HeroCard
              title="Avatar Advertisement"
              desc={
                <>
                  Buat video UGC untuk{" "}
                  <a className="underline" href="#">
                    bercerita
                  </a>{" "}
                  dan{" "}
                  <a className="underline" href="#">
                    iklan
                  </a>
                </>
              }
              img="/images/dashboard_user/vedio_avatar.png"
              tone="red"
            />
            <HeroCard
              title="Avatar Animation"
              desc={
                <>
                  Auto-Generate{" "}
                  <a className="underline" href="#">
                    Iklan video produk
                  </a>{" "}
                  &{" "}
                  <a className="underline" href="#">
                    Ulasan Produk
                  </a>{" "}
                  dengan AI
                </>
              }
              img="/images/dashboard_user/avatar_ecom.png"
              tone="blue"
            />
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex gap-6 px-1">
              <TabButton
                active={tab === "education"}
                onClick={() => setTab("education")}
              >
                Education
              </TabButton>
              <TabButton
                active={tab === "ecommerce"}
                onClick={() => setTab("ecommerce")}
              >
                Ecommerce
              </TabButton>
            </div>
          </div>

          {/* Grid fitur */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {features[tab].map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </section>
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
  const validHref = href || '/'; // Default to '/' if href is undefined

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

/* ===== Komponen lain ===== */
function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative py-2 text-sm ${
        active ? "text-blue-700" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
      {active && (
        <span className="absolute left-0 -bottom-px h-[3px] w-full rounded-full bg-blue-600" />
      )}
    </button>
  );
}

function HeroCard({
  title,
  desc,
  img,
  tone = "pink",
  titleRightOffset = "4",
  descRightOffset = "8",
}) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg bg-${tone}-100 p-5`}
    >
      <img
        src={img}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="absolute top-6 right-6 bg-opacity-90 bg-white p-2 rounded-lg shadow-md w-[90%]">
        <h3
          className={`text-lg font-bold text-gray-800 right-${titleRightOffset}`}
        >
          {title}
        </h3>
        <p className={`text-sm text-gray-800 right-${descRightOffset}`}>
          {desc}
        </p>
        <div className="mt-2 bg-blue-500 rounded-md inline-block">
          <button className="text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-600">
            Buat Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, img, href, badge }) {
  return (
    <div className="group rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{title}</h4>
          {badge && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-700">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{desc}</p>
        <div className="pt-2">
          <Link
            href={href}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-500"
          >
            Buat sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
