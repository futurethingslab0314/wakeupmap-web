
import React, { useState, useEffect } from 'react';
import { FlightData, Tab } from './types';
import { MOCK_FLIGHTS } from './constants';
import FlightBoard from './components/FlightBoard';
import TrajectoryMap from './components/TrajectoryMap';
import FlightDetail from './components/FlightDetail';
import { LayoutGrid, Map as MapIcon, Plane, Globe, Settings, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('BOARD');
  const [flights, setFlights] = useState<FlightData[]>(MOCK_FLIGHTS);
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // 從 Firebase API 載入 flight 資料
  const fetchFlightData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/get-flight-data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.flights && Array.isArray(data.flights)) {
        // 確保資料符合 FlightData 類型
        const validFlights = data.flights.filter((flight: any) => 
          flight.latitude && flight.longitude && flight.city
        ) as FlightData[];
        
        if (validFlights.length > 0) {
          setFlights(validFlights);
          setLastSyncTime(new Date());
          console.log(`✅ 成功載入 ${validFlights.length} 筆 flight 資料`);
        } else {
          console.warn('⚠️ API 返回的資料為空或格式不正確，使用備用資料');
          setFlights(MOCK_FLIGHTS);
        }
      } else {
        console.warn('⚠️ API 返回格式不正確，使用備用資料');
        setFlights(MOCK_FLIGHTS);
      }
    } catch (error) {
      console.error('❌ 載入 flight 資料失敗:', error);
      // 如果 API 失敗，使用備用資料
      setFlights(MOCK_FLIGHTS);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始載入
  useEffect(() => {
    fetchFlightData();
  }, []);

  // 定時更新資料（每30秒）
  useEffect(() => {
    const interval = setInterval(() => {
      fetchFlightData();
    }, 30000); // 30秒更新一次
    return () => clearInterval(interval);
  }, []);

  // 更新當前時間
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Bar */}
      <header className="bg-[#121212] border-b border-[#333] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="bg-[#ffb000] p-2 rounded-lg">
            <Plane className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-widest text-white leading-none">Sleep Airline</h1>
            <p className="text-[10px] font-mono-board text-gray-500 uppercase mt-1">Terminal Dashboard v2.0</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono-board text-sm">
          <div className="text-right">
            <p className="text-[#888] text-[10px] uppercase">Current Local Time</p>
            <p className="text-[#ffb000]">{currentTime.toLocaleTimeString([], { hour12: false })}</p>
          </div>
          <div className="text-right border-l border-[#333] pl-8">
            <p className="text-[#888] text-[10px] uppercase">Satellite Status</p>
            <p className="text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              ONLINE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {/* View Switcher */}
        <div className="flex gap-2 mb-8 bg-[#1a1a1a] p-1.5 rounded-xl w-fit border border-[#333]">
          <button 
            onClick={() => setActiveTab('BOARD')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
              activeTab === 'BOARD' 
                ? 'bg-[#ffb000] text-black shadow-[0_0_15px_rgba(255,176,0,0.3)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={16} /> Arrivals
          </button>
          <button 
            onClick={() => setActiveTab('MAP')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
              activeTab === 'MAP' 
                ? 'bg-[#ffb000] text-black shadow-[0_0_15px_rgba(255,176,0,0.3)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <MapIcon size={16} /> World Map
          </button>
        </div>

        {/* Dynamic View */}
        <div className="animate-in fade-in duration-700">
          {activeTab === 'BOARD' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                  <Globe className="text-[#ffb000]" size={24} />
                  Flight Arrivals Board
                </h2>
                <div className="text-[10px] font-mono-board text-gray-500 uppercase">
                  Last Sync: {lastSyncTime ? lastSyncTime.toLocaleTimeString() : 'Loading...'}
                  {isLoading && <span className="ml-2 animate-pulse">🔄</span>}
                </div>
              </div>
              <FlightBoard flights={flights} onSelectFlight={setSelectedFlight} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black uppercase text-white flex items-center gap-3">
                  <MapIcon className="text-[#ffb000]" size={24} />
                  Trajectory History
                </h2>
              </div>
              <TrajectoryMap flights={flights} />
            </div>
          )}
        </div>
      </main>

      {/* Footer info */}
      <footer className="py-6 px-8 border-t border-[#1a1a1a] text-center">
        <p className="text-[10px] font-mono-board text-gray-600 uppercase tracking-[0.2em]">
          &copy; 2026 Sleep Airline Global Operations • Distributed Systems Division
        </p>
      </footer>

      {/* Flight Detail Modal */}
      {selectedFlight && (
        <FlightDetail 
          flight={selectedFlight} 
          onClose={() => setSelectedFlight(null)} 
        />
      )}
    </div>
  );
};

export default App;
