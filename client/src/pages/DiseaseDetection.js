import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Upload, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function DiseaseDetection() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Crop Disease Detection</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Upload an image of a leaf or crop to identify potential diseases.</p>
      </div>

      <Card className="border-dashed border-2 border-primary-300 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/10">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Click or drag image to upload</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
          <input type="file" className="hidden" />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              Healthy Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 dark:bg-dark-800 rounded-xl flex items-center justify-center text-gray-400">Image Gallery Placeholder</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
              Common Diseases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">Leaf Blight</span>
                <span className="text-red-500 font-medium">High Risk</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">Powdery Mildew</span>
                <span className="text-yellow-500 font-medium">Medium Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
