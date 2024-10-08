import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, TouchableOpacity, Text, ScrollView, Animated, StyleSheet, Dimensions, } from "react-native";

import { sporticons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getTrainingsForYou, getCurrentUser } from "../../lib/appwrite";
import { Svg } from "react-native-svg";

import { types } from "../../constants/types";

const Train = () => {
  const { data: trainings } = useAppwrite(() => getTrainingsForYou(['0', '1']));

  const { data: user, isLoading: trainingsLoading } = useAppwrite(getCurrentUser);
  
  const [updatedSports, setUpdatedSports] = useState([]);

  useEffect(() => {
    if (user) { // Проверяем, пришли ли данные пользователя
      let sports = user.sports || []; // Если sports не определен, используем пустой массив

      let updated = sports.map(key => {
        let sport = types.find(sport => sport.key === key);
        return sport || { title: 'Неизвестный', key: key };
      });

      updated.unshift(types[0]);

      // Заполнение до 5 элементов
      if (updated.length < 5) {
        let existingKeys = new Set(updated.map(sport => sport.key));
        types.forEach(sport => {
          if (!existingKeys.has(sport.key) && updated.length < 5) {
            updated.push(sport);
          }
        });
      }

      setUpdatedSports(updated); // Обновляем состояние с новым массивом
    }
  }, [user]); // Срабатывает при изменении данных пользователя

  const [current, setCurrent] = useState(
    {
      title: 'все',
      key: 'all'
    }
    )
      

    const { height } = Dimensions.get('window');
    
  const [visible, setVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(height)).current;

    const showNotification = () => {
      setVisible(true);
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  
    const hideNotification = () => {
      Animated.timing(slideAnimation, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    };

  const filteredTrainings = current.key === 'all' 
  ? trainings
  : trainings.filter(train => train.kind === current.key)
  
  types.push({ title: 'все', key: 'all'})

  return (
    <SafeAreaView className="bg-[#000] h-full">
      <Text className="font-pbold text-[#fff] text-[27px] mx-4 mt-3 mb-3">новое</Text>
    <View>
    <ScrollView horizontal={true} className="flex px-3">
        {updatedSports.map(type =>
          <TouchableOpacity className="flex rounded-xl pt-1 pb-2 px-4 mx-1"
          key={type.key}
          onPress={() => {setCurrent({title: type.title, key: type.key})}}
          activeOpacity={0.9}
          style={{
            backgroundColor: current.key == type.key ?  '#fff' : '#111',
          }}
          > 
            <Text className="flex text-[16px] font-pmedium"
            style={{
              color: current.key == type.key ?  '#000' : '#838383',
            }}
            >{type.title}</Text>
          </TouchableOpacity>
        )}
    </ScrollView>
    </View>

    <TouchableOpacity className="bg-[#111] mx-4 mt-4 h-[120px] rounded-2xl flex justify-center"
    activeOpacity={0.85}
    onPress={showNotification}
    >
        <Text className="font-pregular text-lg text-[#838383] text-center">cоздать свою +</Text>
    </TouchableOpacity>


    <Text className="font-pbold text-[27px] mx-4 mt-2 mb-3 text-white">примите участие</Text>
    

  {filteredTrainings.length == 0 ? (
    <Text className="text-center text-[#838383] text-lg mx-4 mt-4 font-pregular">тренировок пока нет :(</Text>
  ) : (

  filteredTrainings.map(train => {
    // Создаем объект даты из строки
    const date = new Date(train.date);
    
    // Создаем массив с месяцами
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const types = ['Бег 🏃', 'Качалка 🏋️‍♂️', 'Велоспед', 'Плавание'];
    const iconstypes = ['running', 'gym', 'cycling', 'swimming'];
    
    // Получаем нужные значения
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Форматируем дату
    const formattedDate = `${day} ${month}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    const formattedType = types[Number(train.kind)];
    const formattedIcon = iconstypes[Number(train.kind)];

    return (
      <View key={train.id} className="mx-4 h-[120px] bg-[#111] px-4 py-2 rounded-2xl overflow-hidden mb-4">
        <Text className="font-pbold text-xl text-[#fff]">{train.title}</Text>
        <Text className="font-pregular text-xl text-[#838383]">{formattedDate}</Text>
        <Text className="font-pregular text-xl text-[#838383]">{formattedType}</Text>
        <Svg
          source={sporticons[formattedIcon]}
          className="absolute right-[-5px] top-[-5px] w-[130px] h-[130px] overflow-hidden"
        />
      </View>
    );
})
)}


{visible && (
        <Animated.View className="absolute w-full bg-white h-[100vh] py-[36px] px-4" style={[{ transform: [{ translateY: slideAnimation }] }]}>
          <Text className="font-pbold text-2xl">Создайте своместную тренировку</Text>
          <Text className="font-psemibold text-xl text-[#333]">Вид спорта</Text>
          
          <TouchableOpacity onPress={hideNotification} className="">
            <Text className="mt-[70vh] text-center">Закрыть</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
</SafeAreaView>
  );
};

export default Train;