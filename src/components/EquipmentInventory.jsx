import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Wrench, 
  Package, 
  User, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Grid,
  List,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'

// Sample data for equipment inventory
const initialEquipment = [
  {
    id: 1,
    name: 'Screwdriver Set',
    category: 'Hand Tools',
    totalQuantity: 5,
    availableQuantity: 4,
    borrowedQuantity: 1,
    image: '/api/placeholder/150/150',
    status: 'Available',
    borrowedBy: 'John Doe',
    borrowDate: '2024-07-23',
    expectedReturn: '2024-07-25',
    condition: 'Good',
    location: 'Tool Room A'
  },
  {
    id: 2,
    name: 'Electric Drill',
    category: 'Power Tools',
    totalQuantity: 3,
    availableQuantity: 2,
    borrowedQuantity: 1,
    image: '/api/placeholder/150/150',
    status: 'Partially Available',
    borrowedBy: 'Jane Smith',
    borrowDate: '2024-07-22',
    expectedReturn: '2024-07-24',
    condition: 'Excellent',
    location: 'Tool Room B'
  },
  {
    id: 3,
    name: 'Safety Helmet',
    category: 'Safety Equipment',
    totalQuantity: 10,
    availableQuantity: 7,
    borrowedQuantity: 3,
    image: '/api/placeholder/150/150',
    status: 'Available',
    borrowedBy: 'Multiple Users',
    borrowDate: '2024-07-20',
    expectedReturn: '2024-07-30',
    condition: 'Good',
    location: 'Safety Storage'
  },
  {
    id: 4,
    name: 'Measuring Tape',
    category: 'Measuring Tools',
    totalQuantity: 8,
    availableQuantity: 8,
    borrowedQuantity: 0,
    image: '/api/placeholder/150/150',
    status: 'Available',
    borrowedBy: null,
    borrowDate: null,
    expectedReturn: null,
    condition: 'Good',
    location: 'Tool Room A'
  },
  {
    id: 5,
    name: 'Circular Saw',
    category: 'Power Tools',
    totalQuantity: 2,
    availableQuantity: 0,
    borrowedQuantity: 2,
    image: '/api/placeholder/150/150',
    status: 'All Borrowed',
    borrowedBy: 'Mike Johnson',
    borrowDate: '2024-07-21',
    expectedReturn: '2024-07-26',
    condition: 'Fair',
    location: 'Tool Room B'
  },
  {
    id: 6,
    name: 'Hammer Set',
    category: 'Hand Tools',
    totalQuantity: 6,
    availableQuantity: 4,
    borrowedQuantity: 2,
    image: '/api/placeholder/150/150',
    status: 'Available',
    borrowedBy: 'Sarah Wilson',
    borrowDate: '2024-07-23',
    expectedReturn: '2024-07-25',
    condition: 'Good',
    location: 'Tool Room A'
  }
]

const categories = ['All', 'Hand Tools', 'Power Tools', 'Safety Equipment', 'Measuring Tools']
const statusOptions = ['All', 'Available', 'Partially Available', 'All Borrowed', 'Maintenance']
const conditionOptions = ['All', 'Excellent', 'Good', 'Fair', 'Poor']

function EquipmentInventory() {
  const [equipment, setEquipment] = useState(initialEquipment)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCondition, setSelectedCondition] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter equipment based on search term, category, status, and condition
  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.borrowedBy && item.borrowedBy.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus
      const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition
      
      return matchesSearch && matchesCategory && matchesStatus && matchesCondition
    })
  }, [equipment, searchTerm, selectedCategory, selectedStatus, selectedCondition])

  // Calculate totals
  const totalItems = equipment.reduce((sum, item) => sum + item.totalQuantity, 0)
  const availableItems = equipment.reduce((sum, item) => sum + item.availableQuantity, 0)
  const borrowedItems = equipment.reduce((sum, item) => sum + item.borrowedQuantity, 0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Partially Available': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'All Borrowed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Maintenance': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'text-green-400'
      case 'Good': return 'text-blue-400'
      case 'Fair': return 'text-yellow-400'
      case 'Poor': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const EquipmentCard = ({ item, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-300 h-full">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
              <Wrench className="h-12 w-12 text-gray-600" />
            </div>
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
          <p className="text-sm text-gray-400 mb-3">{item.category}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total:</span>
              <span className="text-white">{item.totalQuantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Available:</span>
              <span className="text-green-400">{item.availableQuantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Borrowed:</span>
              <span className="text-red-400">{item.borrowedQuantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Condition:</span>
              <span className={getConditionColor(item.condition)}>{item.condition}</span>
            </div>
          </div>

          {item.borrowedBy && (
            <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-white">{item.borrowedBy}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>Due: {item.expectedReturn}</span>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/20 flex-1">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" variant="ghost" className="text-yellow-400 hover:bg-yellow-500/20">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/20">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Equipment Inventory
          </h1>
          <p className="text-gray-400 mt-2">Track tools and equipment borrowing</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="text-white"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="text-white"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Items', count: totalItems, color: 'from-blue-500 to-blue-600', icon: Package },
          { title: 'Available', count: availableItems, color: 'from-green-500 to-green-600', icon: CheckCircle },
          { title: 'Borrowed', count: borrowedItems, color: 'from-red-500 to-red-600', icon: Clock }
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
                  placeholder="Search equipment, categories, or borrowers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {conditionOptions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Equipment Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredEquipment.map((item, index) => (
                <EquipmentCard key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Equipment List ({filteredEquipment.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Equipment</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Total</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Available</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Borrowed</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Condition</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredEquipment.map((item, index) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="py-3 px-4 text-white font-medium">{item.name}</td>
                          <td className="py-3 px-4 text-gray-300">{item.category}</td>
                          <td className="py-3 px-4 text-blue-400">{item.totalQuantity}</td>
                          <td className="py-3 px-4 text-green-400">{item.availableQuantity}</td>
                          <td className="py-3 px-4 text-red-400">{item.borrowedQuantity}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`${getConditionColor(item.condition)}`}>
                              {item.condition}
                            </span>
                          </td>
                          <td className="py-3 px-4">
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
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}

export default EquipmentInventory

