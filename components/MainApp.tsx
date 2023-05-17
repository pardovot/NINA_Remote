import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { ScreenNavigationProp } from 'App';
import { useGlobalStore } from '../mobx/GlobalStore';

const MainApp = observer(({ navigation }: ScreenNavigationProp) => {
  const { handleScreenTabClick, isTabHidden } = useGlobalStore();

  return (
    <Pressable style={styles.container} onLongPress={handleScreenTabClick}>
      {isTabHidden && (
        <View>
          <Text>MainApp</Text>
        </View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 30,
  },
});

export default MainApp;
