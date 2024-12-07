import { toast } from '@/components/ui/use-toast'
import { EntityError } from '@/lib/http'
import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
// import { twMerge } from 'tailwind-merge'
import jwt from 'jsonwebtoken'
import { UAParser } from 'ua-parser-js';
import { v4 as uuidv4 } from 'uuid';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload
}

/**
 * Get Devide Id and Devide Name
 */

interface DeviceInfo {
  deviceName: string;
  deviceType: string;
  os: string;
  browser: string;
}

export function getDeviceInfo(): DeviceInfo {

  if (typeof window === 'undefined') {
    // Return a default value or placeholder for SSR
    return {
      deviceName: 'Server Rendered Device',
      deviceType: 'Unknown',
      os: 'Unknown',
      browser: 'Unknown',
    };
  }

  const parser = new UAParser();
  const result = parser.getResult();

  const deviceName = `${result.device.vendor || 'Unknown'} ${result.device.model || 'Device'}`;
  const deviceType = result.device.type || 'Unknown Type';
  const os = `${result.os.name} ${result.os.version}`;
  const browser = `${result.browser.name} ${result.browser.version}`;

  return { deviceName, deviceType, os, browser };
}

export function getDeviceId(): string {
  if (typeof window === 'undefined') {
    // Handle SSR - return a default or placeholder value
    return '';
  }

  let deviceId = localStorage.getItem('deviceId');

  if (!deviceId) {
    deviceId = uuidv4(); // Generate a unique device ID
    localStorage.setItem('deviceId', deviceId); // Save it for future use
  }

  return deviceId;
}
