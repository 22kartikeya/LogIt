export const DateUtils = {
  formatDate: (timestamp: number, format: 'short' | 'long' = 'short'): string => {
    const date = new Date(timestamp);
    
    if (format === 'short') {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  formatTime: (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  isToday: (timestamp: number): boolean => {
    const today = new Date();
    const date = new Date(timestamp);
    
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  },

  isThisWeek: (timestamp: number): boolean => {
    const today = new Date();
    const date = new Date(timestamp);
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    
    return date >= startOfWeek && date <= endOfWeek;
  },

  getDaysAgo: (timestamp: number): number => {
    const today = new Date();
    const date = new Date(timestamp);
    const timeDiff = today.getTime() - date.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  },

  getWeekStart: (date: Date = new Date()): Date => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    return new Date(start.setDate(diff));
  },

  getMonthStart: (date: Date = new Date()): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  },

  getDurationString: (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${remainingMinutes}m`;
  },
};