import { colors } from "@/constants/colors";
import { api } from "@/services/api";
import { useDataStore } from "@/store/data";
import { useQuery } from "@tanstack/react-query";
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Data } from "@/types/data";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

interface ResponseProps {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((state) => state.user);
  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Field load nutrition");
        }

        const response = await api.post<ResponseProps>("/create-nutrition", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          level: user.level,
          objective: user.objective,
        });

        return response.data.data;
      } catch (error) {
        throw new Error();
      }
    },
  });

  async function handleShare() {
    try {
      if (data && Object.keys(data).length === 0) {
        return;
      }

      const suplements = `${data?.suplementos.map(
        (suplemento) => `${suplemento}`
      )}`;
      const foods = `${data?.refeicoes.map(
        (refeicao) =>
          `\n- Nome: ${refeicao.nome}\n- Horário: ${
            refeicao.horario
          }\n- Alimentos: ${refeicao.alimentos.map(
            (alimento) => `${alimento}`
          )}`
      )}`;

      const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n ${foods}\n\n- Dica de suplemento: ${suplements}`;

      await Share.share({
        message: message,
      });
    } catch (error) {
      throw new Error();
    }
  }

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
        <Text style={styles.loadingText}>Consultando IA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
        <Link href="/">
          <Text style={styles.loadingText}>Tente novamente!</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha dieta</Text>
          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
            <Feather name="share-2" size={16} color={colors.white} />
          </Pressable>
        </View>
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.nome}</Text>
            <Text style={styles.objective}>Foco: {data.objetivo}</Text>
            <Text style={styles.label}>Refeições:</Text>
            <ScrollView>
              <View style={styles.meals}>
                {data.refeicoes.map((refeicao) => {
                  return (
                    <View key={refeicao.nome} style={styles.food}>
                      <View style={styles.foodHeader}>
                        <Text style={styles.foodName}>{refeicao.nome}</Text>
                        <Ionicons
                          name="restaurant"
                          size={16}
                          color={colors.black}
                        />
                      </View>
                      <View style={styles.foodContent}>
                        <Ionicons name="time" size={16} color={colors.black} />
                        <Text>{refeicao.horario}</Text>
                      </View>
                      <Text style={styles.foodText}>Alimentos:</Text>
                      {refeicao.alimentos.map((alimento) => (
                        <Text key={alimento}>{alimento}</Text>
                      ))}
                    </View>
                  );
                })}
              </View>
              <View style={styles.suplements}>
                <Text style={styles.foodName}>Dica de suplementos:</Text>
                {data.suplementos.map((suplemento) => {
                  return <Text key={suplemento}>{suplemento}</Text>;
                })}
              </View>
              <Pressable
                style={styles.buttonNewDiet}
                onPress={() => router.replace("/")}
              >
                <Text style={styles.buttonNewDietText}>Gerar nova dieta</Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16,
  },

  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },

  title: {
    fontSize: 28,
    color: colors.background,
    fontWeight: "bold",
  },

  buttonShare: {
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
  },

  buttonShareText: {
    color: colors.white,
    fontWeight: "500",
  },

  name: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },

  objective: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 24,
  },

  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  meals: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },

  food: {
    backgroundColor: "rgba(208, 208, 208, 0.40)",
    padding: 8,
    borderRadius: 4,
  },

  foodHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  foodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  foodText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },

  suplements: {
    backgroundColor: colors.white,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    borderRadius: 8,
  },

  buttonNewDiet: {
    backgroundColor: colors.blue,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 24,
  },

  buttonNewDietText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
