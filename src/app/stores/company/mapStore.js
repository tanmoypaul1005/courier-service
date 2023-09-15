import { create } from 'zustand'
import { map_marker } from '../../utility/const';

const useMapStore = create((set) => ({
    H: window.H,
    map: null,
    setMap: (data) => set((state) => state.map = data),
    markers: [],
    setMarker: (data) => set((state) => state.markers = data),
    tempPloyLine: null,
    setTempPloyLine: (data) => set((state) => state.tempPloyLine = data),
    removePloyLine: () => set((state) => {
        state.tempPloyLine && state.map.removeObjects(state?.tempPloyLine);
        state.tempPloyLine = null
    }),
    isSetPolyLine: false,
    setIsSetPloyLine: (data) => set((state) => state.isSetPolyLine = data),
    is_fullscreen: false,
    setIsFullscreen: (data) => set({ is_fullscreen: data }),
    showModal: false,
    setShowModal: (data) => set({ showModal: data }),
}))

export const changeFocusAndZoom = (lat = 55.747781, lng = 12.3043962, zoomLevel = 10) => {
    const map = useMapStore.getState().map;
    map?.setCenter({ lat: lat, lng: lng })
    map?.setZoom(zoomLevel);
}

export const removeMarker = () => {
    const { markers, setMarker, map } = useMapStore.getState();
    const objects = map.getObjects();
    // console.log('markers', markers);
    objects?.length && markers?.length && useMapStore.getState().map.removeObjects(useMapStore.getState()?.markers)
    setMarker([]);
};

export const addMarker = (pickup_points, isSetWayPoint = false) => {
    const { map, H, markers, setMarker } = useMapStore.getState();
    // console.log('markers', markers);
    pickup_points?.length && markers?.length && removeMarker()
    setMarker([])
    let x = []
    if (pickup_points && pickup_points.length) {
        var gPoints = pickup_points;
        changeFocusAndZoom(gPoints[0].pickup_lat, gPoints[0].pickup_lng, 10);
        const icon = new H.map.DomIcon(map_marker);

        gPoints.map((item, index) => {
            var targetMarker = new H.map.DomMarker(
                { lat: item.pickup_lat, lng: item.pickup_lng },
                { icon: isSetWayPoint ? generateMapMarkerWithStopNumber(index + 1, H) : icon }
            );
            x.push(targetMarker)
            map.addObject(targetMarker);
            return null;
        });

        setMarker(x)
        isSetWayPoint && routeCalculation(pickup_points)
    }
    // console.log('markers', markers);
}

export const routeCalculation = (pickup_points) => {
    const { map, H, setTempPloyLine } = useMapStore.getState();
    var points = []
    pickup_points.forEach(element => {
        const x = element.pickup_lat.toString() + ',' + element.pickup_lng.toString()
        points.push(x)
    })

    let polyline = [];

    for (let index = 0; index < points.length - 1; index++) {
        // Create the parameters for the routing request:
        var routingParameters = {
            'routingMode': 'fast',
            'transportMode': 'car',
            // The start point of the route:
            'origin': points[index],
            // The end point of the route:
            'destination': points[index + 1],
            // Include the route shape in the response
            'return': 'polyline'
        };

        // Get an instance of the routing service version 8:
        const platform = new H.service.Platform({ apikey: process.env.REACT_APP_HERE_API_KEY });
        var router = platform.getRoutingService(null, 8);



        // Define a callback function to process the routing response:
        var onResult = function (result) {
            // ensure that at least one route was found
            if (result.routes.length) {
                result.routes[0].sections.forEach((section) => {
                    // Create a linestring to use as a point source for the route line
                    let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                    // Create a polyline to display the route:
                    let routeLine = new H.map.Polyline(linestring, { style: { lineWidth: 5 } });

                    map.addObject(routeLine);
                    polyline.push(routeLine);

                    // Set the map's viewport to make the whole route visible:
                    map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
                });
            }
        };


        router.calculateRoute(routingParameters, onResult,
            function (error) {
                console.log(error);
                alert(error.message);
            });

    }
    setTempPloyLine(polyline);
}

const generateMapMarkerWithStopNumber = (stop_number, H) => {
    const x = `<div viewBox="0 0 20 20" style="text-align: center; background-color: rgba(0, 144, 138, 0.7); color: white; padding: 2px; width: 60px;border-radius: 5px; left: -15px; top: -40px;">Stop ${stop_number}</div>`
    const map_marker_with_stop =
        `<div viewBox="0 0 20 20" style="position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center; left: -15px; top: -55px;"> 
        ${map_marker} 
        <div style="position: absolute; top: -0px">${x}</div>

        </div>`;
    return new H.map.DomIcon(map_marker_with_stop);
}


export default useMapStore;

