import { colors } from "@/constants/colors";
import { api } from "@/services/api";
import { useDataStore } from "@/store/data";
import { useQuery } from "@tanstack/react-query";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DataProps } from "@/types/data";
import { Link } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

interface ResponseProps {
  data: DataProps;
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
          objetive: user.objective,
        });

        console.log(response.data.data);
        return response.data.data;
      } catch (error) {
        throw new Error();
      }
    },
  });

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
          <Pressable style={styles.buttonShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
            <Feather name="share-2" size={16} color={colors.white} />
          </Pressable>
        </View>
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.name}</Text>
            <Text style={styles.objective}>Foco: {data.objective}</Text>
            <Text style={styles.label}>Refeições:</Text>
            <ScrollView>
              <View style={styles.meals}>
                {data.meals.map((meal) => (
                  <View key={meal.name} style={styles.foodHeader}>
                    console.log(meal)
                    <View>
                      <Text>{meal.name}</Text>
                      <Ionicons
                        name="restaurant"
                        size={16}
                        color={colors.black}
                      />
                    </View>
                    <View style={styles.foodContent}>
                      <Ionicons name="time" size={16} color={colors.black} />
                      <Text>{meal.schedule}</Text>
                    </View>
                  </View>
                ))}
              </View>
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

  meals: {},

  foodHeader: {},

  foodContent: {},
});
