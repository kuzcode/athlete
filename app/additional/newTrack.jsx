import { useState } from "react";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Dimensions, Image  } from "react-native";
import { useRoute } from '@react-navigation/native';
import { CustomButton, FormField, Selecter } from "../../components";
import { Link, router } from "expo-router";
import { createTracker } from "../../lib/appwrite";
import { colors } from "../../constants/types";
import { useGlobalContext } from "../../context/GlobalProvider";

const newTrack = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    name: '',
    type: 0,
    goal: 0,
    color: 0,
    userId: user?.$id
  })
return(
  <ScrollView className="bg-[#000] h-full w-full">
    {//<LinearGradient colors={colors[form.color]} className="w-[90vw] h-[200px] mb-4 mx-auto mt-10 rounded-2xl">
}
      <Text className="text-white font-pbold text-[20px] mx-4 mt-3">{form.name}</Text>
    {//</LinearGradient>
}

    <FormField
              title="название"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
              otherStyles="mt-4 mx-4 mb-4"
                />

<FormField
                title="цель"
                value={form.goal.toString()} // Преобразуем целое число в строку для отображения
                handleChangeText={(e) => setForm({ ...form, goal: parseInt(e) || 0 })} // Преобразуем вводимое значение обратно в целое число 
                keyboardType="numeric" // Устанавливаем тип клавиатуры на числовой
                otherStyles="mt-7 mx-4 mb-4"
            />

  <Text className="text-white text-[18px] font-pbold mx-4 mb-2">выберите цвет</Text>
    <View className="flex flex-row flex-wrap justify-around mx-4">
    {colors.map((color, index) => 
  <TouchableOpacity key={index} className="mb-4" onPress={() => {setForm({...form, color: index})}}>
    {//<LinearGradient 
      //className={`w-[18.5vw] h-[18.5vw] rounded-2xl ${form.color === index ? 'border-2 border-white' : ''}`} 
      //colors={color}
    //>
    //</LinearGradient>
}
  </TouchableOpacity>
)}
    </View>
    <TouchableOpacity onPress={() => {createTracker(form); router.push('/home')}} className="bg-white mx-4 py-[18px] rounded-2xl mb-4">
      <Text className="text-black text-[19px] font-pregular text-center">готово</Text>
    </TouchableOpacity>
  </ScrollView>
)
}

export default newTrack;