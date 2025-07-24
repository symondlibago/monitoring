import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Plus, 
  DollarSign, 
  Users, 
  Calendar, 
  Clock,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calculator,
  CreditCard,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'

// Sample data for workers payroll
const initialPayrollRecords = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'John Doe',
    position: 'Construction Worker',
    department: 'Construction',
    payPeriod: '2024-07-01 to 2024-07-15',
    hoursWorked: 80,
    overtimeHours: 8,
    hourlyRate: 25.00,
    overtimeRate: 37.50,
    grossPay: 2300.00,
    deductions: {
      tax: 345.00,
      insurance: 150.00,
      retirement: 115.00
    },
    netPay: 1690.00,
    paymentDate: '2024-07-16',
    paymentMethod: 'Direct Deposit',
    status: 'Paid'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Jane Smith',
    position: 'Site Supervisor',
    department: 'Management',
    payPeriod: '2024-07-01 to 2024-07-15',
    hoursWorked: 80,
    overtimeHours: 12,
    hourlyRate: 35.00,
    overtimeRate: 52.50,
    grossPay: 3430.00,
    deductions: {
      tax: 514.50,
      insurance: 200.00,
      retirement: 171.50
    },
    netPay: 2544.00,
    paymentDate: '2024-07-16',
    paymentMethod: 'Direct Deposit',
    status: 'Paid'
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'Mike Johnson',
    position: 'Equipment Operator',
    department: 'Operations',
    payPeriod: '2024-07-01 to 2024-07-15',
    hoursWorked: 75,
    overtimeHours: 5,
    hourlyRate: 28.00,
    overtimeRate: 42.00,
    grossPay: 2310.00,
    deductions: {
      tax: 346.50,
      insurance: 175.00,
      retirement: 115.50
    },
    netPay: 1673.00,
    paymentDate: '2024-07-16',
    paymentMethod: 'Check',
    status: 'Paid'
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'Sarah Wilson',
    position: 'Safety Inspector',
    department: 'Safety',
    payPeriod: '2024-07-16 to 2024-07-31',
    hoursWorked: 78,
    overtimeHours: 6,
    hourlyRate: 32.00,
    overtimeRate: 48.00,
    grossPay: 2784.00,
    deductions: {
      tax: 417.60,
      insurance: 180.00,
      retirement: 139.20
    },
    netPay: 2047.20,
    paymentDate: '2024-08-01',
    paymentMethod: 'Direct Deposit',
    status: 'Processing'
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: 'David Brown',
    position: 'Maintenance Worker',
    department: 'Maintenance',
    payPeriod: '2024-07-16 to 2024-07-31',
    hoursWorked: 80,
    overtimeHours: 10,
    hourlyRate: 24.00,
    overtimeRate: 36.00,
    grossPay: 2280.00,
    deductions: {
      tax: 342.00,
      insurance: 160.00,
      retirement: 114.00
    },
    netPay: 1664.00,
    paymentDate: '2024-08-01',
    paymentMethod: 'Direct Deposit',
    status: 'Pending'
  },
  {
    id: 6,
    employeeId: 'EMP006',
    name: 'Lisa Garcia',
    position: 'Administrative Assistant',
    department: 'Administration',
    payPeriod: '2024-07-16 to 2024-07-31',
    hoursWorked: 80,
    overtimeHours: 0,
    hourlyRate: 22.00,
    overtimeRate: 33.00,
    grossPay: 1760.00,
    deductions: {
      tax: 264.00,
      insurance: 140.00,
      retirement: 88.00
    },
    netPay: 1268.00,
    paymentDate: '2024-08-01',
    paymentMethod: 'Direct Deposit',
    status: 'Pending'
  }
]

const statusOptions = ['All', 'Paid', 'Processing', 'Pending', 'On Hold']
const departmentOptions = ['All', 'Construction', 'Management', 'Operations', 'Safety', 'Maintenance', 'Administration']
const paymentMethodOptions = ['All', 'Direct Deposit', 'Check', 'Cash']

