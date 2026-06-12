import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button'; // Reusing cn utility

export const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-xl text-gray-950 shadow-sm dark:border-dark-700 dark:bg-dark-800/70 dark:text-gray-50 overflow-hidden",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";
