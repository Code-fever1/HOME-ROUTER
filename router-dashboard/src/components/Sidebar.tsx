'use client'

import { Home, Router, Smartphone, Camera, Settings, Wifi, HardDrive } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  routers: Array<{
    id: string
    name: string
    ip: string
    color: string
    files: number
  }>
  routerStatus: Record<string, string>
  cardColors: Record<string, string>
}

export default function Sidebar({ activeTab, setActiveTab, routers, routerStatus, cardColors }: SidebarProps) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'online': return 'status-online'
      case 'offline': return 'status-offline'
      default: return 'status-checking'
    }
  }

  return (
    <aside className="w-64 glass-sidebar flex flex-col">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Syed Alijah</h1>
            <p className="text-slate-400 text-xs">Home Network</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 px-3">Menu</div>
        
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 transition-all ${
            activeTab === 'dashboard' ? 'active' : ''
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>
        
        <button
          onClick={() => setActiveTab('routers')}
          className={`sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 transition-all ${
            activeTab === 'routers' ? 'active' : ''
          }`}
        >
          <Router className="w-5 h-5" />
          <span className="font-medium">My Routers</span>
        </button>
        
        <button
          onClick={() => setActiveTab('devices')}
          className={`sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 transition-all ${
            activeTab === 'devices' ? 'active' : ''
          }`}
        >
          <Smartphone className="w-5 h-5" />
          <span className="font-medium">Devices</span>
        </button>
        
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-8 mb-4 px-3">Routers</div>
        
        {routers.map((router) => (
          <button
            key={router.id}
            onClick={() => setActiveTab(router.id)}
            className={`sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 transition-all ${
              activeTab === router.id ? 'active' : ''
            }`}
          >
            <div className={`w-2 h-2 rounded-full bg-${router.color}-400`} />
            <span className="font-medium">{router.name}</span>
            <span className={`ml-auto w-2 h-2 rounded-full ${getStatusClass(routerStatus[router.id])}`} />
          </button>
        ))}
      </nav>

      {/* Storage Info */}
      <div className="p-4 border-t border-slate-800/50">
        <div className="bg-slate-800/50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-300 text-sm font-medium">Storage</span>
            <span className="text-blue-400 text-xs font-medium">75%</span>
          </div>
          <div className="gauge-container mx-auto">
            <svg viewBox="0 0 140 80" className="w-full h-full">
              <path d="M 10 70 A 60 60 0 0 1 130 70" className="gauge-bg"/>
              <path d="M 10 70 A 60 60 0 0 1 100 20" className="gauge-fill" strokeDasharray="100 200"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-2xl font-bold text-white">63</span>
              <span className="text-xs text-slate-400">GB used</span>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"/>
                <span className="text-slate-400">Documents</span>
              </div>
              <span className="text-slate-300">8 GB</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                <span className="text-slate-400">Images</span>
              </div>
              <span className="text-slate-300">2 GB</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"/>
                <span className="text-slate-400">Media</span>
              </div>
              <span className="text-slate-300">11 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings at bottom */}
      <div className="p-4 border-t border-slate-800/50">
        <button
          onClick={() => setActiveTab('settings')}
          className={`sidebar-item w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-800/50 transition-all ${
            activeTab === 'settings' ? 'active' : ''
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}
