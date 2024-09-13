import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";

const Selecter = ({
  title,
  value,
  placeholder,
  handleChangeText,
  options,
  otherStyles,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleChangeText(option);
    setModalVisible(false);
  };

  return (
    <View className={`rounded-xl ${otherStyles}`}>
      <Text className="text-[19px] text-[#838383] font-psemibold mb-[6px]">{title}</Text>

      <TouchableOpacity
        style={styles.selectContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-pregular text-[18px]">{selectedOption || "выбрать"}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleOptionSelect(item)}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    color: '#838383',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#111',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#222',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  selectText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    height: 56,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#222',
    color: '#fff',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 16,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Selecter;