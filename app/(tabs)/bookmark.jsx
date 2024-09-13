import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { types } from '../../constants/types';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const Bookmark = () => {
  const { user } = useGlobalContext();
  const filteredList = types.filter(item => user.sports.includes(item.key));
  const [current, setCurrent] = useState(filteredList[0]);
  const [isTracking, setIsTracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);
  
  filteredList.push({
    title: 'другое',
    a: 'тренировку'
  });

  const calculatePace = (time, distance) => {
    if (distance === 0) return "0:00 мин/км"; // Если расстояние 0, темп недоступен
  
    const paceInMinutes = time / 60 / distance; // Темп в минутах на километр
    const minutes = Math.floor(paceInMinutes);
    const seconds = Math.round((paceInMinutes - minutes) * 60);
  
    return `${minutes}:${String(seconds).padStart(2, '0')} мин/км`;
  };  

  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking]);

  useEffect(() => {
    let watchSubscription;

    const startTracking = async () => {
      await Location.requestForegroundPermissionsAsync();
      watchSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 1000
        },
        (position) => {
          const { latitude, longitude } = position.coords;

          if (lastPosition) {
            const newDistance = calculateDistance(lastPosition, { latitude, longitude });
            setDistance(prevDistance => prevDistance + newDistance);
          }
          setLastPosition({ latitude, longitude });
        }
      );
    };

    if (isTracking) {
      startTracking();
    }

    return () => {
      if (watchSubscription) {
        watchSubscription.remove();
      }
    };
  }, [isTracking, lastPosition]);

  const calculateDistance = (startCoords, endCoords) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371; // Radius of Earth in km

    const dLat = toRad(endCoords.latitude - startCoords.latitude);
    const dLon = toRad(endCoords.longitude - startCoords.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(startCoords.latitude)) * Math.cos(toRad(endCoords.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distance in km
  };

  const handleStartPause = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      setTimeElapsed(0);
      setDistance(0);
      setLastPosition(null);
    }
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const pace = calculatePace(timeElapsed, distance);

  return (
    <SafeAreaView style={{ padding: 16, backgroundColor: 'black', flex: 1 }}>
      <Text className="font-pbold text-white text-center text-[25px]">Трекер</Text>
      <Text className="font-pregular text-white text-center text-[38px]">{formatTime(timeElapsed)}</Text>
      <Text className="font-pregular text-white text-center text-[22px]">{distance.toFixed(2)}км - {pace}</Text>
      <View style={{ position: 'absolute', width: '100%', bottom: 32 }}>
        <View className="w-[100vw]" style={{ zIndex: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filteredList.map(kind => (
            <TouchableOpacity
              key={kind.key}
              onPress={() => { setCurrent(kind); }}
              style={{
                backgroundColor: current.key === kind.key ? '#fff' : '#111',
                borderRadius: 10,
                marginRight: 3,
                marginLeft: 3,
                paddingVertical: 6,
                paddingHorizontal: 16,
                position: 'relative',
                zIndex: 20
              }}>
              <Text 
              className="font-pregular text-[17px]"
              style={{
                color: current.key === kind.key ? '#000' : '#838383',
              }}>{kind.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handleStartPause} style={{
          backgroundColor: 'white',
          paddingTop: 12,
          marginTop: 8,
          paddingBottom: 15,
          borderRadius: 20,
          left: 16
        }}>
          <Text className="text-center font-pregular text-[18px]">{isTracking ? 'Остановить' : 'Начать'} {current.a} {isTracking ? '⏸' : '▶'} </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;
