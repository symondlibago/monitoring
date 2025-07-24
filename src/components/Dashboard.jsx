import { motion } from 'framer-motion'
import { 
  Receipt, 
  Wrench, 
  ClipboardList, 
  DollarSign,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const statsCards = [
  {
    title: 'Total Expenses',
    value: '₱12,450',
    change: '+12%',
    icon: Receipt,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  },
  {
    title: 'Equipment Items',
    value: '156',
    change: '+3',
    icon: Wrench,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20'
  },
  {
    title: 'Active Tasks',
    value: '24',
    change: '-2',
    icon: ClipboardList,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20'
  },
  {
    title: 'Monthly Payroll',
    value: '₱45,200',
    change: '+8%',
    icon: DollarSign,
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20'
  }
]

const recentActivities = [
  {
    type: 'expense',
    message: 'New expense added: Office Supplies',
    amount: '₱245',
    time: '2 hours ago',
    icon: Receipt,
    color: 'text-red-400'
  },
  {
    type: 'equipment',
    message: 'John Doe borrowed a screwdriver',
    time: '4 hours ago',
    icon: Wrench,
    color: 'text-green-400'
  },
  {
    type: 'task',
    message: 'General Cleaning task completed',
    time: '6 hours ago',
    icon: CheckCircle,
    color: 'text-blue-400'
  },
  {
    type: 'payroll',
    message: 'Payroll processed for 12 workers',
    amount: '₱8,400',
    time: '1 day ago',
    icon: DollarSign,
    color: 'text-yellow-400'
  }
]

const alerts = [
  {
    type: 'warning',
    message: 'Equipment maintenance due in 3 days',
    icon: AlertTriangle,
    color: 'text-yellow-400'
  },
  {
    type: 'info',
    message: '5 tools are currently borrowed',
    icon: Wrench,
    color: 'text-blue-400'
  },
  {
    type: 'success',
    message: 'All tasks for today completed',
    icon: CheckCircle,
    color: 'text-green-400'
  }
]

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">Monitor all your systems in one place</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className={`${stat.bgColor} ${stat.borderColor} border-2 hover:border-opacity-50 transition-all duration-300`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span className="text-green-400">{stat.change}</span>
                    <span className="text-gray-400">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <div className="p-2 rounded-full bg-gray-800">
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{activity.time}</span>
                        {activity.amount && (
                          <span className="text-sm font-semibold text-green-400">{activity.amount}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <span>System Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert, index) => {
                const Icon = alert.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <div className="p-2 rounded-full bg-gray-800">
                      <Icon className={`h-4 w-4 ${alert.color}`} />
                    </div>
                    <p className="text-sm text-white flex-1">{alert.message}</p>
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-blue-900/20 to-red-900/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Add Expense', icon: Receipt, color: 'from-red-500 to-red-600' },
                { label: 'Add Equipment', icon: Wrench, color: 'from-green-500 to-green-600' },
                { label: 'Create Task', icon: ClipboardList, color: 'from-purple-500 to-purple-600' },
                { label: 'Process Payroll', icon: DollarSign, color: 'from-yellow-500 to-yellow-600' }
              ].map((action, index) => {
                const Icon = action.icon
                return (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white font-medium hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-sm">{action.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Dashboard

