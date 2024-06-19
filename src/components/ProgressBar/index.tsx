import { View } from "react-native";

import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100);

  const sharedProgress = useSharedValue(percentage);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  useEffect(() => {
    sharedProgress.value = withTiming(percentage, {
      easing: Easing.out(Easing.quad),
    });
  }, [current]);

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedStyles]} />
    </View>
  );
}
