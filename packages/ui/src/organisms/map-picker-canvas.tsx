'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef } from 'react'
import { divIcon, latLng, type Marker as LeafletMarker } from 'leaflet'
import { Circle, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

type MapPoint = {
  lat: number
  lng: number
}

type MapPickerCanvasProps = {
  value: MapPoint
  onChange: (point: MapPoint) => void
  radiusKm?: number
  markerLabel: string
}

const COORDINATE_DECIMALS = 6
const DEFAULT_ZOOM = 15
const FIT_PADDING: [number, number] = [24, 24]

const pinIcon = divIcon({
  className: '',
  html: '<span class="bg-primary border-background flex size-7 items-center justify-center rounded-full border-4 shadow-lg"><span class="bg-background size-1.5 rounded-full"></span></span>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

function roundCoordinate(value: number) {
  return Number(value.toFixed(COORDINATE_DECIMALS))
}

function toMapPoint(point: { lat: number; lng: number }): MapPoint {
  return { lat: roundCoordinate(point.lat), lng: roundCoordinate(point.lng) }
}

function boundsAround(point: MapPoint, radiusKm: number) {
  return latLng(point.lat, point.lng).toBounds(radiusKm * 2000)
}

function MapViewSync({ value, radiusKm }: { value: MapPoint; radiusKm?: number }) {
  const map = useMap()
  useEffect(() => {
    map.panTo([value.lat, value.lng], { animate: true })
  }, [map, value.lat, value.lng])
  useEffect(() => {
    if (radiusKm) map.fitBounds(boundsAround(map.getCenter(), radiusKm), { padding: FIT_PADDING, animate: true })
  }, [map, radiusKm])
  return null
}

function MapClickHandler({ onChange }: { onChange: (point: MapPoint) => void }) {
  useMapEvents({
    click(event) {
      onChange(toMapPoint(event.latlng))
    },
  })
  return null
}

function MapPickerCanvas({ value, onChange, radiusKm, markerLabel }: MapPickerCanvasProps) {
  const markerRef = useRef<LeafletMarker>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker) onChange(toMapPoint(marker.getLatLng()))
      },
    }),
    [onChange],
  )
  const initialBounds = radiusKm ? boundsAround(value, radiusKm) : undefined
  return (
    <MapContainer
      center={[value.lat, value.lng]}
      zoom={DEFAULT_ZOOM}
      bounds={initialBounds}
      boundsOptions={{ padding: FIT_PADDING }}
      scrollWheelZoom={false}
      className="size-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {radiusKm ? (
        <Circle
          center={[value.lat, value.lng]}
          radius={radiusKm * 1000}
          pathOptions={{ className: 'stroke-primary fill-primary/10', weight: 2, opacity: 1, fillOpacity: 1 }}
        />
      ) : null}
      <Marker
        ref={markerRef}
        position={[value.lat, value.lng]}
        icon={pinIcon}
        draggable
        autoPan
        title={markerLabel}
        alt={markerLabel}
        eventHandlers={eventHandlers}
      />
      <MapClickHandler onChange={onChange} />
      <MapViewSync value={value} radiusKm={radiusKm} />
    </MapContainer>
  )
}

export { MapPickerCanvas, type MapPickerCanvasProps, type MapPoint }
