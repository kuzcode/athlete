import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { getTrainingsForYou } from '../../lib/appwrite'; 

const Club = () => {
  return(
    <ScrollView className="h-[100vh] w-[100vw] bg-black pt-10">
      <Text className="text-white font-pbold text-[24px] mx-4">клуб</Text>
    </ScrollView>
  )
}

export default Club;