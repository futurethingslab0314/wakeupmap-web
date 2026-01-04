
export interface FlightData {
  announcementText: string;
  appId: string;
  city: string;
  city_zh: string;
  climateZoneName: string;
  country: string;
  country_iso_code: string;
  country_zh: string;
  dataIdentifier: string;
  deviceType: string;
  direction: number;
  flightFeedback: string;
  greeting: string;
  groupName: string;
  imageUrl: string;
  isWormhole: boolean;
  language: string;
  languageCode: string;
  latitude: number;
  longitude: number;
  localTime: string;
  plannedMinutes: number;
  punctuality: 'EARLY' | 'ON TIME' | 'DELAYED';
  recordedAt: string;
  recordedDateString: string;
  sleepDuration: number;
  timezone: string;
  userDisplayName: string;
  wakeTime: string;
}

export type Tab = 'BOARD' | 'MAP';
