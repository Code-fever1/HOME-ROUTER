'use client'

import { useState, useEffect } from 'react'
import { Wifi, HardDrive, Upload, Download, Search, Bell, Settings, Home, Router, Smartphone, Camera, ChevronRight, Activity, Zap, Shield } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Dashboard from '@/components/Dashboard'
import RouterDetail from '@/components/RouterDetail'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [routerStatus, setRouterStatus] = useState({})

  const routers = [
    { id: 'dlink', name: 'D-Link', ip: '10.1.10.1', color: 'pink', files: 1250 },
    { id: 'huawei', name: 'HUAWEI', ip: '100.10.10.1', color: 'blue', files: 328 },
    { id: 'tenda1', name: 'Tenda 1', ip: '100.10.10.3', color: 'green', files: 856 },
    { id: 'tenda2', name: 'Tenda 2', ip: '100.10.10.4', color: 'orange', files: 243 },
    { id: 'camera', name: 'Camera', ip: '100.10.10.2', color: 'cyan', files: 0 }
  ]

  const cardColors = {
    pink: 'bg-gradient-to-br from-pink-100 to-pink-200',
    blue: 'bg-gradient-to-br from-blue-100 to-blue-200',
    green: 'bg-gradient-to-br from-green-100 to-green-200',
    orange: 'bg-gradient-to-br from-orange-100 to-orange-200',
    cyan: 'bg-gradient-to-br from-cyan-100 to-cyan-200'
  }

  const textColors = {
    pink: 'text-pink-700',
    blue: 'text-blue-700',
    green: 'text-emerald-700',
    orange: 'text-orange-700',
    cyan: 'text-cyan-700'
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        routers={routers}
        routerStatus={routerStatus}
        cardColors={cardColors}
      />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <Dashboard 
              routers={routers}
              routerStatus={routerStatus}
              cardColors={cardColors}
              textColors={textColors}
            />
          )}
          
          {['dlink', 'huawei', 'tenda1', 'tenda2', 'camera'].includes(activeTab) && (
            <RouterDetail 
              router={routers.find(r => r.id === activeTab)}
              cardColors={cardColors}
            />
          )}
          
          {activeTab === 'devices' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Connected Devices</h2>
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <p className="text-slate-500">Device management coming soon...</p>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <p className="text-slate-500">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
