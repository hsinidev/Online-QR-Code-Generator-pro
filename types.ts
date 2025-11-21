
export enum QRCodeType {
  URL = 'URL',
  TEXT = 'Text',
  EMAIL = 'Email',
  PHONE = 'Phone',
  SMS = 'SMS',
  WIFI = 'Wi-Fi',
  VCARD = 'vCard',
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  position: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface SmsData {
  phone: string;
  message: string;
}
