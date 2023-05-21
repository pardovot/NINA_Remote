import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { useGlobalStore } from '../mobx/GlobalStore';
import { ScreenNavigationProp } from 'App';

let interval: number;

export default function LiveView({ navigation }: ScreenNavigationProp) {
  const [image, setImage] = useState('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
  const { fetchPost } = useGlobalStore();

  useEffect(() => {
    interval = setInterval(() => {
      const fetchScreenshot = async () => {
        const body = {
          Device: 'application',
          Action: 'screenshot',
        };
        const res = await fetchPost('equipment', body);
        if (!res) return;
        const { json } = res;
        setImage('data:image/png;base64,' + json.Response);
      };
      fetchScreenshot();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <FastImage
      source={{ uri: image, priority: FastImage.priority.high }}
      resizeMode={FastImage.resizeMode.contain}
      style={styles.fastImage}></FastImage>
  );
}

const styles = StyleSheet.create({
  fastImage: {
    flex: 1,
    justifyContent: 'center',
  },
});
