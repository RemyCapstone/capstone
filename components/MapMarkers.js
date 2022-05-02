import React, {useCallback, useEffect, useState} from "react";
import useSupercluster from "use-supercluster";
import L from 'leaflet';
import {Marker, useMap, Popup} from "react-leaflet";

const icons = {};
const fetchIcon = (count, size) => {
    if(!icons[count]){
        icons[count] = L.divIcon({
            html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px">
                ${count}
            </div>`
        })
    }
    return icons[count];
}

const MapMarkers = ({data}) => {
    const maxZoom = 22
    const [bounds, setBounds] = useState(null)
    const [zoom, setZoom] = useState(12)
    const map = useMap()

    //get map bounds
    function updateMap(){
        //console.log("updating");
        const b = map.getBounds();
        //4 corners of the map
        setBounds(
            [
                b.getSouthWest().lng,
                b.getSouthWest().lat,
                b.getNorthEast().lng,
                b.getNorthEast().lat,
            ]
        )
        setZoom(map.getZoom());
    }

    const onMove = useCallback(() => {
        updateMap();
    }, [map]);

    React.useEffect(() => {
        updateMap();
    }, [map])

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove)
        }
    }, [map, onMove])

    const points = data.map((building) => ({
        type: "Feature",
        properties: {cluster: false, buildingID: building.BIN, HOUSE_NUMBER: building.HOUSE_NUMBER, STREET_NAME: building.STREET_NAME, ZIP: building.ZIP, HPD_VIOLATIONS: building.HPD_VIOLATIONS, DOB_VIOLATIONS: building.DOB_VIOLATIONS, COMM_DISTRICT: building.COMM_DISTRICT, TOTAL_VIOLATIONS: building.TOTAL_VIOLATIONS, DWELLING_UNITS: building.DWELLING_UNITS, VIO_UNITS_RATIO: building.VIO_UNITS_RATIO},
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(building.LONGITUDE_POINT_X),
                parseFloat(building.LATITUDE_POINT_Y)
            ]
        }
    }))

    const {clusters, supercluster} = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: {radius: 75, maxZoom: 17}
    })

    return(
        <>
            {clusters.map((cluster) => {
                //every cluster point has coordinates
                const [longitude, latitude] = cluster.geometry.coordinates;
                //either a cluster or a single point
                const {cluster: isCluster, point_count: pointCount} = cluster.properties;

                //if we have a cluster to render
                if(isCluster){
                    return(
                        <Marker 
                            key={cluster.id}
                            position={[latitude, longitude]}
                            icon={fetchIcon(
                                pointCount,
                                10 + (pointCount / points.length) * 40
                            )}
                            eventHandlers={{
                                click: () => {
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        maxZoom
                                    )
                                    map.setView([latitude, longitude], expansionZoom, {
                                        animate: true,
                                    })
                                }
                            }}
                        />
                    )
                }

                return (
                    <Marker 
                            key={cluster.properties.buildingID}
                            position={[latitude, longitude]}
                    >
                        <Popup>
                            <div>
                                Bin: {cluster.properties.buildingID}
                            </div>
                            <div>
                                Address: {cluster.properties.HOUSE_NUMBER} {cluster.properties.STREET_NAME}
                            </div>
                            <div>
                                Community District: {cluster.properties.COMM_DISTRICT}
                            </div>
                            <div>
                                Zip: {cluster.properties.ZIP}
                            </div>
                            <div>
                                HPD Violations: {cluster.properties.HPD_VIOLATIONS}
                            </div>
                            <div>
                                DOB Violations: {cluster.properties.DOB_VIOLATIONS}
                            </div>
                            <div>
                                Total Violations: {cluster.properties.TOTAL_VIOLATIONS}
                            </div>
                            <div>
                                Dwelling Units: {cluster.properties.DWELLING_UNITS}
                            </div>
                            <div>
                                Violations Per Unit: {cluster.properties.VIO_UNITS_RATIO}
                            </div>
                        </Popup>
                    </Marker>
                )
            })

            }
        </>
    )
}

export default MapMarkers;