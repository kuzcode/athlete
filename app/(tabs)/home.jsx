import { useState,  useRef  } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Image  } from "react-native";
import { ResizeMode, Video } from "expo-av";
import background from "../../assets/video.mp4"

import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getUserTrackers, getAllUsers, getUserTrainings } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { types, colors } from "../../constants/types";
import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: trainings } = useAppwrite(() => getUserTrainings(user?.$id));

  const { data: trackers } = useAppwrite(() => getUserTrackers(user?.$id));
  const { data: users } = useAppwrite(getAllUsers);

  return (
    <ScrollView className="h-full bg-[#000] pt-0">
          <View className="flex space-y-1">
          <View className="h-[54vw] w-full p-0 flex items-center">
            <Video 
          source={background}
          className="w-full h-full mt-3 absolute top-0 m-0"
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping    
            />

      <Text className="mt-1 mx-3 mb-10 font-psemibold text-[16px] text-[#ffffff90] text-center absolute top-4 hidden">физкультпривет, {user?.name}</Text>
      <TouchableOpacity onPress={() => {router.push('/bookmark')}} className="bg-[#fff] relative m-2 top-[45vw] w-[83%] pt-[15px] pb-[19px] rounded-[17px] z-30">
                <View className="flex flex-row items-center justify-center">
                <Text className="text-center font-pregular text-[18px]">начать тренировку</Text>
                <Image source={icons.play} tintColor={'#333'} className="w-[12px] h-[12px] ml-2 mb-[-4px]" />
                </View>
              </TouchableOpacity>


            {//<LinearGradient className="h-[18vw] relative top-[17vw] w-full z-10" colors={['#fff0', '#000']}></LinearGradient>
}
            </View>
            <View>
            <Text className="text-[16px] leading-[17px] mx-[16px] font-pregular relative text-[#838383] mt-[40px] text-center mb-4">здравствуй, чемпион! время идти на тренировку, всё, что не убивает, делает нас сильнее</Text>
            <Text className="text-xl font-pbold relative text-[#fff] text-center mb-4">тренировки</Text>
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
            <View key={train.id} className="relative w-[90vw] mr-[3vw] h-[135px] bg-[#161616] px-4 py-2 rounded-2xl overflow-hidden mb-4">
              <>
              <Text className="font-pbold text-xl text-[#fff]">{train.title}</Text>
              <Text className="font-pregular text-xl text-[#838383]">{formattedDate}</Text>
              <Text className="font-pregular text-xl text-[#838383]">{formattedType}</Text></>
            </View>
          ); 
        })}

