import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import {Location, MapView, Permissions} from "expo";
import MapViewDirections from "react-native-maps-directions";
import Globals from "../../Globals";
import DestinationButtons from "./DestinationButtons";
import {Fab, Icon} from "native-base";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_DIRECTIONS_API_KEY = Globals.GOOGLE_DIRECTIONS_API;
export default class MapDirections extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destinationAddress: props.destination,
            region: null,
            destinationCoordinates: null,
            distance: null,
            duration: null,
        };

        this.mapView = null;
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({ region });
    };

    _onDirectionsReady = (directions) => {
        const { distance, duration, coordinates } = directions;
        const destinationCoordinates = coordinates[coordinates.length - 1];

        this.mapView.fitToCoordinates(coordinates, {
            edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
            }
        });
        this.setState({ destinationCoordinates, distance, duration })
    };

    _onError = (errorMessage) => {
        Alert.alert('Klaida', errorMessage);
    };

    _onDrive() {
        console.log('drive');
    }

    render() {
        const { region, destinationCoordinates, destinationAddress, duration, distance } = this.state;
        return (
            <React.Fragment>
            { duration && distance &&
                <DestinationButtons duration={duration} distance={distance} />
            }
            <Fab
                style={styles.driveBtn}
                position="bottomRight"
                onPress={() => this._onDrive()}>
                <Icon name="navigate" />
            </Fab>
            { region &&
                <MapView
                    initialRegion={region}
                    style={styles.mapContainer}
                    ref={c => this.mapView = c}
                    loadingEnabled={true}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                    {destinationCoordinates &&
                    <MapView.Marker coordinate={destinationCoordinates} />
                    }
                    { region && destinationAddress &&
                    <MapViewDirections
                        origin={region}
                        destination={destinationAddress}
                        apikey={GOOGLE_DIRECTIONS_API_KEY}
                        strokeWidth={5}
                        strokeColor="blue"
                        onReady={this._onDirectionsReady}
                        onError={this._onError}
                    />
                    }
                </MapView>
            }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 99,
        zIndex: 0,
    },
    driveBtn: {
        backgroundColor: '#5067FF',
        zIndex: 1,
    }
});

MapDirections.propTypes = {
    destination: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
};

MapDirections.defaultProps = {
    isVisible: true
};
