<div align="center">
  <br />
    <a href="https://youtu.be/ZBCUegTZF7M?si=ubt0vk70lSjt6DCs" target="_blank">
      <img src="https://i.postimg.cc/5NR9bxFM/Sora-README.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
    <img src="https://img.shields.io/badge/NativeWind-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="nativewind" />
  </div>

  <h3 align="center">Video Sharing App</h3>

   <div align="center">
     Build this project step by step with our detailed tutorial on <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b></a> YouTube. Join the JSM family!
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Links](#links)
7. 🚀 [More](#more)

## 🚨 Tutorial

This repository contains the code corresponding to an in-depth tutorial available on our YouTube channel, <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b></a>. 

If you prefer visual learning, this is the perfect resource for you. Follow our tutorial to learn how to build projects like these step-by-step in a beginner-friendly manner!

<a href="https://youtu.be/ZBCUegTZF7M?si=ubt0vk70lSjt6DCs" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

## <a name="introduction">🤖 Introduction</a>

Built with React Native for seamless user experiences, Animatable for captivating animations, and integrated with the dependable backend systems of Appwrite, 
this app showcases impressive design and functionality, enabling seamless sharing of AI videos within the community.

If you're getting started and need assistance or face any bugs, join our active Discord community with over 27k+ members. It's a place where people help each other out.

<a href="https://discord.com/invite/n6EdbFJ" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/618f4872-1e10-42da-8213-1d69e486d02e" /></a>

## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native
- Expo
- Nativewind
- Animatable
- Appwrite

## <a name="features">🔋 Features</a>

👉 **Onboarding Screen**: Engaging graphics and clear instructions welcome users to the app.

👉 **Robust Authentication & Authorization System**: Secure email login safeguards user accounts.

👉 **Dynamic Home Screen with Animated Flat List**: Smoothly animated flat list showcases the latest videos for seamless browsing.

👉 **Pull-to-Refresh Functionality**: Users can refresh content with a simple pull gesture for up-to-date information.

👉 **Full-Text Search Capability**: Efficiently search through videos with real-time suggestions and instant results.

👉 **Tab Navigation**: Navigate between sections like Home, Search, and Profile with ease using tab navigation.

👉 **Post Creation Screen for Uploading Media**: Upload video and image posts directly from the app with integrated media selection.

👉 **Profile Screen with Detailed Insights**: View account details and activity, including uploaded videos and follower count, for a personalized experience.

👉 **Responsiveness**: Smooth performance and adaptability across various devices and screen sizes for a consistent user experience.

👉 **Animations**: Dynamic animations using the Animatable library to enhance user interaction and engagement throughout the app's UI.

and many more, including code architecture and reusability 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/aora.git
cd aora
```
**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm start
```

**Expo Go**

Download the [Expo Go](https://expo.dev/go) app onto your device, then use it to scan the QR code from Terminal and run.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

</details>

<details>
<summary><code>Font Loaded</code></summary>

```javascript
const [fontsLoaded, error] = useFonts({
  "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
  "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
  "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
});

useEffect(() => {
  if (error) throw error;

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded, error]);

if (!fontsLoaded && !error) {
  return null;
}
```

</details>

<details>
<summary><code>Dummy Videos for Appwrite</code></summary>

```javascript
const videos = [
  {
    title: "Get inspired to code",
    thumbnail:
      "https://i.ibb.co/tJBcX20/Appwrite-video.png",
    video:
      "https://player.vimeo.com/video/949579770?h=897cd5e781",
    prompt:
      "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language",
  },
  {
    title: "How AI Shapes Coding Future",
    thumbnail:
      "https://i.ibb.co/Xkgk7DY/Video.png",
    video:
      "https://player.vimeo.com/video/949581999?h=4672125b31",
    prompt: "Picture the future of coding with AI. Show AR VR",
  },
  {
    title: "Dalmatian's journey through Italy",
    thumbnail:
      "https://i.ibb.co/CBYzyKh/Video-1.png",
    video:
      "https://player.vimeo.com/video/949582778?h=d60220d68d",
    prompt:
      "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy",
  },
  {
    title: "Meet small AI friends",
    thumbnail:
      "https://i.ibb.co/7XqVPVT/Photo-1677756119517.png",
    video:
      "https://player.vimeo.com/video/949616422?h=d60220d68d",
    prompt:
      "Make a video about a small blue AI robot blinking its eyes and looking at the screen",
  },
  {
    title: "Find inspiration in Every Line",
    thumbnail:
      "https://i.ibb.co/mGfCYJY/Video-2.png",
    video:
      "https://player.vimeo.com/video/949617485?h=d60220d68d",
    prompt:
      "A buy working on his laptop that sparks excitement for coding, emphasizing the endless possibilities and personal growth it offers",
  },
  {
    title: "Japan's Blossoming temple",
    thumbnail:
      "https://i.ibb.co/3Y2Nk7q/Bucket-215.png",
    video:
      "https://player.vimeo.com/video/949618057?h=d60220d68d",
    prompt: "Create a captivating video journey through Japan's Sakura Temple",
  },
  {
    title: "A Glimpse into Tomorrow's VR World",
    thumbnail:
      "https://i.ibb.co/C5wXXf9/Video-3.png",
    video:
      "https://player.vimeo.com/video/949620017?h=d60220d68d",
    prompt: "An imaginative video envisioning the future of Virtual Reality",
  },
  {
    title: "A World where Ideas Grow Big",
    thumbnail:
      "https://i.ibb.co/DzXRfyr/Bucket-59038.png",
    video:
      "https://player.vimeo.com/video/949620200?h=d60220d68d",
    prompt:
      "Make a fun video about hackers and all the cool stuff they do with computers",
  },
];
```

</details>

## <a name="links">🔗 Links</a>

Assets and constants used in the project can be found [here](https://drive.google.com/drive/folders/1pckq7VAoqZlmsEfYaSsDltmQSESKm8h7?usp=sharing)

## <a name="more">🚀 More</a>

**Advance your skills with Next.js 14 Pro Course**

Enjoyed creating this project? Dive deeper into our PRO courses for a richer learning adventure. They're packed with detailed explanations, cool features, and exercises to boost your skills. Give it a go!

<a href="https://jsmastery.pro/next14" target="_blank">
<img src="https://github.com/sujatagunale/EasyRead/assets/151519281/557837ce-f612-4530-ab24-189e75133c71" alt="Project Banner">
</a>

<br />
<br />

**Accelerate your professional journey with the Expert Training program**

And if you're hungry for more than just a course and want to understand how we learn and tackle tech challenges, hop into our personalized masterclass. We cover best practices, different web skills, and offer mentorship to boost your confidence. Let's learn and grow together!

<a href="https://www.jsmastery.pro/masterclass" target="_blank">
<img src="https://github.com/sujatagunale/EasyRead/assets/151519281/fed352ad-f27b-400d-9b8f-c7fe628acb84" alt="Project Banner">
</a>

#














{current == 0 ? (
          user.posts.length == 0 ? (
          <Text>Записей пока нет</Text>
          ) : (
            user.posts.map(post =>
              <View className="my-1 py-1 bg-white rounded-xl">
                {post.imageUrl && (
                  <Image
                  source={{ uri: post?.imageUrl }}
                  className="w-full h-[75vw] rounded-xl"
                  resizeMode="cover"
                />
                )}
                <Text className="text-lg mx-4">{post.caption}</Text>
                <View>
                  <Text>{post?.likes}</Text>
                </View>
              </View>
            )
          )
        ) : (
          <Text>hui</Text>
        )}





















          const topTitles = [
    '',
    'топ пробежавших в РБ'
  ]

  const records = [
    {list: [{name: 'Александр Василевич', done: 907, avatar: 'https://africanarguments.org/wp-content/uploads/2017/07/Photos_-_Arlit-000.jpg'}], type: 1}
  ]




<Text className="text-xl font-pbold relative text-[#fff] mt-[0px] text-center mb-[16px]">рекорды Беларуси</Text>
            <ScrollView horizontal={true} 
        snapToInterval={(width * 0.9225)} // Устанавливаем величину для "щелчка" на следующий элемент
        decelerationRate="fast" // Быстрая инерция прокрутки
        showsHorizontalScrollIndicator={false} // Отключаем горизонтальную полосу прокрутки
            className="relative w-[100vw] h-[220px] rounded-2xl pl-4 mb-[40px]">
              {records.map(record => {
                return(
                  <View className="bg-[#111] w-[90vw] rounded-2xl py-2 px-4 mr-3">
                  <Text className="text-white font-pbold text-[18px] text-center mb-1">{topTitles[record.type]}</Text>
                    {record.list.map(fromList => {
                  return(
                    <View className="flex flex-row items-center">
                      <Image
                      className="w-[40px] h-[40px] rounded-full bg-[#222] mr-2"
                      source={{uri: fromList.avatar}}
                      />
                  <Text className="text-white font-pregular text-[#838383] text-[17px]">{fromList.name} - {fromList.done}</Text>
                  </View>
                )})}
                  </View>
                )
              })}
            </ScrollView>








































            import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { types } from '../../constants/types';
import { useState, useEffect } from 'react';

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
        createMap(user?.$id, toDb[0]);
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
