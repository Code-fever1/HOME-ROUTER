'use client'

import { useState } from 'react'
import { Wifi, RefreshCw, Key } from 'lucide-react'

interface RouterDetailProps {
  router: {
    id: string
    name: string
    ip: string
    color: string
    files: number
  } | undefined
  cardColors: Record<string, string>
}

export default function RouterDetail({ router, cardColors }: RouterDetailProps) {
  const [isLoading, setIsLoading] = useState(false)

  if (!router) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">Router not found</p>
      </div>
    )
  }

  const handleAutoLogin = () => {
    setIsLoading(true)
    // Simulate auto-login functionality
    setTimeout(() => {
      setIsLoading(false)
      alert('Auto-login functionality would be implemented here')
    }, 1000)
  }

  const handleReload = () => {
    setIsLoading(true)
    // Simulate reload functionality
    setTimeout(() => {
      setIsLoading(false)
      alert('Reload functionality would be implemented here')
    }, 1000)
  }

  const getIcon = () => {
    switch (router.id) {
      case 'dlink': return '📡'
      case 'huawei': return '📶'
      case 'camera': return '📷'
      default: return '📶'
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 h-[calc(100vh-180px)] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${cardColors[router.color]} flex items-center justify-center`}>
            <span className="text-xl">{getIcon()}</span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">
              {router.id === 'camera' ? 'Security Camera' : `${router.name} Router`}
            </h2>
            <p className="text-sm text-slate-500">{router.ip}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAutoLogin}
            disabled={isLoading}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-sm font-medium transition flex items-center gap-2 disabled:opacity-50"
          >
            <Key className="w-4 h-4" />
            {isLoading ? 'Processing...' : 'Auto-login'}
          </button>
          <button 
            onClick={handleReload}
            disabled={isLoading}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-sm font-medium transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Reload
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="w-full h-full border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <Wifi className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              {router.name} Interface
            </h3>
            <p className="text-slate-500 mb-4">
              Router web interface would be displayed here
            </p>
            <div className="bg-slate-100 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-slate-600 mb-2">
                <strong>URL:</strong> http://{router.ip}
              </p>
              <p className="text-sm text-slate-600 mb-2">
                <strong>Status:</strong> Connected
              </p>
              <p className="text-sm text-slate-600">
                <strong>Files:</strong> {router.files}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
