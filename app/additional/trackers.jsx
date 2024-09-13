import { useState,  useRef  } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Image  } from "react-native";
import { ResizeMode, Video } from "expo-av";
import background from "../../assets/video.mp4"

import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getUserTrackers, getAllUsers, getUserTrainings } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { LinearGradient } from 'expo-linear-gradient';
import { types, colors } from "../../constants/types";
import { useNavigation } from '@react-navigation/native';

const Trackers = () => {
  const { width } = Dimensions.get("window");
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: trackers } = useAppwrite(() => getUserTrackers(user.$id));
  const navigation = useNavigation();

    return (
        <ScrollView className="bg-black h-full w-full">
            <TouchableOpacity onPress={() => {router.push('/trackers')}}>
            <Text className="text-[21px] font-pbold relative text-[#fff] text-center mb-4 mt-10">привычки</Text>
            </TouchableOpacity>
            <View>
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
                <TouchableOpacity onPress={() => navigation.navigate('track', { track })}>
                <LinearGradient colors={colors[track.color]} className="relative w-[90vw] mx-auto h-[165px] bg-[#161616] px-4 py-2 rounded-2xl overflow-hidden mb-4">
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
                </LinearGradient>
                </TouchableOpacity>
            )})}
        </View>
        </ScrollView>
    )
}

export default Trackers;