import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, View } from 'react-native';
import React from 'react';
import { useGlobalStore } from '../../mobx/GlobalStore';

export default function TextInputOption({ defaultValue, property, suffix = '' }) {
  const { setProfileEquipmentProperty } = useGlobalStore();

  const handleTextChange = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>  , identifier: string) => {
    const { text } = event.nativeEvent;
    console.log('Changed input:', identifier, 'New value:', text);
    await setProfileEquipmentProperty(identifier, text);
  };

  return (
      <TextInput style={styles.text} defaultValue={defaultValue} onSubmitEditing={(event) => handleTextChange(event, property)}>{suffix}</TextInput>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#ff726f',
  },
  textInput: {
    marginRight: 10,
  },
});
