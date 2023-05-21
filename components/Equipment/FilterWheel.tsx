import React from 'react';
import EquipmentItem from './EquipmentItem';

const savedProperties = ['Name', 'IsMoving', 'SelectedFilter'];
const innerProperties = ['_name', '_position'];

export default function FilterWheel({ navigation, equipmentName }) {
  return (
    <EquipmentItem
      navigation={navigation}
      equipmentName={equipmentName}
      savedProperties={savedProperties}
      innerProperties={innerProperties}
      shortenedName={'Filter'}
    />
  );
}
