import { useState,  useRef  } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Animated  } from "react-native";
import { ResizeMode, Video } from "expo-av";
import background from "../../assets/video.mp4"

import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts, getCurrentUser, getUserTrainings } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const { width } = Dimensions.get("window");

  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: trainings } = useAppwrite(() => getUserTrainings(user.$id));
  trainings.push({
    title: 'create'
  })



  const types = [
    { title: 'Все', key: 'all' },
    { title: 'Бег', key: '0' },
    { title: 'Качалка', key: '1' },
    { title: 'Велосипед', key: '2' },
    { title: 'Плавание', key: '3' },
    { title: 'Теннис', key: '4' },
    { title: 'Баскетбол', key: '5' }
  ];

  return (
    <SafeAreaView className="bg-white h-full bg-[#000]">
          <View className="flex space-y-1">
          <View className="h-[54vw] w-full p-0 flex items-center">
            <Video 
          source={background}
          className="w-full h-full mt-3 absolute top-0 m-0"
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping    
            />

<Text className="mt-1 mx-3 mb-10 font-psemibold text-[16px] text-[#ffffff90] text-center absolute top-0">Физкультпривет, Никита</Text>
<TouchableOpacity className="bg-[#fff] relative m-2 top-[45vw] w-[83%] pt-[15px] pb-[19px] rounded-[17px] z-30">
                <Text className="text-center font-pregular text-[18px]">Начать тренировку ▶</Text>
              </TouchableOpacity>


            <LinearGradient className="h-[18vw] relative top-[17vw] w-full z-10" colors={['#fff0', '#000']}></LinearGradient>
            </View>


            <View>
            <Text className="text-xl font-pbold relative text-[#fff] mt-[40px] text-center mb-4">Тренировки</Text>
            {trainings.length != 0 ? (
              <View>
      <ScrollView
        horizontal={true}
        snapToInterval={(width * 0.9225)} // Устанавливаем величину для "щелчка" на следующий элемент
        decelerationRate="fast" // Быстрая инерция прокрутки
        className="pl-4"
        showsHorizontalScrollIndicator={false} // Отключаем горизонтальную полосу прокрутки
      >

        {trainings.map(train => {
          const date = new Date(train.date);
          const months = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
          ];
          const types = ['Бег 🏃', 'Качалка 🏋️‍♂️', 'Велоспед', 'Плавание'];

          const month = months[date.getUTCMonth()];
          const day = date.getUTCDate();
          const hours = date.getUTCHours();
          const minutes = date.getUTCMinutes();

          const formattedDate = `${day} ${month}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          const formattedType = types[Number(train.kind)];

          return (
            <View key={train.id} className="relative w-[90vw] mr-[3vw] h-[120px] bg-[#111] px-4 py-2 rounded-2xl overflow-hidden mb-4">
              {train.title == 'create' ? (<>
                <Text className="text-[#fff] text-center font-pbold m-0 bg-[#333] rounded-full mx-auto w-[64px] h-[64px] text-[40px]">+</Text>
                <Text className="text-[#fff] text-center font-pbold text-[15px] mt-[8px]">Создать тренировку</Text></>
              ) : (<>
              <Text className="font-pbold text-xl text-[#fff]">{train.title}</Text>
              <Text className="font-pregular text-xl text-[#838383]">{formattedDate}</Text>
              <Text className="font-pregular text-xl text-[#838383]">{formattedType}</Text></>
              )}
            </View>
          ); 
        })}
      </ScrollView>
    </View>
    ) : (
              <Text className="text-lg text-center text-[#838383] font-pregular">На сегодня планов пока нет :({"\n"}
                <Link href="/trainings"className="text-lg font-psemibold">Примите участие</Link> или <Link href="/create"className="text-lg font-psemibold">создайте свою</Link>.
              </Text>
            )}
            </View>
            </View>
    </SafeAreaView>
  );
};

export default Home;
