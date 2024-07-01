import { useNavigation } from "@react-navigation/native";
import { HouseLine, Trash } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import Animated, {
  LinearTransition,
  SlideOutLeft,
} from "react-native-reanimated";

import { Header } from "../../components/Header";
import { HistoryCard, HistoryProps } from "../../components/HistoryCard";
import { Loading } from "../../components/Loading";

import { Swipeable } from "react-native-gesture-handler";
import { historyGetAll, historyRemove } from "../../storage/quizHistoryStorage";
import { THEME } from "../../styles/theme";
import { styles } from "./styles";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);

  const swipeableRefs = useRef<Swipeable[]>([]);

  const { goBack } = useNavigation();

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    setTimeout(async () => {
      await historyRemove(id);

      fetchHistory();
    }, 500);
  }

  function handleRemove(id: string) {
    Alert.alert("Remover", "Deseja remover esse registro?", [
      {
        text: "Sim",
        style: "destructive",
        onPress: () => {
          swipeableRefs.current?.[Number(id)].close();
          remove(id);
        },
      },
      {
        text: "Não",
        style: "cancel",
        onPress: () => {
          swipeableRefs.current?.[Number(id)].close();
        },
      },
    ]);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header
        title="Histórico"
        subtitle={`Seu histórico de estudos${"\n"}realizados`}
        icon={HouseLine}
        onPress={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {history.map((item) => (
          <Animated.View
            key={item.id}
            layout={LinearTransition.springify()}
            exiting={SlideOutLeft}
          >
            <Swipeable
              ref={(ref) => {
                if (ref) {
                  swipeableRefs.current[Number(item.id)] = ref;
                }
              }}
              overshootRight={false}
              containerStyle={styles.swipeable}
              renderRightActions={() => (
                <TouchableOpacity
                  style={styles.trash}
                  onPress={() => handleRemove(item.id)}
                >
                  <Trash size={32} color={THEME.COLORS.GREY_100} />
                </TouchableOpacity>
              )}
            >
              <HistoryCard data={item} />
            </Swipeable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
