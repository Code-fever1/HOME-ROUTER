'use client'

import { useState, useEffect } from 'react'
import { Wifi, Download, Upload, Activity, Camera, BarChart3, CheckCircle, AlertCircle, Zap } from 'lucide-react'

interface DashboardProps {
  routers: Array<{
    id: string
    name: string
    ip: string
    color: string
    files: number
  }>
  routerStatus: Record<string, string>
  cardColors: Record<string, string>
  textColors: Record<string, string>
}

export default function Dashboard({ routers, routerStatus, cardColors, textColors }: DashboardProps) {
  const [networkStats, setNetworkStats] = useState({
    status: 'Checking...',
    downloadSpeed: '0 Mbps',
    uploadSpeed: '0 Mbps',
    onlineRouters: 0
  })

  useEffect(() => {
    // Simulate router status checking
    const checkRouters = async () => {
      let onlineCount = 0
      const BASE_SPEED = 30 // Mbps per router
      
      for (const router of routers) {
        // Simulate status check
        const isOnline = Math.random() > 0.3 // 70% chance of being online
        if (isOnline) onlineCount++
      }
      
      const totalSpeed = onlineCount * BASE_SPEED
      
      setNetworkStats({
        status: `${onlineCount} routers online`,
        downloadSpeed: `${totalSpeed} Mbps`,
        uploadSpeed: `${Math.round(totalSpeed * 0.3)} Mbps`,
        onlineRouters: onlineCount
      })
    }

    checkRouters()
    const interval = setInterval(checkRouters, 30000)
    return () => clearInterval(interval)
  }, [routers])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'online': return 'status-online'
      case 'offline': return 'status-offline'
      default: return 'status-checking'
    }
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, Syed!</h2>
        <p className="text-slate-500 mt-1">Here's what's happening with your network today.</p>
      </div>

      {/* Router Cards Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">My Routers</h3>
          <button className="text-blue-500 text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {routers.map((router) => (
            <div 
              key={router.id}
              className={`${cardColors[router.color]} rounded-2xl p-5 hover-lift cursor-pointer relative`}
            >
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-slate-400 ${getStatusClass(routerStatus[router.id])}`} />
              <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center mb-4">
                <Wifi className={`w-6 h-6 ${textColors[router.color]}`} />
              </div>
              <h4 className="font-semibold text-slate-800 mb-1">{router.name}</h4>
              <p className="text-sm text-slate-600 mb-3">{router.ip}</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${textColors[router.color]} bg-white/60 px-2 py-1 rounded-lg`}>
                  {router.files} files
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">Network Status</p>
              <p className="text-lg font-semibold text-slate-800">{networkStats.status}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">Download Speed</p>
              <p className="text-lg font-semibold text-slate-800">{networkStats.downloadSpeed}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">Upload Speed</p>
              <p className="text-lg font-semibold text-slate-800">{networkStats.uploadSpeed}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access & Recent */}
      <div className="grid grid-cols-2 gap-6">
        {/* Quick Access */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Access</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                <Camera className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-700">Security Camera</p>
                <p className="text-xs text-slate-500">Live feed available</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-700">Network Analytics</p>
                <p className="text-xs text-slate-500">View usage statistics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">D-Link connected</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">Speed test completed</p>
                <p className="text-xs text-slate-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-700">Tenda 1 restarted</p>
                <p className="text-xs text-slate-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
