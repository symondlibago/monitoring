import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Receipt, 
  Wrench, 
  ClipboardList, 
  DollarSign, 
  Menu, 
  X,
  Home,
  ChevronLeft,
  ChevronRight,
  Users,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

// Import components
import Dashboard from './components/Dashboard'
import ExpensesReceipts from './components/ExpensesReceipts'
import EquipmentInventory from './components/EquipmentInventory'
import TaskMonitoring from './components/TaskMonitoring'
import WorkersPayroll from './components/WorkersPayroll'
import Employee from './components/Employee'
import LoginPage from './components/LoginPage'

const navigationItems = [
  { path: '/', icon: Home, label: 'Dashboard', color: 'text-blue-400' },
  { path: '/expenses', icon: Receipt, label: 'Expenses & Receipts', color: 'text-red-400' },
  { path: '/inventory', icon: Wrench, label: 'Equipment Inventory', color: 'text-green-400' },
  { path: '/tasks', icon: ClipboardList, label: 'Task Monitoring', color: 'text-purple-400' },
  { path: '/payroll', icon: DollarSign, label: 'Workers Payroll', color: 'text-yellow-400' },
  { path: '/employees', icon: Users, label: 'Employee Management', color: 'text-cyan-400' },
]

function Sidebar({ isCollapsed, toggleSidebar, onLogout }) {
  const location = useLocation()

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 z-50 flex flex-col"
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 h-16">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
            >
              Monitoring Systems
            </motion.h1>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-white hover:bg-gray-800 ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.1 }}
            >
              <Link to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600/20 to-red-600/20 border border-blue-500/30' 
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-400' : item.color}`} />
                  
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-300'}`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full"
                    />
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group w-full hover:bg-red-600/20 text-red-400"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </motion.button>
      </div>

      {/* Footer status indicator */}
      <div className="p-4 border-t border-gray-700">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`${isCollapsed ? 'flex justify-center' : ''}`}
        >
          {isCollapsed ? (
            <div className="flex flex-col space-y-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <div className="p-3 bg-gradient-to-r from-blue-600/10 to-red-600/10 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">System Online</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

function MainContent({ sidebarCollapsed, onLogout }) {
  const location = useLocation()

  return (
    <motion.main
      initial={false}
      animate={{ 
        marginLeft: sidebarCollapsed ? 80 : 280,
        width: sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 280px)'
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen"
    >
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpensesReceipts />} />
          <Route path="/inventory" element={<EquipmentInventory />} />
          <Route path="/tasks" element={<TaskMonitoring />} />
          <Route path="/payroll" element={<WorkersPayroll />} />
          <Route path="/employees" element={<Employee />} />
        </Routes>
      </motion.div>
    </motion.main>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setSidebarCollapsed(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
          onLogout={handleLogout}
        />
        <MainContent 
          sidebarCollapsed={sidebarCollapsed} 
          onLogout={handleLogout}
        />
      </div>
    </Router>
  )
}

export default App

