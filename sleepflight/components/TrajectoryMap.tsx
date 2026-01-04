
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FlightData } from '../types';

interface TrajectoryMapProps {
  flights: FlightData[];
}

const TrajectoryMap: React.FC<TrajectoryMapProps> = ({ flights }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.parentElement?.clientWidth || 960;
    const height = 500;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll("*").remove();

    const projection = d3.geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Load world data
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then((data: any) => {
      // Draw world
      svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("d", path)
          .attr("fill", "#1a1a1a")
          .attr("stroke", "#333")
          .attr("stroke-width", 0.5);

      // Draw flight paths
      const sortedFlights = [...flights].sort((a, b) => 
        new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
      );

      // Helper to generate arc
      const line = d3.line()
        .x((d: any) => projection([d[0], d[1]])![0])
        .y((d: any) => projection([d[0], d[1]])![1])
        .curve(d3.curveBasis);

      // Draw lines between consecutive flights
      for (let i = 0; i < sortedFlights.length - 1; i++) {
        const start = sortedFlights[i];
        const end = sortedFlights[i+1];
        
        const coords: [number, number][] = [
          [start.longitude, start.latitude],
          [(start.longitude + end.longitude) / 2, (start.latitude + end.latitude) / 2 + 10], // curvature
          [end.longitude, end.latitude]
        ];

        svg.append("path")
          .datum(coords)
          .attr("d", line as any)
          .attr("fill", "none")
          .attr("stroke", "rgba(255, 176, 0, 0.4)")
          .attr("stroke-width", 1.5)
          .attr("stroke-dasharray", "4,4")
          .style("opacity", 0)
          .transition()
          .delay(i * 500)
          .duration(1000)
          .style("opacity", 1);
      }

      // Draw points
      svg.selectAll("circle")
        .data(flights)
        .enter()
        .append("circle")
          .attr("cx", d => projection([d.longitude, d.latitude])![0])
          .attr("cy", d => projection([d.longitude, d.latitude])![1])
          .attr("r", 5)
          .attr("fill", "#ffb000")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .append("title")
          .text(d => `${d.city_zh} (${d.country_zh})`);

      // Add labels
      svg.selectAll("text.label")
        .data(flights)
        .enter()
        .append("text")
          .attr("class", "label")
          .attr("x", d => projection([d.longitude, d.latitude])![0] + 8)
          .attr("y", d => projection([d.longitude, d.latitude])![1] + 4)
          .text(d => d.city_zh)
          .attr("font-size", "10px")
          .attr("fill", "#888")
          .attr("font-family", "JetBrains Mono");
    });

  }, [flights]);

  return (
    <div className="w-full h-[500px] bg-[#0d0d0d] rounded-lg border border-[#333] overflow-hidden relative shadow-inner">
      <svg ref={svgRef} className="w-full h-full"></svg>
      <div className="absolute top-4 left-4 bg-[#1a1a1a] border border-[#333] p-3 rounded shadow-lg text-[10px] font-mono-board uppercase text-[#888] space-y-1">
        <p className="text-white font-bold mb-1">Navigation Legend</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ffb000]"></div>
          <span>Landing Site</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0 border-t border-dashed border-[#ffb000]"></div>
          <span>Sleep Flight Path</span>
        </div>
      </div>
    </div>
  );
};

export default TrajectoryMap;