function WorkersPayroll() {
  const [payrollRecords, setPayrollRecords] = useState(initialPayrollRecords)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)

  // Filter payroll records based on search term, status, department, and payment method
  const filteredRecords = useMemo(() => {
    return payrollRecords.filter(record => {
      const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.department.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedStatus === 'All' || record.status === selectedStatus
      const matchesDepartment = selectedDepartment === 'All' || record.department === selectedDepartment
      const matchesPaymentMethod = selectedPaymentMethod === 'All' || record.paymentMethod === selectedPaymentMethod
      
      return matchesSearch && matchesStatus && matchesDepartment && matchesPaymentMethod
    })
  }, [payrollRecords, searchTerm, selectedStatus, selectedDepartment, selectedPaymentMethod])

  // Calculate totals
  const totalGrossPay = filteredRecords.reduce((sum, record) => sum + record.grossPay, 0)
  const totalNetPay = filteredRecords.reduce((sum, record) => sum + record.netPay, 0)
  const totalDeductions = filteredRecords.reduce((sum, record) => 
    sum + record.deductions.tax + record.deductions.insurance + record.deductions.retirement, 0)
  const totalHours = filteredRecords.reduce((sum, record) => sum + record.hoursWorked + record.overtimeHours, 0)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'On Hold': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return CheckCircle
      case 'Processing': return Clock
      case 'Pending': return AlertCircle
      case 'On Hold': return AlertCircle
      default: return Clock
    }
  }

  const PayrollCard = ({ record, index }) => {
    const StatusIcon = getStatusIcon(record.status)
    const totalDeductions = record.deductions.tax + record.deductions.insurance + record.deductions.retirement
    
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
                <h3 className="text-lg font-semibold text-white mb-1">{record.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{record.position}</p>
                <p className="text-xs text-gray-500">{record.employeeId} • {record.department}</p>
              </div>
              <div className="flex items-center space-x-2">
                <StatusIcon className="h-4 w-4 text-yellow-400" />
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-400">Pay Period:</span>
                  <p className="text-white text-xs">{record.payPeriod}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Hours Worked:</span>
                  <p className="text-white">{record.hoursWorked}h + {record.overtimeHours}h OT</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Hourly Rate:</span>
                  <p className="text-white">₱{record.hourlyRate}/hr</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-400">Payment Date:</span>
                  <p className="text-white">{record.paymentDate}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Payment Method:</span>
                  <p className="text-white">{record.paymentMethod}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Overtime Rate:</span>
                  <p className="text-white">₱{record.overtimeRate}/hr</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Gross Pay</p>
                  <p className="text-lg font-semibold text-green-400">₱{record.grossPay.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Deductions</p>
                  <p className="text-lg font-semibold text-red-400">-₱{totalDeductions.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Net Pay</p>
                  <p className="text-lg font-semibold text-blue-400">₱{record.netPay.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Deduction Breakdown:</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-gray-800/30 rounded p-2 text-center">
                  <p className="text-gray-400">Tax</p>
                  <p className="text-red-400">₱{record.deductions.tax.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800/30 rounded p-2 text-center">
                  <p className="text-gray-400">Insurance</p>
                  <p className="text-red-400">₱{record.deductions.insurance.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800/30 rounded p-2 text-center">
                  <p className="text-gray-400">Retirement</p>
                  <p className="text-red-400">₱{record.deductions.retirement.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">
                <span>Total Hours: {record.hoursWorked + record.overtimeHours}</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/20">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-yellow-400 hover:bg-yellow-500/20">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-green-400 hover:bg-green-500/20">
                  <Download className="h-4 w-4" />
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Workers' Payroll
          </h1>
          <p className="text-gray-400 mt-2">Monitor payroll records and payments</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Process Payroll
          </Button>
        </motion.div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Gross Pay', amount: totalGrossPay, color: 'from-green-500 to-green-600', icon: DollarSign },
          { title: 'Total Net Pay', amount: totalNetPay, color: 'from-blue-500 to-blue-600', icon: CreditCard },
          { title: 'Total Deductions', amount: totalDeductions, color: 'from-red-500 to-red-600', icon: Calculator },
          { title: 'Total Hours', amount: totalHours, color: 'from-purple-500 to-purple-600', icon: Clock, isHours: true }
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
                      <p className="text-2xl font-bold text-white">
                        {stat.isHours ? `${stat.amount}h` : `₱${stat.amount.toFixed(2)}`}
                      </p>
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
                  placeholder="Search employees, positions, or departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {departmentOptions.map(department => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>

                <select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none appearance-none cursor-pointer"
                >
                  {paymentMethodOptions.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>

                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payroll Records Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredRecords.map((record, index) => (
              <PayrollCard key={record.id} record={record} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {filteredRecords.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <DollarSign className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No payroll records found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or process new payroll.</p>
        </motion.div>
      )}
    </div>
  )
}

export default WorkersPayroll

