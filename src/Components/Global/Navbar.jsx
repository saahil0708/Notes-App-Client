import { useState, useEffect, useCallback } from "react"
import { Star, MessageCircle, LayoutDashboard, User, Home, X, ChevronDown } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import CleanAuthForm from "./Login"
import { useAuth } from '../../Context/AuthContext';

const NotesAppNavbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const location = useLocation()
  const { user, logout, setLogoutCallback } = useAuth() || {};
  const [logoutMsg, setLogoutMsg] = useState("");
  const logoutCallback = useCallback((msg) => {
    setLogoutMsg(msg);
    setTimeout(() => setLogoutMsg(""), 1500);
  }, []);
  useEffect(() => {
    if (setLogoutCallback) {
      setLogoutCallback(logoutCallback);
    }
  }, [setLogoutCallback, logoutCallback]);

  const tabs = [
    { id: "home", label: "Home", icon: Home, link: "/" },
    { id: "features", label: "Features", icon: Star, link: "/features" },
    { id: "contact", label: "Contact", icon: MessageCircle, link: "/contact" },
  ];
  const dashboardTab = { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, link: "/dashboard" };

  const openLogin = () => setIsLoginOpen(true)
  const closeLogin = () => setIsLoginOpen(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const handleProfileClick = () => setProfileDropdownOpen((open) => !open);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setShowLogoutDialog(true);
  };
  const confirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };
  const cancelLogout = () => setShowLogoutDialog(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 shadow-lg relative z-50">
        {logoutMsg && (
          <div className="absolute left-1/2 top-2 -translate-x-1/2 z-50 bg-green-500/90 text-white px-6 py-2 rounded-full shadow-lg font-semibold text-center animate-fade-in">
            {logoutMsg}
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all duration-300">
                <div className="h-6 w-6 bg-white rounded text-blue-600 flex items-center justify-center font-bold text-sm">
                  N
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold tracking-wide">NotesApp</h1>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 bg-white bg-opacity-10 rounded-full p-1 backdrop-blur-sm">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                const isActive = location.pathname === tab.link
                return (
                  <Link to={tab.link} key={tab.id} className="flex items-center">
                    <button
                      className={`${
                        isActive
                          ? "bg-white text-blue-600 shadow-lg scale-105"
                          : "text-white hover:bg-white hover:bg-opacity-20 hover:scale-105"
                      } flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  </Link>
                )
              })}
              {user && (
                <Link to={dashboardTab.link} className="flex items-center">
                  <button
                    className={`${
                      location.pathname === dashboardTab.link
                        ? "bg-white text-blue-600 shadow-lg scale-105"
                        : "text-white hover:bg-white hover:bg-opacity-20 hover:scale-105"
                    } flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform`}
                  >
                    <dashboardTab.icon className="h-4 w-4" />
                    <span className="font-medium">{dashboardTab.label}</span>
                  </button>
                </Link>
              )}
            </div>

            {/* Profile Icon */}
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <User className="h-6 w-6 text-white" />
                    <span className="text-white font-semibold max-w-[100px] truncate">{user.username}</span>
                    <ChevronDown className={`h-4 w-4 text-white transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 text-gray-700 font-semibold border-b max-w-full truncate" title={user.email}>{user.email}</div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium rounded-b-xl transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                  {showLogoutDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full text-center">
                        <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
                        <p className="mb-6 text-gray-700">Are you sure you want to logout?</p>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={confirmLogout}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                          >
                            Yes, Logout
                          </button>
                          <button
                            onClick={cancelLogout}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openLogin}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200 hover:scale-110"
                >
                  <User className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
          {/* Close Button */}
          <button
            onClick={closeLogin}
            className="absolute top-4 right-4 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Clean Auth Form */}
          <CleanAuthForm onClose={closeLogin} />
        </div>
      )}
    </>
  )
}

export default NotesAppNavbar
