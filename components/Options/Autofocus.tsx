import { StyleSheet, Switch, Text, View } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '../../mobx/GlobalStore';

export default observer(function Autofocus() {

  const { focuserSettings, setProfileEquipmentProperty } = useGlobalStore();
  const { UseFilterWheelOffsets } = focuserSettings || { UseFilterWheelOffsets: false };

  const handleFilterOffsetsSwitch = async () => {
    await setProfileEquipmentProperty('FocuserSettings-UseFilterWheelOffsets', (!focuserSettings.UseFilterWheelOffsets).toString());
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Autofocus Settings</Text>
      <Text> Use filter offsets</Text>
      <Switch value={UseFilterWheelOffsets} onValueChange={handleFilterOffsetsSwitch} />
      {/* <TextInputOption defaultValue={cameraSettings?.PixelSize?.toString()} property={'CameraSettings-PixelSize'} suffix="μm" />
      <Text style={styles.textInput}>Bit Depth:</Text>
      <TextInputOption defaultValue={cameraSettings?.BitDepth?.toString()} property={'CameraSettings-BitDepth'} /> */}
    </View>
  )
});

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    paddingBottom: 5,
  },
  container: {
    marginLeft: '1%',
    alignItems: 'center',
        // borderColor: 'gray',
    // borderWidth: 1,
  },
  cameraRow: {},
  textInput: {},
});