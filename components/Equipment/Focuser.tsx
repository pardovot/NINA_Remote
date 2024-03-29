import React from 'react';
import EquipmentItem from './EquipmentItem';

const savedProperties = ['Name', 'Position', 'StepSize', 'Temperature', 'IsMoving', 'IsSettling'];

export default function Camera({ navigation, equipmentName }) {
  return <EquipmentItem navigation={navigation} equipmentName={equipmentName} savedProperties={savedProperties} />;
}
