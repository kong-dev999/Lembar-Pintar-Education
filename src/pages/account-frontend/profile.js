import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight, ChevronDown, Menu, X } from "lucide-react";

export default function ProfilDashboard() {
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

  // Renamed the second `user` variable to `userData` to avoid conflict
  const [userData, setUserData] = useState({
    name: "Indra Pratama",
    email: "indrapratama@gmail.com",
    photo: "/images/gender/male.png",
  });

  const fileInputRef = useRef(null);

  const handleNameChange = (event) => {
    setUserData({ ...userData, name: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };

  const handlePhotoChange = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected file: ${file.name}`);
    }
  };

  const handlePasswordChange = (event) => {
    setUserData({ ...userData, password: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setUserData({ ...userData, confirmpassword: event.target.value });
  };

  const handleSave = () => {
    alert("Profile saved successfully");
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
              <SidebarItem href="/account-frontend/billing">
                Tagihan
              </SidebarItem>
              <SidebarItem href="/account-frontend/profile" active>
                Profil
              </SidebarItem>
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
            <h1 className="text-xl font-semibold">Edit Profil</h1>
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
          <div className="min-h-screen text-white flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-gray-900 bg-opacity-80 rounded-lg">
              <h1 className="text-3xl font-bold mb-6 text-center">
                Your Profile
              </h1>

              <div className="space-y-6">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={userData.photo}
                    alt="Profile Photo"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                    onClick={handlePhotoChange}
                  >
                    Change photo
                  </button>
                </div>

                {/* Name Section */}
                <div className="space-y-2 text-between">
                  <label className="block text-sm text-gray-200">Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(event) =>
                      setUserData({ ...userData, name: event.target.value })
                    }
                    className="w-full px-3 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mx-auto"
                  />
                </div>

                {/* Email Section */}
                <div className="space-y-2 text-between">
                  <label className="block text-sm text-gray-200">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(event) =>
                      setUserData({ ...userData, email: event.target.value })
                    }
                    className="w-full px-3 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mx-auto"
                  />
                </div>

                {/* Password Section */}
                <div className="space-y-2 text-between">
                  <label className="block text-sm text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mx-auto"
                  />
                </div>

                <div className="space-y-2 text-between">
                  <label className="block text-sm text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type="confirmpassword"
                    value={userData.confirmpassword}
                    onChange={handleConfirmPasswordChange}
                    className="w-full px-3 py-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 mx-auto"
                  />
                </div>

                {/* Save Button */}
                <div className="text-center">
                  <button
                    className="w-64 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 mx-auto"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
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
