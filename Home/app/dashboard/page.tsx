'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar } from '@/components/custom/Sidebar';
import { TopNavbar } from '@/components/custom/TopNavbar';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { BandwidthChart } from '@/components/custom/BandwidthChart';
import { Router, Wifi, Monitor, AlertCircle, Activity } from 'lucide-react';
import { useRouterStore } from '@/store/routerStore';
import { useDeviceStore } from '@/store/deviceStore';
import { useNetworkStore } from '@/store/networkStore';
import { useWebSocket } from '@/lib/websocket';
import { NetworkEvent } from '@/types/network';

function DashboardContent() {
  const { routers, fetchRouters } = useRouterStore();
  const { devices, fetchDevices } = useDeviceStore();
  const { status, bandwidthHistory, fetchNetworkStatus, addBandwidthData, addNetworkEvent } = useNetworkStore();

  useEffect(() => {
    fetchRouters();
    fetchDevices();
    fetchNetworkStatus();
  }, [fetchRouters, fetchDevices, fetchNetworkStatus]);

  useWebSocket('router_status_update', (data) => {
    const update = data as { routerId: string; status: string };
    useRouterStore.getState().updateRouter(update.routerId, { status: update.status as any });
  });

  useWebSocket('device_connected', (data) => {
    useDeviceStore.getState().addDevice(data as any);
  });

  useWebSocket('device_disconnected', (data) => {
    const update = data as { deviceId: string };
    useDeviceStore.getState().updateDeviceStatus(update.deviceId, 'offline');
  });

  useWebSocket('bandwidth_update', (data) => {
    const update = data as { timestamp: string; download: number; upload: number };
    addBandwidthData(update);
  });

  useWebSocket('network_event', (data) => {
    addNetworkEvent(data as NetworkEvent);
  });

  const onlineRouters = routers.filter((r) => r.status === 'online').length;
  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const totalBandwidth = bandwidthHistory.length > 0
    ? bandwidthHistory[bandwidthHistory.length - 1].download + bandwidthHistory[bandwidthHistory.length - 1].upload
    : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Routers</CardTitle>
            <Router className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{routers.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-500">{onlineRouters}</span> online
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Connected Devices</CardTitle>
            <Monitor className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">{onlineDevices}</div>
            <p className="text-xs text-slate-500 mt-1">
              of {devices.length} total devices
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Internet Status</CardTitle>
            <Wifi className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">Online</div>
            <p className="text-xs text-slate-500 mt-1">
              WAN: {status?.wanIp || '192.168.1.1'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Current Bandwidth</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">
              {(totalBandwidth / 1024 / 1024).toFixed(1)} MB/s
            </div>
            <p className="text-xs text-slate-500 mt-1">Network activity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BandwidthChart data={bandwidthHistory} />

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-500">High CPU Usage</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Huawei HG8245W5 CPU usage is at 85%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                <Wifi className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-300">Device Connected</p>
                  <p className="text-xs text-slate-400 mt-1">
                    iPhone 15 Pro connected to Tenda N301
                  </p>
                  <p className="text-xs text-slate-500 mt-1">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                <Router className="w-4 h-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-300">Router Rebooted</p>
                  <p className="text-xs text-slate-400 mt-1">
                    D-Link X1852E completed scheduled reboot
                  </p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <div className="lg:ml-64">
        <TopNavbar />
        <main>
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
