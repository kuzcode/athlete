import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";

import { getUserPosts, signOut, getUserMap } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";
import { useState, useEffect } from "react";
import { types } from "../../constants/types";
import { useRoute } from '@react-navigation/native';

const otherProfile = () => {
    const route = useRoute();
  const { user } = route.params;
  const { data: map } = useAppwrite(() => getUserMap(user?.$id));
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map[0]) { // Проверяем, пришли ли данные пользователя
      setMarkers(map[0].markers); // Если sports не определен, используем пустой массив
      console.log(markers);
}
  }, [map]); // Срабатывает при изменении данных пользователя


  const percentage = 61; // Значение от 1 до 100
  const blockWidth = `${percentage}%`;

  const styles = StyleSheet.create({
    text: {
      fontSize: 24,
      marginBottom: 10,
    },
    outerBlock: {
      width: '100%',
      height: 30,
      backgroundColor: '#252525',
      borderRadius: 6,
      overflow: 'hidden',
    },
    innerBlock: {
      height: '100%',
      backgroundColor: '#fff',
    },


    outer: {
      width: '100%',
      height: 10,
      backgroundColor: '#252525',
      borderRadius: 6,
      overflow: 'hidden',
    },
    inner: {
      height: '100%'
    },
  });
  
  const filteredList = types.filter(item => user?.sports?.includes(item.key));

  return (
    <ScrollView className="bg-[#000] h-full">
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={settings}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6 mt-[20px]"
              />
            </TouchableOpacity>

            <View className="w-[140px] h-[140px] rounded-full mb-4 flex justify-center items-center">
              <Image
                source={{ uri: user?.imageUrl }}
                className="w-[100%] h-[100%] rounded-full"
                resizeMode="cover"
              />
            </View>

            <Text className="text-[21px] font-pbold text-white">
              {user?.name}
            </Text>
            <Text className="text-lg font-psemibold text-[#838383]">
              @{user?.username}
            </Text>
          </View>
          

          <View className="bg-[#111] mx-auto w-[91.545vw] h-[53vw] py-3 rounded-[16px]">
            <Text className="text-white font-pbold absolute mt-3 mx-4 text-[19px]">Участник клуба</Text>
            <Text className="text-white text-right font-pbold mx-4 text-[19px]">01/10</Text>
            <Text className="text-[#838383] font-pregular mx-4 text-[18px]">Первый уровень</Text>

            <Text className="text-[#838383] font-pregular text-[18px] mx-4">0000 0000 0000 0001</Text>
            <View className="mx-4 mt-2 absolute w-[83.545vw] bottom-4">
              <View style={styles.outerBlock}>
              <View style={[styles.innerBlock, { width: blockWidth }]} />
              <Text className="left-0 bottom-[5px] text-[18px] w-full text-center absolute font-pregular">{percentage}%</Text>
              </View>
            </View>
          </View>

          <View className="bg-[#111] mx-auto w-[91.545vw] py-3 rounded-[16px] mt-4">
            <Text className="text-white font-pbold mx-4 text-[19px]">О себе</Text>
            <View className="z-20 flex w-full flex-row flex-wrap px-4 pr-[12px]">
              <Text className="text-[#838383] mr-1 text-[16px] font-pregular">Интересуюсь:</Text>
                {filteredList.map(kind =>
                  <View className="bg-[#252525] border-[1px] border-[#292929] shadow-lg flex relative rounded-3xl mr-[4px] pt-[1px] pb-[3px] px-[9px] z-20">
                    <Text className="text-white font-pregular text-[#bdbdbd] text-[16px]">{kind.title}</Text></View>
                )}
            </View>
            {user.bio !== '' || user.bio !== null && (
              <Text className="text-[#838383] mx-4 text-[16px] font-pregular">Био: {user.bio}</Text>
            )}
          </View>
          <TouchableOpacity className="bg-[#111] mx-3 rounded-2xl pt-2 pb-4 my-4 px-4"
          onPress={() => {router.push("/map")}}
          >
          <Text className="text-white font-pbold text-[19px]">Счётчик</Text>
            <View>
              {markers.map(marker => {
                const x = Math.max(...markers.map(marker => marker.time));
                const w = marker.time / x * 100;
                let sport = types.find(sport => sport.key == marker.type);
                return(
              <View className="flex justify-end">
                <Text className="text-white font-pregular text-[#838383] text-[18px] mt-2 mb-1">{sport?.title}: {marker.time} мин</Text>
                  <View style={styles.outer}>
                  <View style={[styles.inner, { width: `${w}%`, backgroundColor: sport?.color }]} />
                  </View>
                </View>
                )})}
            </View>
          </TouchableOpacity>
    </ScrollView>
  );
};

export default otherProfile;
