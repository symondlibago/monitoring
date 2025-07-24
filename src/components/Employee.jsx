import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Plus, 
  Users, 
  UserCheck, 
  Clock, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [positionFilter, setPositionFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')

  // Sample employee data
  const employees = [
    {
      id: 'EMP001',
      name: 'John Doe',
      age: 32,
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      position: 'Construction Worker',
      department: 'Construction',
      yearStarted: 2020,
      status: 'Regular',
      avatar: 'JD'
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      age: 28,
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      position: 'Site Supervisor',
      department: 'Management',
      yearStarted: 2019,
      status: 'Regular',
      avatar: 'JS'
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      age: 35,
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, Chicago, IL 60601',
      position: 'Equipment Operator',
      department: 'Operations',
      yearStarted: 2021,
      status: 'Regular',
      avatar: 'MJ'
    },
    {
      id: 'EMP004',
      name: 'Sarah Wilson',
      age: 29,
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, Houston, TX 77001',
      position: 'Safety Inspector',
      department: 'Safety',
      yearStarted: 2022,
      status: 'Regular',
      avatar: 'SW'
    },
    {
      id: 'EMP005',
      name: 'David Brown',
      age: 26,
      phone: '+1 (555) 567-8901',
      address: '654 Maple Dr, Phoenix, AZ 85001',
      position: 'Maintenance Worker',
      department: 'Maintenance',
      yearStarted: 2023,
      status: 'Under Probation',
      avatar: 'DB'
    },
    {
      id: 'EMP006',
      name: 'Lisa Garcia',
      age: 31,
      phone: '+1 (555) 678-9012',
      address: '987 Cedar Ln, Philadelphia, PA 19101',
      position: 'Administrative Assistant',
      department: 'Administration',
      yearStarted: 2018,
      status: 'Regular',
      avatar: 'LG'
    },
    {
      id: 'EMP007',
      name: 'Tom Anderson',
      age: 24,
      phone: '+1 (555) 789-0123',
      address: '147 Birch St, San Antonio, TX 78201',
      position: 'Junior Engineer',
      department: 'Engineering',
      yearStarted: 2024,
      status: 'Under Probation',
      avatar: 'TA'
    },
    {
      id: 'EMP008',
      name: 'Emily Davis',
      age: 33,
      phone: '+1 (555) 890-1234',
      address: '258 Spruce Ave, San Diego, CA 92101',
      position: 'Project Manager',
      department: 'Management',
      yearStarted: 2017,
      status: 'Regular',
      avatar: 'ED'
    }
  ]

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || employee.status === statusFilter
    const matchesPosition = positionFilter === 'All' || employee.position === positionFilter
    const matchesDepartment = departmentFilter === 'All' || employee.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesPosition && matchesDepartment
  })

  // Calculate statistics
  const totalEmployees = employees.length
  const regularEmployees = employees.filter(emp => emp.status === 'Regular').length
  const probationEmployees = employees.filter(emp => emp.status === 'Under Probation').length

  // Get unique values for filters
  const positions = [...new Set(employees.map(emp => emp.position))]
  const departments = [...new Set(employees.map(emp => emp.department))]

  const getStatusColor = (status) => {
    return status === 'Regular' ? 'text-green-400' : 'text-yellow-400'
  }

  const getStatusBadge = (status) => {
    return status === 'Regular' 
      ? 'bg-green-600/20 text-green-400 border-green-500/30' 
      : 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Employee Management
          </h1>
          <p className="text-gray-400 mt-1">Manage and track all employee information</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-600/10 to-blue-800/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Employees</p>
                <p className="text-3xl font-bold text-white">{totalEmployees}</p>
                <p className="text-sm text-blue-400 mt-1">Active workforce</p>
              </div>
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/10 to-green-800/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Regular Employees</p>
                <p className="text-3xl font-bold text-white">{regularEmployees}</p>
                <p className="text-sm text-green-400 mt-1">Permanent staff</p>
              </div>
              <div className="p-3 bg-green-600/20 rounded-lg">
                <UserCheck className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-600/10 to-yellow-800/10 border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Under Probation</p>
                <p className="text-3xl font-bold text-white">{probationEmployees}</p>
                <p className="text-sm text-yellow-400 mt-1">Probationary period</p>
              </div>
              <div className="p-3 bg-yellow-600/20 rounded-lg">
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees, positions, or departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
          >
            <option value="All">All Status</option>
            <option value="Regular">Regular</option>
            <option value="Under Probation">Under Probation</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
          >
            <option value="All">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Employee Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group"
          >
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6">
                {/* Employee Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {employee.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{employee.name}</h3>
                    <p className="text-sm text-gray-400">{employee.id}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(employee.status)}`}>
                    {employee.status}
                  </div>
                </div>

                {/* Employee Details */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Briefcase className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">{employee.position}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Age: {employee.age} • Started: {employee.yearStarted}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">{employee.phone}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-red-400 mt-0.5" />
                    <span className="text-gray-300 line-clamp-2">{employee.address}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-700">
                  <Button size="sm" variant="outline" className="flex-1 border-blue-600/30 text-blue-400 hover:bg-blue-600/20">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 border-green-600/30 text-green-400 hover:bg-green-600/20">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600/30 text-red-400 hover:bg-red-600/20">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredEmployees.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No employees found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </motion.div>
      )}
    </div>
  )
}

export default Employee

