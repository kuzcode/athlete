import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getTrainingsForYou } from '../../lib/appwrite';

const user = {
  sports: [0, 1, 2], // Пример индексов видов спорта
};

const types = [
  { title: 'бег', key: '0', a: 'пробежку', color: '#FE5F55', track: [0, 1, 2, 3] },
  { title: 'плавание', key: '1', a: 'плыть', color: '#1E90FF', track: [4, 5, 6, 7] },
  { title: 'велосипед', key: '2', a: 'поездку', color: '#32CD32', track: [8, 9, 10, 11] },
  // Добавьте больше видов спорта, если необходимо
];

const Club = () => {
  const [trainings, setTrainings] = useState([]);
  const [selectedSport, setSelectedSport] = useState('Все виды спорта');

  useEffect(() => {
    const fetchTrainings = async () => {
      const results = await getTrainingsForYou(user.sports);
      const currentDate = new Date().toISOString(); // Или используйте нужный формат для Appwrite
      const filteredResults = results.filter(training => training.date >= currentDate);
      setTrainings(filteredResults);
    };

    fetchTrainings();
  }, []);

  const handleTrainingPress = (id) => {
    // Здесь должна быть ваша логика для перехода на страницу тренировки
  };

  return (
    <View className="bg-black flex-1 p-4">
      <Text className="text-white text-[24px] font-pbold mb-4">Клуб тренировок</Text>

      <ScrollView horizontal style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => setSelectedSport('Все виды спорта')}
          className={`p-2 ${selectedSport === 'Все виды спорта' ? 'bg-gray-700' : ''}`}
        >
          <Text className="text-white font-pregular">Все виды спорта</Text>
        </TouchableOpacity>
        {user.sports.map((sportIndex) => (
          <TouchableOpacity
            key={types[sportIndex].key}
            onPress={() => setSelectedSport(types[sportIndex].title)}
            className={`p-2 ${selectedSport === types[sportIndex].title ? 'bg-gray-700' : ''}`}
          >
            <Text className="text-white font-pregular">{types[sportIndex].title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView>
        {trainings.map((training) => (
          <TouchableOpacity
            key={training.id}
            onPress={() => handleTrainingPress(training.id)}
            className="bg-gray-800 p-4 rounded-lg mb-4"
          >
            <Text className="text-white font-psemibold text-[18px]">{training.title}</Text>
            <Text className="text-gray-400 font-pregular">{new Date(training.date).toLocaleString()}</Text>
            <Text className="text-gray-400 font-pregular">{types[training.typeIndex].title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="mt-4">
        <Text className="text-white text-[18px] font-pbold">Популярные тренировки</Text>
        {/* Здесь можно добавить блоки для популярных тренировок или других элементов */}
      </View>
    </View>
  );
};

export default Club;