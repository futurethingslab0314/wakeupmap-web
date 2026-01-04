
import React from 'react';
import { FlightData } from '../types';
import { X, PlaneLanding, Clock, Wind, Heart } from 'lucide-react';

interface FlightDetailProps {
  flight: FlightData;
  onClose: () => void;
}

const FlightDetail: React.FC<FlightDetailProps> = ({ flight, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] w-full max-w-4xl rounded-2xl border border-[#333] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image / Visual */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={flight.imageUrl} 
            alt={flight.city} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-black uppercase tracking-tighter">{flight.city_zh}</h2>
            <p className="text-sm font-mono-board opacity-70">{flight.city}, {flight.country}</p>
          </div>
        </div>

        {/* Right: Data / Announcement */}
        <div className="w-full md:w-1/2 p-8 relative flex flex-col h-[500px] md:h-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            <div className="mb-6 flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono-board ${
                flight.punctuality === 'EARLY' ? 'bg-green-900/40 text-green-400' : 
                flight.punctuality === 'DELAYED' ? 'bg-red-900/40 text-red-400' : 'bg-amber-900/40 text-amber-400'
              }`}>
                {flight.punctuality}
              </span>
              <span className="text-gray-600 text-[10px] font-mono-board uppercase">
                Log ID: {flight.dataIdentifier}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <PlaneLanding size={14} /> Captain's Announcement
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm italic font-serif">
                  "{flight.announcementText}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#252525] p-4 rounded-xl border border-[#333]">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock size={14} /> <span className="text-[10px] uppercase font-bold">Sleep Stats</span>
                  </div>
                  <div className="text-white font-mono-board">
                    {flight.sleepDuration} <span className="text-xs text-gray-500">HRS</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">Planned: {flight.plannedMinutes}m</div>
                </div>

                <div className="bg-[#252525] p-4 rounded-xl border border-[#333]">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Wind size={14} /> <span className="text-[10px] uppercase font-bold">Climate</span>
                  </div>
                  <div className="text-white font-mono-board truncate">
                    {flight.climateZoneName}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">Landed local time</div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#333]">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Heart size={16} className="text-red-500 fill-red-500" />
                      <span className="text-sm font-mono-board">Flight Feedback: {flight.flightFeedback}/5</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono-board">
                      RECORDED AT: {new Date(flight.recordedAt).toLocaleString()}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed: Using dangerouslySetInnerHTML to prevent weird JSX parsing errors in style tag */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}} />
    </div>
  );
};

export default FlightDetail;
