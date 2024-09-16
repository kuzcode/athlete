import { View, Text, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { toTrack, types } from '../../constants/types';
import { useState, useEffect } from 'react';

const Bookmark = () => {
  const { user } = useGlobalContext();
  const filteredList = types.filter(item => user.sports.includes(item.key));
  const [current, setCurrent] = useState(filteredList[0]);
  const [isTracking, setIsTracking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);
  const [counterShown, setCounterShown] = useState(false);
  const [count, setCount] = useState(3);
  
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
        setCount(4);
        setCounterShown(true);

        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
              setCount((prevCount) => prevCount - 1); // Уменьшаем count на 1
              Vibration.vibrate(120, true);
          }, i * 1000); // Уменьшаем count с интервалом в 1 секунду
      }
      
      
    

      setTimeout(() => {
        setTimeElapsed(0);
        setDistance(0);
        setLastPosition(null);
      setCounterShown(false);
    }, 3000)
    }
    else {
        setIsSaving(true);
    }
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const pace = calculatePace(timeElapsed, distance);

  const [shownTabs, setShownTabs] = useState(
    types[current.key].track
  )

  const result = shownTabs.map(index => {
    if (index < toTrack.length) { // Проверка на выход за пределы массива
        return toTrack[index];
    }
}).filter(value => value !== undefined); // Убираем undefined из результата


  console.log(result);

  return (
    <SafeAreaView style={{ padding: 16, backgroundColor: 'black', flex: 1 }}>
        {isSaving && (
            <View className="absolute z-30 bg-[#111] w-[100vw] h-[88vh] pt-4 top-6 px-4 left-0 right-0 bottom-0">
                <Text className="text-white font-pbold text-[21px]">сохранение тренировки</Text>

                <View className="mt-4">
                <Text className="text-[#fff] font-pbold text-[21px]">{formatTime(timeElapsed)}</Text>
                <Text className="text-[#838383] font-pbold text-[21px]">время</Text>
                </View>

                <View className="absolute bottom-4 mx-4 w-full">
                    <TouchableOpacity onPress={() => {setIsSaving(false)}} className="py-3 rounded-xl relative w-full border-[2px] border-[#333] mb-2">
                        <Text className="font-pregular text-white text-[16px] text-center">отмена</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-3 rounded-xl relative bg-white w-full">
                        <Text className="font-pregular text-black text-[16px] text-center">сохранить</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}

{counterShown && (
            <View className="absolute z-30 bg-[#111] w-[100vw] h-[88vh] pt-4 top-6 px-4 left-0 right-0 bottom-0">
                <Text className="text-white font-pbold text-[100px] text-center mt-[32vh]">{count}</Text>
            </View>
        )}

      <Text className="font-pbold text-white text-center text-[25px]">Трекер</Text>
        {shownTabs.includes(0) && (
      <Text className="font-pregular text-white text-center text-[38px]">{formatTime(timeElapsed)}</Text>
        )}

      {result.includes(1) && (
      <Text className="font-pregular text-white text-center text-[38px]">{formatTime(timeElapsed)}</Text>
        )}
        
      <Text className="font-pregular text-white text-center text-[22px]">{distance.toFixed(2)}км - {pace}</Text>
      <View style={{ position: 'absolute', width: '100%', bottom: 32 }}>
        <ScrollView 
        decelerationRate="fast" // Быстрая инерция прокрутки
        horizontal={true} className="w-[100vw] ml-4 flex">
          {filteredList.map(kind => (
            <TouchableOpacity
              key={kind.key}
              onPress={() => { setCurrent(kind); setShownTabs(types[kind.key].track) }}
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
        </ScrollView>
        <TouchableOpacity onPress={handleStartPause} style={{
          backgroundColor: 'white',
          paddingTop: 12,
          marginTop: 8,
          paddingBottom: 15,
          borderRadius: 20,
          left: 16
        }}>
          <Text className="text-center font-pregular text-[18px]">{isTracking ? 'остановить' : 'начать'} {current.a} {isTracking ? '⏸' : '▶'} </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Bookmark;