<TouchableOpacity onPress={() => {router.push('/new')}} key={0} className="relative w-[90vw] mr-[3vw] h-[135px] bg-[#161616] px-4 py-2 rounded-2xl overflow-hidden mb-4">
<Text className="text-[#fff] text-center font-pbold m-0 bg-[#333] rounded-full mx-auto w-[64px] mt-[13px] h-[64px] text-[40px]">+</Text>
<Text className="text-[#838383] text-center font-pregular text-[15px] mt-[8px]">создать тренировку</Text>
</TouchableOpacity>
      </ScrollView>
    </View>
            <TouchableOpacity onPress={() => {router.push('/trackers')}}>
            <Text className="text-xl font-pbold relative text-[#fff] text-center mb-4">привычки</Text>
            </TouchableOpacity>
            <ScrollView horizontal={true} 
              snapToInterval={(width * 0.9225)} // Устанавливаем величину для "щелчка" на следующий элемент
              decelerationRate="fast" // Быстрая инерция прокрутки
              showsHorizontalScrollIndicator={false} // Отключаем горизонтальную полосу прокрутки
              className="relative w-[100vw] h-[165px] rounded-2xl mb-2 pl-4">
            {trackers.map(track => {
              const contentList = [
                {

                },
                {
                  a: `Меньше ${track.name}`,
                  b: `${track.done}/${track.goal} дней`
                }
              ]
              return(
                <TouchableOpacity onPress={() => navigation.navigate('track', { track })}  className="relative w-[90vw] mr-[3vw] h-[165px] bg-[#161616] px-4 py-2 rounded-2xl overflow-hidden mb-4">
                {//<LinearGradient colors={colors[track.color]} className="relative w-[90vw] mr-[3vw] h-[165px] bg-[#161616] px-4 py-2 rounded-2xl overflow-hidden mb-4">
            }

                  <Text className="text-white font-pbold text-[20px]">{contentList[track.type].a}</Text>
                  <Text className="text-[#ffffff83] font-pregular text-[20px]">{contentList[track.type].b}</Text>

                  {track.type == 1 && (
                    <View className="absolute flex flex-row bottom-3 px-4 w-[90vw] justify-between">
                    <TouchableOpacity className="w-[38.5%] py-[5px] bg-[#ffffff20] border-[1px] border-[#ffffff25] rounded-lg">
                      <Text className="font-pregular text-white text-center text-[15px]">сорвался</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[58.5%] py-[5px] bg-[#ffffff20] border-[1px] border-[#ffffff25] rounded-lg">
                      <Text className="font-pregular text-white text-center text-[15px]">держусь</Text>
                    </TouchableOpacity>
                  </View>
                  )}
                {//</LinearGradient>
            }
                </TouchableOpacity>
            )})}

            <TouchableOpacity className="pr-4" onPress={() => {router.push('/additional/newTrack')}}>
                <View className="relative w-[90vw] mr-[3vw] h-[165px] bg-[#161616] px-4 py-2 rounded-2xl overflow-hidden mb-4">
                <Text className="text-[#fff] text-center font-pbold m-0 bg-[#333] rounded-full mx-auto w-[64px] mt-[24px] h-[64px] text-[40px]">+</Text>
                <Text className="text-[#838383] text-center font-pregular text-[15px] mt-[8px]">создать трекер привычки</Text>
                </View>
                </TouchableOpacity>
            </ScrollView>

            </View>
            <Text className="text-xl font-pbold relative text-[#fff] mt-[16px] text-center mb-3">друзья и блогеры</Text>
            <ScrollView horizontal={true} 
        snapToInterval={(width * 0.9225)} // Устанавливаем величину для "щелчка" на следующий элемент
        decelerationRate="fast" // Быстрая инерция прокрутки
        showsHorizontalScrollIndicator={false} // Отключаем горизонтальную полосу прокрутки
            className="relative w-[100vw] h-[135px] rounded-2xl pl-4 mb-[40px]">
              
            {users.map(user => {
              var newList = user?.sports.map(str => {
                const matchedObject = types.find(type => type.key == str);
                // Если объект найден, возвращаем его текст, иначе возвращаем null или другое значение
                return matchedObject ? matchedObject.title : null; 
              }).filter(title => title !== null); // Удаляем значения null из нового списка
              
              return(
                <TouchableOpacity onPress={() => navigation.navigate('otherProfile', { user })} className="w-[90vw] rounded-2xl h-full mr-[3vw] bg-[#161616]">
                <Image 
                source={{ uri: user.imageUrl }}
                className="w-[45vw] h-[135px] rounded-2xl absolute bg-[#252525]"
                />{
                //<LinearGradient start={{x: 0.65, y: 0}} end={{x: 0.85, y: 0}} className="h-full absolute left-0 top-0 w-[50vw] z-10" colors={['#fff0', '#161616']}></LinearGradient>
                }
                <Text className="text-[#fff] text-[18px] font-pbold text-right mr-4 mt-2 z-20 mb-[6px]">{user.name}</Text>
                <View className="ml-[38vw] max-w-[52vw] z-20 flex w-full flex-row flex-wrap justify-end pr-[12px]">
                {newList.map(kind =>
                  <View className="bg-[#252525] border-[1px] border-[#292929] shadow-lg flex relative rounded-3xl m-[2px] pt-[1px] pb-[3px] px-[9px] z-20"><Text className="font-pregular text-[#bdbdbd]">{kind}</Text></View>
                )}
                </View>
              </TouchableOpacity>
            )})}
            </ScrollView>
            </View>
    </ScrollView>
  );
};

export default Home;
