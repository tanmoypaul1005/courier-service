import React, { useEffect, useRef } from 'react'
import onResize from "simple-element-resize-detector";
import useMapStore from '../../App/MapStore';

export default function LimadiMap2(props) {
    const { mapVH = 40, initZoomLevel = 10, centerLat = 55.747781, centerLng = 12.3043962, } = props;

    const { setMap, H, setMarker } = useMapStore()
    const mapRef = useRef(null);

    const platform = new H.service.Platform({ apikey: process.env.REACT_APP_HERE_API_KEY });
    const defaultLayers = platform.createDefaultLayers();

    useEffect(() => {
        setMarker([])
        if (mapRef.current) {
            let map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
                center: { lat: centerLat, lng: centerLng },
                zoom: initZoomLevel,
                pixelRatio: window.devicePixelRatio || 1,
            });

            setMap(map);
            onResize(mapRef.current, () => map.getViewPort().resize())
            const ui = H.ui.UI.createDefault(map, defaultLayers);
            new H.mapevents.Behavior(new H.mapevents.MapEvents(map)); // on scroll zoom

            return () => {
                map.dispose();
                ui.dispose();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div ref={mapRef} className={`bg-white p-2 md:p-4 shadow rounded-xl flex-col my-5 h-[${mapVH}vh] flex justify-center items-center`} />
    )
}
