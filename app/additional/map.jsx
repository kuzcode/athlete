import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { createMap } from '../../lib/appwrite';
import { useGlobalContext } from "../../context/GlobalProvider";
import * as Location from 'expo-location';
import tw from 'tailwind-react-native-classnames';

const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371e3; // Радиус Земли в метрах
  const lat1 = coords1.latitude;
  const lon1 = coords1.longitude;
  const lat2 = coords2.latitude;
  const lon2 = coords2.longitude;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Возвращаем расстояние в метрах
};


const Map = () => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [name, setName] = useState('');
  const [coordinate, setCoordinate] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [block, setBlock] = useState(0);
  const { user } = useGlobalContext();

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Получаем текущее местоположение
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCurrentLocation({ latitude, longitude });
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    const watchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10,
            timeInterval: 1000,
          },
          (location) => {
            const newCoords = location.coords;
            setCurrentLocation({
              latitude: newCoords.latitude,
              longitude: newCoords.longitude,
            });
            checkLocationProximity(newCoords);
          }
        );
      }
    };

    watchLocation();
  }, []);

  const checkLocationProximity = (newCoords) => {
    markers.forEach(marker => {
      const distance = haversineDistance(newCoords, marker.coordinate);
      if (distance <= 100) {
        handleProximity(marker);
      }
    });
  };

  const handleProximity = (marker) => {
    console.log(`Вы близки к маркеру: ${marker.name}`);
    // Здесь вызовите вашу произвольную функцию
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoordinate({ latitude, longitude });
    setBlock(1);
  };

  const addMarker = () => {
    if (coordinate && name) {
        const newMarkers = [...markers, { coordinate, name }];
        setMarkers(newMarkers); // Обновляем состояние
        setName('');
        setCoordinate(null);
        setBlock(0);

        const toDb = newMarkers.map(item => ({ ...item, ...item.coordinate }));
        console.log(toDb[0]); 
        createMap(user.$id, toDb[0]);
    }
};

const mapstyle = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2c6675"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#0e1626"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ]

  return (
    <View style={tw`flex-1`}>
      {region && (
        <MapView
          style={tw`flex-1`}
          showsBuildings={true}
          customMapStyle={mapstyle}
          initialRegion={region}
          showsUserLocation={true} // Отображаем местоположение пользователя
          followsUserLocation={true} // Обновляем центр карты на местоположение пользователя
          onPress={handleMapPress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.name}
            />
          ))}

          {/* Добавляем круг вокруг текущего местоположения */}
          {currentLocation && (
            <Circle
              center={currentLocation}
              radius={100}
              strokeColor="rgba(0, 255, 0, 1)"
              fillColor="rgba(0, 255, 0, 0.3)"
            />
          )}
        </MapView>
      )}
      {block == 1 ? (
        <View className="px-4 pb-4 pt-2 flex flex-row bg-[#111]">
        <TouchableOpacity className="bg-[#252525] w-[86%] rounded-[8px] px-4 pt-1 pb-2">
          <Text className="text-white font-pregular text-[18px]">Выберите вид спорта</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addMarker} className="bg-white mx-4 rounded-[8px] w-[10%] flex items-center justify-center">
          <Text className="text-black font-pregulat text-[20px] text-center">+</Text>
        </TouchableOpacity>
      </View>
      ) : (
        <View className="px-4 pb-4 pt-2 bg-[#111]">
        <Text className="text-white font-pregular text-[18px]">Добавьте место тренировок</Text>
        <Text className="text-white font-pregular text-[#838383] text-[15px]">Вы можете выбрать места на карте, где тренируетесь. Приложение будет автоматически считать время, проведённое в радиусе 100м.</Text>
      </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Map;
