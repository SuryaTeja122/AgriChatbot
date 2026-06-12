import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, MapPin, Phone, Mail } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Farmer Profile</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your personal details and farm information.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-none shadow-md">
          <CardContent className="flex flex-col items-center pt-8">
            <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-4xl text-primary-600 dark:text-primary-400 font-bold mb-4">
              U
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Raju</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Premium Farmer</p>
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2" /> Telangana, India
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Phone className="w-4 h-4 mr-2" /> +91 9876543210
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 mr-2" /> raju@example.com
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Farm Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Farm Size (Acres)</label>
                <Input defaultValue="15" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary Crop</label>
                <Input defaultValue="Cotton" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Soil Type</label>
                <select className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-dark-700 dark:bg-dark-900">
                  <option>Black Soil</option>
                  <option>Red Soil</option>
                  <option>Alluvial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Irrigation Method</label>
                <select className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-dark-700 dark:bg-dark-900">
                  <option>Drip Irrigation</option>
                  <option>Sprinkler</option>
                  <option>Rainfed</option>
                </select>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
