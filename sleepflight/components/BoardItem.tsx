
import React from 'react';
import { FlightData } from '../types';

interface BoardItemProps {
  flight: FlightData;
  onClick: (flight: FlightData) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ flight, onClick }) => {
  const statusColor = {
    EARLY: 'text-green-400',
    'ON TIME': 'text-amber-400',
    DELAYED: 'text-red-500',
  }[flight.punctuality];

  const timeStr = new Date(flight.localTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div 
      className="split-flap-row grid grid-cols-12 gap-4 py-4 px-6 cursor-pointer board-text font-mono-board uppercase text-lg items-center"
      onClick={() => onClick(flight)}
    >
      <div className="col-span-2">{timeStr}</div>
      <div className="col-span-4 truncate">{flight.city_zh} / {flight.city}</div>
      <div className="col-span-2">{flight.country_iso_code}</div>
      <div className="col-span-2 text-sm">{flight.dataIdentifier.split('_')[1].substring(0, 6)}</div>
      <div className={`col-span-2 text-right font-bold ${statusColor}`}>
        {flight.punctuality}
      </div>
    </div>
  );
};

export default BoardItem;
