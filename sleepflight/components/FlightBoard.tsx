
import React from 'react';
import { FlightData } from '../types';
import BoardItem from './BoardItem';

interface FlightBoardProps {
  flights: FlightData[];
  onSelectFlight: (flight: FlightData) => void;
}

const FlightBoard: React.FC<FlightBoardProps> = ({ flights, onSelectFlight }) => {
  return (
    <div className="w-full bg-[#121212] rounded-lg border border-[#333] overflow-hidden shadow-2xl">
      {/* Board Header */}
      {/* Fixed: changed border-bottom to border-b */}
      <div className="grid grid-cols-12 gap-4 py-3 px-6 bg-[#1a1a1a] border-b border-[#444] text-[#888] font-mono-board text-xs uppercase tracking-widest">
        <div className="col-span-2">Time</div>
        <div className="col-span-4">Destination</div>
        <div className="col-span-2">Origin</div>
        <div className="col-span-2">Flight ID</div>
        <div className="col-span-2 text-right">Remark</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#1f1f1f]">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <BoardItem 
              key={flight.dataIdentifier} 
              flight={flight} 
              onClick={onSelectFlight} 
            />
          ))
        ) : (
          <div className="py-20 text-center text-[#555] font-mono-board uppercase italic">
            No incoming data...
          </div>
        )}
      </div>

      {/* Footer / Ticker */}
      <div className="bg-[#050505] py-2 px-6 border-t border-[#333]">
        <div className="overflow-hidden whitespace-nowrap">
          <p className="inline-block animate-[marquee_20s_linear_infinite] text-[#444] text-xs font-mono-board">
            SYSTEM STATUS: OPERATIONAL • SATELLITE LINK: ACTIVE • DATA SYNC: REAL-TIME • SLEEP AIRLINE GLOBAL NETWORK • TOTAL FLIGHTS: {flights.length} • CURRENT USER: PI USER
          </p>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default FlightBoard;
