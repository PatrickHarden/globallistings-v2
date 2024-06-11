import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

global.window.google = {
  maps: {
    // https://developers.google.com/maps/documentation/javascript/reference#Animation
    Animation: {},
    // https://developers.google.com/maps/documentation/javascript/reference#Attribution
    Attribution: {},
    // https://developers.google.com/maps/documentation/javascript/reference#BicyclingLayer
    BicyclingLayer() {},
    Circle: function() {
      this.getBounds = () => {
        return {
          getNorthEast() {},
          getSouthWest() {},
        };
      };
    },
    // https://developers.google.com/maps/documentation/javascript/reference#ControlPosition
    ControlPosition: {},
    // https://developers.google.com/maps/documentation/javascript/reference#Data
    Data() {},
    // https://developers.google.com/maps/documentation/javascript/reference#DirectionsRenderer
    DirectionsRenderer() {},
    // https://developers.google.com/maps/documentation/javascript/reference#DirectionsService
    DirectionsService() {},
    // https://developers.google.com/maps/documentation/javascript/reference#DirectionsStatus
    DirectionsStatus: {},
    // https://developers.google.com/maps/documentation/javascript/reference#DistanceMatrixElementStatus
    DistanceMatrixElementStatus: {},
    // https://developers.google.com/maps/documentation/javascript/reference#DistanceMatrixService
    DistanceMatrixService() {},
    // https://developers.google.com/maps/documentation/javascript/reference#DistanceMatrixStatus
    DistanceMatrixStatus: {},
    // https://developers.google.com/maps/documentation/javascript/reference#ElevationService
    ElevationService() {},
    // https://developers.google.com/maps/documentation/javascript/reference#ElevationStatus
    ElevationStatus: {},
    // https://developers.google.com/maps/documentation/javascript/reference#FusionTablesLayer
    FusionTablesLayer() {},
    // https://developers.google.com/maps/documentation/javascript/reference#Geocoder
    Geocoder: function() {
      return {
        Geocode() {},
        geocode() {},
      };
    },
    // https://developers.google.com/maps/documentation/javascript/reference#GeocoderLocationType
    GeocoderLocationType: {},
    // https://developers.google.com/maps/documentation/javascript/reference#GeocoderStatus
    GeocoderStatus: {},
    // https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay
    GroundOverlay() {},
    // https://developers.google.com/maps/documentation/javascript/reference#ImageMapType
    ImageMapType() {},
    InfoWindow() {},
    // https://developers.google.com/maps/documentation/javascript/reference#KmlLayer
    KmlLayer() {},
    // https://developers.google.com/maps/documentation/javascript/reference#KmlLayerStatus
    KmlLayerStatus: {},
    // https://developers.google.com/maps/documentation/javascript/reference#LatLng
    LatLng: function(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    },
    // https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
    LatLngBounds: function() {
      this.extend = () => {};
    },
    // https://developers.google.com/maps/documentation/javascript/reference#MVCArray
    MVCArray() {},
    // https://developers.google.com/maps/documentation/javascript/reference#MVCObject
    MVCObject() {},
    // https://developers.google.com/maps/documentation/javascript/reference#Map
    Map: function() {
      // methods
      this.fitBounds = () => {};
      this.getBounds = () => {};
      this.getCenter = () => {};
      this.getDiv = () => {};
      this.getHeading = () => {};
      this.getMapTypeId = () => {};
      this.getProjection = () => {};
      this.getStreetView = () => {};
      this.getTilt = () => {};
      this.getZoom = () => {};
      this.panBy = () => {};
      this.panTo = () => {};
      this.panToBounds = () => {};
      this.setCenter = () => {};
      this.setHeading = () => {};
      this.setMapTypeId = () => {};
      this.setOptions = () => {};
      this.setStreetView = () => {};
      this.setTilt = () => {};
      this.setZoom = () => {};
      this.controls = () => {};
      this.data = {
        // https://developers.google.com/maps/documentation/javascript/reference#Data
        // methods
        add() {},
        addGeoJson() {},
        contains() {},
        forEach() {},
        getControlPosition() {},
        getControls() {},
        getDrawingMode() {},
        getFeatureById() {},
        getMap() {},
        getStyle() {},
        loadGeoJson() {},
        overrideStyle() {},
        remove() {},
        revertStyle() {},
        setControlPosition() {},
        setControls() {},
        setDrawingMode() {},
        setMap() {},
        setStyle() {},
        toGeoJson() {},
        // properties
        controlPosition: {},
        controls: [],
      };
      this.mapTypes = {
        // https://developers.google.com/maps/documentation/javascript/reference#MapTypeRegistry
        // methods
        set() {},
      };
      this.overlayMapTypes = {
        // https://developers.google.com/maps/documentation/javascript/reference#MVCArray
        clear() {},
        getArray() {},
        getAt() {},
        getLength() {},
        insertAt() {},
        pop() {},
        push() {},
        removeAt() {},
        setAt() {},
      };
    },
    MapTypeControlStyle: {},
    // https://developers.google.com/maps/documentation/javascript/reference#MapTypeId
    MapTypeId: {
      HYBRID: '',
      ROADMAP: '',
      SATELLITE: '',
      TERRAIN: '',
    },
    // https://developers.google.com/maps/documentation/javascript/reference#MapTypeRegistry
    MapTypeRegistry() {},
    // https://developers.google.com/maps/documentation/javascript/reference#Marker
    Marker: function() {
      this.setTitle = visible => {};
      this.setVisible = () => {};
      this.setZIndex = () => {};
      this.setIcon = () => {};
      this.setPosition = () => {};
      this.setMap = () => {};
      this.set = () => {};
    },
    MarkerImage() {},
    // https://developers.google.com/maps/documentation/javascript/reference#MarkerOptions
    MarkerOptions: {
      visible: false,
    },
    // https://developers.google.com/maps/documentation/javascript/reference#MaxZoomService
    MaxZoomService() {
      return {
        getMaxZoomAtLatLng() {},
      };
    },
    // https://developers.google.com/maps/documentation/javascript/reference#MaxZoomStatus
    MaxZoomStatus: {},
    NavigationControlStyle: {},
    OverlayView() {},
    // https://developers.google.com/maps/documentation/javascript/reference#Point
    Point: function() {},
    // https://developers.google.com/maps/documentation/javascript/reference#Polygon
    Polygon() {},
    // https://developers.google.com/maps/documentation/javascript/reference#Polyline
    Polyline() {},
    // https://developers.google.com/maps/documentation/javascript/reference#Rectangle
    Rectangle: function() {
      this.setBounds = () => {};
      this.setOptions = () => {};
      this.setMap = () => {};
    },
    // https://developers.google.com/maps/documentation/javascript/reference#SaveWidget
    SaveWidget() {},
    // https://developers.google.com/maps/documentation/javascript/reference#ScaleControlStyle
    ScaleControlStyle: {},
    // https://developers.google.com/maps/documentation/javascript/reference#Size
    Size(width, height, wiidthUnit, heightUnit) {},
    // https://developers.google.com/maps/documentation/javascript/reference#StreetViewCoverageLayer
    StreetViewCoverageLayer() {},
    // https://developers.google.com/maps/documentation/javascript/reference#StreetViewPanorama
    StreetViewPanorama() {},
    // https://developers.google.com/maps/documentation/javascript/reference#StreetViewService
    StreetViewService() {},
    // https://developers.google.com/maps/documentation/javascript/reference#StreetViewStatus
    StreetViewStatus: {},
    // https://developers.google.com/maps/documentation/javascript/reference#StrokePosition
    StrokePosition: {},
    // https://developers.google.com/maps/documentation/javascript/reference#StyledMapType
    StyledMapType() {},
    // https://developers.google.com/maps/documentation/javascript/reference#SymbolPath
    SymbolPath: {},
    // https://developers.google.com/maps/documentation/javascript/reference#TrafficLayer
    TrafficLayer() {},
    // https://developers.google.com/maps/documentation/javascript/reference#TransitLayer
    TransitLayer() {},
    // https://developers.google.com/maps/documentation/javascript/reference#TransitMode
    TransitMode: {},
    // https://developers.google.com/maps/documentation/javascript/reference#TransitRoutePreference
    TransitRoutePreference: {},
    // https://developers.google.com/maps/documentation/javascript/reference#TravelMode
    TravelMode: {},
    // https://developers.google.com/maps/documentation/javascript/reference#UnitSystem
    UnitSystem: {},
    // https://developers.google.com/maps/documentation/javascript/reference#ZoomControlStyle
    ZoomControlStyle: {},
    __gjsload__() {},
    event: {
      addListener() {},
    },
    places: {
      PlacesService: function() {},
      AutocompleteSessionToken: function() {},
      AutocompleteService: function() {
        return {
          getPlacePredictions() {},
        };
      },
    },
  },
};
