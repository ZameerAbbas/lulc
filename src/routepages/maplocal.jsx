import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Center on Chalt Nager
const CENTER = [33.515, 73.072];
const ZOOM = 12;

// GEE asset tile URLs (make sure these assets are public)
const TILE_URLS = {
  'LULC 2015': 'https://earthengine.googleapis.com/v1/projects/ee-my-zameer/maps/e8ad02bb69c3baad22fb19c502a4c7ac-076731c8b7243ac339b32cf194c8bbaf/tiles/{z}/{x}/{y}',
  'LULC 2020': 'https://earthengine.googleapis.com/v1/projects/ee-my-zameer/maps/83059e8e73d3b1fefded4fdd4b93fe4d-2f821c4e21f1c06b23a2b5cd17666074/tiles/{z}/{x}/{y}',
  'LULC 2024': 'https://earthengine.googleapis.com/v1/projects/ee-my-zameer/maps/94b8b3219dca2ed00a11b86f07b95671-5290fbeada50c7b57b004abbe1a1dc50/tiles/{z}/{x}/{y}',
};
const legendItems = [
  { name: 'Built-up', color: '#d73027' },
  { name: 'Agriculture', color: '#98ff00' },
  { name: 'Vegetation', color: '#479f2e' },
  { name: 'Glacier', color: '#148bff' },
  { name: 'Barren', color: '#d0d6ff' },
];

const MapGEE = () => {
  const [activeLayer, setActiveLayer] = useState('LULC 2024');
  const [opacity, setOpacity] = useState(0.8);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r p-4 flex flex-col gap-4">
        <h1 className="text-xl font-semibold">LULC Viewer</h1>

        {/* Layer toggle */}
        {Object.keys(TILE_URLS).map((key) => (
          <button
            key={key}
            onClick={() => setActiveLayer(key)}
            className={`w-full px-3 py-2 rounded ${
              activeLayer === key ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {key}
          </button>
        ))}

        {/* Opacity */}
        <label className="block mt-2">
          Opacity: {Math.round(opacity * 100)}%
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
          />
        </label>

        {/* Legend */}
        <h2 className="text-sm font-semibold mt-4">Legend</h2>
        {legendItems.map((item) => (
          <div key={item.name} className="flex items-center mt-1">
            <div
              style={{ backgroundColor: item.color }}
              className="w-6 h-6 mr-2 border"
            ></div>
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </aside>

      {/* Map */}
      <main className="flex-1">
        <MapContainer
          center={CENTER}
          zoom={ZOOM}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Google Hybrid: Satellite + Labels/Roads */}
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            attribution="&copy; Google"
          />

          {/* Active LULC layer */}
          {TILE_URLS[activeLayer] && (
            <TileLayer url={TILE_URLS[activeLayer]} opacity={opacity} />
          )}
        </MapContainer>
      </main>
    </div>
  );
};

export default MapGEE;
