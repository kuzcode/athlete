import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import useAppwrite from "../../lib/useAppwrite";
import { updateUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { types } from "../../constants/types";
import { icons } from "../../constants";
import { CustomButton, FormField, Selecter } from "../../components";
import * as DocumentPicker from "expo-document-picker";


const profileSettings = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
        avatar: user.imageUrl,
        name: user.name,
        username: user.username,
        id: user.$id,
    })


  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type:["image/png", "image/jpg", "image/jpeg"]});

        setForm({
          ...form,
          avatar: result.assets[0].uri,
        });

        console.log(form.avatar)
  };


    return(
        <View className="bg-[#111] w-full h-full px-4">    
        <TouchableOpacity onPress={() => openPicker()} className="w-[140px] h-[140px] mx-auto mt-[80px] rounded-full mb-4 flex justify-center items-center">
          <Image
            source={{ uri: form.avatar || 'https://pixlr.com/ru/image-generator/' }} 
            className="w-[100%] h-[100%] rounded-full"
            resizeMode="cover"
          />
        </TouchableOpacity>

          <FormField
            title="имя"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="никнейм"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />


            <TouchableOpacity onPress={() => {updateUser(form)}} className="bg-white py-3 absolute bottom-4 w-full rounded-xl ml-4">
                <Text className="text-center font-pregular text-[18px]">сохранить</Text>
            </TouchableOpacity>
        </View>
    )
}

export default profileSettings;