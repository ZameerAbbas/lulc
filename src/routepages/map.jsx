

import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const CENTER = [33.5, 73.0];
const ZOOM = 12;


const TILE_URLS = {
    'LULC 2015': 'users/ZameerAbbas3435/LULC_2015',
    'LULC 2020': 'users/ZameerAbbas3435/LULC_2020',
    'LULC 2024': 'users/ZameerAbbas3435/LULC_2024',

};

const Map = () => {
    const [activeLayer, setActiveLayer] = useState('LULC 2024');
    const [opacity, setOpacity] = useState(0.8);
    const [showChange, setShowChange] = useState(false);

    return (
        <div className="flex h-screen">
            <aside className="w-72 bg-white border-r p-4 flex flex-col gap-4">
                <h1 className="text-xl font-semibold">LULC Viewer</h1>

                {Object.keys(TILE_URLS).filter(k => k.startsWith('LULC')).map(key => (
                    <button
                        key={key}
                        onClick={() => setActiveLayer(key)}
                        className={`w-full px-3 py-2 rounded ${activeLayer === key ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                    >
                        {key}
                    </button>
                ))}

                <label className="block mt-2">
                    Opacity: {Math.round(opacity * 100)}%
                    <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} />
                </label>

                <label className="inline-flex items-center mt-2">
                    <input type="checkbox" checked={showChange} onChange={e => setShowChange(e.target.checked)} className="mr-2" />
                    Show change (2015→2020)
                </label>
            </aside>

            <main className="flex-1">
                <MapContainer center={CENTER} zoom={ZOOM} style={{ height: '100%', width: '100%' }}>
                    {/* Satellite base */}
                    <TileLayer
                        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        attribution="&copy; Google Satellite"
                    />

                    {/* Active LULC layer */}
                    {TILE_URLS[activeLayer] && (
                        <TileLayer url={TILE_URLS[activeLayer]} opacity={opacity} />
                    )}

                    {/* Optional change detection */}
                    {showChange && TILE_URLS['Change 2015-2020'] && (
                        <TileLayer url={TILE_URLS['Change 2015-2020']} opacity={0.7} />
                    )}
                </MapContainer>
            </main>
        </div>
    );
};

export default Map;
