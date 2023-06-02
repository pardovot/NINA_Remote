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
    <View style={styles.container}>
      <TextInput style={styles.text} defaultValue={defaultValue} onSubmitEditing={(event) => handleTextChange(event, property)}></TextInput>
      <Text style={styles.suffix}>{suffix}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#ff726f',
    marginLeft: 5,
},
textInput: {
},
container: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: '20%',
},
// textInput: {
//     marginRight: 8,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingHorizontal: 8,
//   },
  suffix: {
    // fontSize: 16,
    fontWeight: '300',
    
  },
});
