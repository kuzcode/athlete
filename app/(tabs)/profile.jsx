import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import useAppwrite from "../../lib/useAppwrite";
import { getUserMap, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { types } from "../../constants/types";
import { icons } from "../../constants";

const Profile = () => {
  const router = useRouter();
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: map } = useAppwrite(() => getUserMap(user.$id));
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    if (map[0]) {
      setMarkers(map[0].markers);
      console.log('Markers:', map[0].markers);
    }
  }, [map]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  const settings = () => {
    router.push("/additional/settings");
  };

  const percentage = 61; // Значение от 1 до 100
  const blockWidth = percentage + '%';

  const styles = StyleSheet.create({
    text: {
      fontSize: 24,
      marginBottom: 10,
    },
    outerBlock: {
      width: '100%',
      height: 30,
      backgroundColor: '#1F75FF',
      borderRadius: 6,
      overflow: 'hidden',
    },
    innerBlock: {
      height: '100%',
      backgroundColor: '#99C0FF',
    }
  });

  const filteredList = types.filter(item => user?.sports?.includes(item.key));

  return (
    <ScrollView className="bg-[#000] h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity onPress={settings} className="flex w-full items-end mb-10">
          <Image source={icons.logout} resizeMode="contain" className="w-6 h-6 mt-[20px]" />
        </TouchableOpacity>

        <View className="w-[140px] h-[140px] rounded-full mb-4 flex justify-center items-center">
          <Image
            source={{ uri: user?.imageUrl || 'default-image-url' }} 
            className="w-[100%] h-[100%] rounded-full"
            resizeMode="cover"
          />
        </View>

        <Text className="text-[21px] font-pbold text-white">{user?.name}</Text>
        <Text className="text-lg font-psemibold text-[#838383]">@{user?.username}</Text>
      </View>

      <View className="bg-[#3c87ff] mx-auto w-[91.545vw] h-[53vw] py-3 rounded-[16px]">
        <View className="my-auto pb-3">
        <Text className="text-white font-pbold mx-4 text-[32px] text-center mb-0">атлет</Text>
        <Text className="text-white font-pregular mx-4 text-[#ffffff83] mt-[-6px] text-[17px] text-center">стиль твоей жизни.</Text>
        </View>
        <View className="mx-4 mt-2 absolute w-[83.545vw] bottom-4">
          {//<View style={styles.outerBlock}>
            //<View style={[styles.innerBlock, { width: blockWidth }]} />
            //<Text className="left-0 bottom-[3px] text-[18px] w-full text-center absolute font-pregular text-[#fff]">{percentage}%</Text>
          //</View>
}
        </View>
      </View>


      <View className="bg-[#111] mx-auto w-[91.545vw] py-3 rounded-[16px] mt-4">
  <Text className="text-white font-pbold mx-4 text-[19px]">О себе</Text>
  <View className="z-20 flex w-full flex-row flex-wrap px-4 pr-[12px]">
    <Text className="text-[#838383] mr-1 text-[16px] font-pregular">Интересуюсь:</Text>
    {filteredList.map(kind => (
      <View key={kind.id} className="bg-[#252525] border-[1px] border-[#292929] shadow-lg flex relative rounded-3xl mr-[4px] pt-[1px] pb-[3px] px-[9px] z-20">
        <Text className="text-white font-pregular text-[#bdbdbd] text-[16px]">{kind.title}</Text>
      </View>
    ))}
  </View>
  {user.bio !== '' && user.bio !== null && (
    <Text className="text-[#838383] mx-4 text-[16px] font-pregular">Био: {user.bio}</Text>
  )}
</View>
<TouchableOpacity className="bg-[#111] mx-3 rounded-2xl pt-2 pb-4 my-4 px-4" onPress={() => {router.push("/map")}}>
  <Text className="text-white font-pbold text-[19px]">Счётчик</Text>
  {markers.length == 0 ? (
    <View>
        <Text className="text-[#fff] text-center font-pbold m-0 bg-[#333] rounded-full mx-auto w-[64px] mt-[24px] h-[64px] text-[40px]">+</Text>
        <Text className="text-[#838383] text-center font-pregular text-[15px] mt-[8px]">создать карту</Text>
    </View>
  ) : (
  <View>
    {markers.map(marker => {
      const x = Math.max(...markers.map(marker => marker.time));
      const w = (marker.time / x) * 100;
      let sport = types.find(sport => sport.key == marker.type);
      return (
        <View key={marker.id} className="flex justify-end">
          <Text className="text-white font-pregular text-[#838383] text-[18px] mt-2 mb-1">{sport?.title}: {marker.time} мин</Text>
          <View style={styles.outer}>
            <View style={[styles.inner, { width: `${w}%`, backgroundColor: sport?.color }]} />
          </View>
        </View>
      );
    })}
  </View>
    )}
</TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;