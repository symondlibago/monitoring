import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Plus, 
  ClipboardList, 
  Users, 
  Calendar, 
  Clock,
  MapPin,
  Filter,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Flag
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'

// Sample data for tasks
const initialTasks = [
  {
    id: 1,
    name: 'General Cleaning for Today',
    description: 'Complete cleaning of all office areas including restrooms and common areas',
    assignedMembers: ['John Doe', 'Jane Smith'],
    date: '2024-07-24',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Office Building - All Floors',
    status: 'In Progress',
    priority: 'High',
    progress: 65,
    category: 'Maintenance',
    estimatedHours: 4,
    actualHours: 2.6
  },
  {
    id: 2,
    name: 'Equipment Maintenance Check',
    description: 'Monthly inspection and maintenance of all power tools and equipment',
    assignedMembers: ['Mike Johnson', 'Sarah Wilson'],
    date: '2024-07-24',
    startTime: '13:00',
    endTime: '17:00',
    location: 'Tool Room A & B',
    status: 'Pending',
    priority: 'Medium',
    progress: 0,
    category: 'Maintenance',
    estimatedHours: 4,
    actualHours: 0
  },
  {
    id: 3,
    name: 'Safety Training Session',
    description: 'Quarterly safety training for all construction workers',
    assignedMembers: ['David Brown', 'Lisa Garcia', 'Tom Anderson'],
    date: '2024-07-25',
    startTime: '09:00',
    endTime: '11:00',
    location: 'Conference Room A',
    status: 'Scheduled',
    priority: 'High',
    progress: 0,
    category: 'Training',
    estimatedHours: 2,
    actualHours: 0
  },
  {
    id: 4,
    name: 'Inventory Count',
    description: 'Monthly inventory count of all tools and supplies',
    assignedMembers: ['Anna Martinez', 'Chris Lee'],
    date: '2024-07-23',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Warehouse',
    status: 'Completed',
    priority: 'Medium',
    progress: 100,
    category: 'Inventory',
    estimatedHours: 4,
    actualHours: 3.5
  },
  {
    id: 5,
    name: 'Site Inspection',
    description: 'Weekly site inspection for safety compliance and progress review',
    assignedMembers: ['Robert Taylor', 'Emily Davis'],
    date: '2024-07-26',
    startTime: '10:00',
    endTime: '14:00',
    location: 'Construction Site A',
    status: 'Scheduled',
    priority: 'High',
    progress: 0,
    category: 'Inspection',
    estimatedHours: 4,
    actualHours: 0
  },
  {
    id: 6,
    name: 'Equipment Repair',
    description: 'Repair broken drill and replace worn parts',
    assignedMembers: ['Kevin White'],
    date: '2024-07-24',
    startTime: '15:00',
    endTime: '16:30',
    location: 'Repair Shop',
    status: 'Overdue',
    priority: 'High',
    progress: 25,
    category: 'Repair',
    estimatedHours: 1.5,
    actualHours: 0.5
  }
]

const statusOptions = ['All', 'Pending', 'In Progress', 'Completed', 'Scheduled', 'Overdue']
const priorityOptions = ['All', 'Low', 'Medium', 'High', 'Critical']
const categoryOptions = ['All', 'Maintenance', 'Training', 'Inventory', 'Inspection', 'Repair']

function TaskMonitoring() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter tasks based on search term, status, priority, and category
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignedMembers.some(member => member.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           task.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus
      const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority
      const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory
    })
  }, [tasks, searchTerm, selectedStatus, selectedPriority, selectedCategory])

  // Calculate statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'Completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length
  const overdueTasks = tasks.filter(task => task.status === 'Overdue').length

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Scheduled': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Overdue': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-red-500'
      case 'High': return 'text-orange-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return CheckCircle
      case 'In Progress': return Play
      case 'Pending': return Pause
      case 'Scheduled': return Calendar
      case 'Overdue': return AlertCircle
      default: return ClipboardList
    }
  }

  const TaskCard = ({ task, index }) => {
    const StatusIcon = getStatusIcon(task.status)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.01 }}
        className="group"
      >
        <Card className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{task.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{task.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Flag className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{task.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span className="text-gray-300">{task.startTime} - {task.endTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-400" />
                  <span className="text-gray-300">{task.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span className="text-gray-300">{task.assignedMembers.length} members</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Category: </span>
                  <span className="text-white">{task.category}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Priority: </span>
                  <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${
                    task.progress === 100 ? 'bg-green-500' :
                    task.progress > 50 ? 'bg-blue-500' :
                    task.progress > 0 ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Assigned Members:</h4>
              <div className="flex flex-wrap gap-2">
                {task.assignedMembers.map((member, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">
                <span>Est: {task.estimatedHours}h</span>
                {task.actualHours > 0 && (
                  <span className="ml-2">Actual: {task.actualHours}h</span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/20">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-yellow-400 hover:bg-yellow-500/20">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/20">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Task Monitoring
          </h1>
          <p className="text-gray-400 mt-2">Track and manage all tasks and assignments</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </motion.div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Tasks', count: totalTasks, color: 'from-blue-500 to-blue-600', icon: ClipboardList },
          { title: 'Completed', count: completedTasks, color: 'from-green-500 to-green-600', icon: CheckCircle },
          { title: 'In Progress', count: inProgressTasks, color: 'from-yellow-500 to-yellow-600', icon: Play },
          { title: 'Overdue', count: overdueTasks, color: 'from-red-500 to-red-600', icon: AlertCircle }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.count}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gray-900/50 border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks, members, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {priorityOptions.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tasks Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ClipboardList className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or create a new task.</p>
        </motion.div>
      )}
    </div>
  )
}

export default TaskMonitoring

