import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { CloudRain, TrendingUp, ThermometerSun, Wind, Droplets } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockMarketData = [
  { name: 'Jan', price: 4000 },
  { name: 'Feb', price: 4500 },
  { name: 'Mar', price: 4200 },
  { name: 'Apr', price: 5000 },
  { name: 'May', price: 4800 },
  { name: 'Jun', price: 5500 },
];

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{t('dashboard')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t('welcome_back')}, your farm looks great today.</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white/90">{t('weather_widget')}</CardTitle>
            <CloudRain className="w-5 h-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">24°C</div>
            <p className="text-sm mt-1 text-blue-100">Light rain expected</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-blue-100">
              <span className="flex items-center"><Droplets className="w-4 h-4 mr-1"/> 65%</span>
              <span className="flex items-center"><Wind className="w-4 h-4 mr-1"/> 12 km/h</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Crop Health</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Excellent</div>
            <p className="text-sm text-green-600 font-medium mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Soil Moisture</CardTitle>
            <Droplets className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">42%</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Optimal level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Pest Risk</CardTitle>
            <ThermometerSun className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">Low</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No alerts today</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">{t('market_trends')}</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMarketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#16a34a', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">{t('smart_insights')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Irrigation Recommended', time: 'In 2 hours', type: 'info', color: 'blue' },
                { title: 'Apply Fertilizer (N-P-K)', time: 'Tomorrow morning', type: 'action', color: 'primary' },
                { title: 'Market price peak for Tomatoes', time: 'Current Trend', type: 'success', color: 'green' }
              ].map((insight, i) => (
                <div key={i} className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-dark-800/50 rounded-xl">
                  <div className={`w-2 h-2 mt-2 rounded-full bg-${insight.color}-500`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{insight.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{insight.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
