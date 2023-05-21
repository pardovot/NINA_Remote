import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Button, Switch, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../mobx/GlobalStore';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import { observer } from 'mobx-react-lite';
import { ScreenNavigationProp } from 'App';

export default observer(function Imaging({ navigation }: ScreenNavigationProp) {
  const { base64Image, autoRefreshImage, setAutoRefreshImage, fetchLastImage } = useGlobalStore();
  const defaultImage = require('../public/no-image.png');
  const [shouldButtonsShow, setShouldButtonsShow] = useState(true);
  const [buttonOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation(1, 1000);
    const controller = new AbortController();
    (async () => {
      await fetchLastImage();
    })();
    return () => controller?.abort();
  }, []);

  const zoomEndHandler = (event, gestureState, zoomableViewEventObject) => {
    const currentZoom = zoomableViewEventObject.zoomLevel;
    if (currentZoom > 1 && currentZoom < 1.2) {
      startAnimation(1 - (currentZoom % 1) * 7);
    } else if ((currentZoom > 1.2 && currentZoom < 3) || currentZoom === 3) {
      startAnimation(0);
    } else if (currentZoom === 1) {
      startAnimation(1);
    }
  };

  const zoomStartHandler = () => {
    if (!base64Image) return true;
  };

  const handleRefreshToggle = () => {
    setAutoRefreshImage(!autoRefreshImage);
  };

  const handleSingleTap = () => {
    setShouldButtonsShow(!shouldButtonsShow);
    startAnimation(shouldButtonsShow ? 0 : 1);
  };

  const startAnimation = (opacityValue = 1, durationValue = 300) => {
    Animated.timing(buttonOpacity, {
      toValue: opacityValue, // Target opacity value (1 = fully opaque)
      duration: durationValue, // Duration of the animation in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  };

  const styles = StyleSheet.create({
    buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    buttonsViewContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: '1.5%',
      marginBottom: '1.5%',
      marginLeft: '30%',
      marginRight: '30%',
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

  const animatedContainerStyle = {
    opacity: buttonOpacity,
  };

  return (
    <View style={{ flex: 1 }}>
      <ReactNativeZoomableView
        maxZoom={10}
        initialZoom={1}
        minZoom={0.98}
        zoomStep={3}
        bindToBorders={true}
        onZoomAfter={zoomEndHandler}
        onSingleTap={handleSingleTap}
        onZoomBefore={zoomStartHandler}
        onShiftingBefore={zoomStartHandler}>
        <ImageBackground source={base64Image ? { uri: base64Image } : defaultImage} resizeMode="contain" style={styles.image}></ImageBackground>
      </ReactNativeZoomableView>
      {
        <Animated.View style={[styles.buttonsContainer, animatedContainerStyle]}>
          <View style={styles.buttonsViewContainer}>
            <TouchableOpacity>
              <Button title="Main Menu" onPress={() => navigation.navigate('MainView')} />
            </TouchableOpacity>
            <Button title="REFRESH" onPress={() => fetchLastImage()} />
            <Text>Auto Refresh:</Text>
            <Switch value={autoRefreshImage} onValueChange={handleRefreshToggle} />
          </View>
        </Animated.View>
      }
    </View>
  );
});
