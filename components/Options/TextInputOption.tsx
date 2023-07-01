import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputSubmitEditingEventData, View } from 'react-native';
import React from 'react';
import { useGlobalStore } from '../../mobx/GlobalStore';

export default function TextInputOption({ defaultValue, property, suffix = '', marginRight = 0 }) {
  const { setProfileEquipmentProperty } = useGlobalStore();

  const handleTextChange = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>  , identifier: string) => {
    const { text } = event.nativeEvent;
    if (defaultValue == text) return;
    console.log('Changed input:', identifier, 'New value:', text);
    await setProfileEquipmentProperty(identifier, text);
  };

  return (
    <View style={styles.container}>
      <TextInput style={[styles.text, {marginRight}]} defaultValue={defaultValue} onSubmitEditing={(event) => handleTextChange(event, property)} onEndEditing={(event) => handleTextChange(event, property)} ></TextInput>
      <Text style={styles.suffix}>{suffix}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#ff726f',
},
textInput: {
},
container: {
    flexDirection: 'row',
    alignItems: 'center',
},
  suffix: {
    fontWeight: '300',
  },
});
