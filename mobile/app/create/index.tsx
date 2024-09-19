import { Header } from "@/components/header";
import { Select } from "@/components/Select";
import { colors } from "@/constants/colors";
import { useDataStore } from "@/store/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório." }),
  objective: z.string().min(1, { message: "O objetivo é obrigatório." }),
  level: z.string().min(1, { message: "O level é obrigatório." }),
});

type formData = z.infer<typeof schema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  const levelOptions = [
    {
      label: "Sedentário (pouco ou nenhuma atividade física)",
      value: "sedentário",
    },
    {
      label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
      value: "levemente ativo",
    },
    {
      label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
      value: "moderadamente ativo",
    },
    {
      label: "Altamente ativo (exercícios 5 a 7 vezes na semana)",
      value: "altamente ativo",
    },
  ];

  const objectiveOptions = [
    { label: "Emagrecer", value: "emagrecer" },
    { label: "Hipertrofia", value: "hipertrofia" },
    { label: "Hipertrofia + Definição", value: "hipertrofia e definição" },
    { label: "Definição", value: "definição" },
  ];

  function handleCreateDiet(data: formData) {
    setPageTwo({
      gender: data.gender,
      level: data.level,
      objective: data.objective,
    });

    router.push("/nutrition");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo"
          error={errors.gender?.message}
          options={genderOptions}
        />
        <Text style={styles.label}>Selecione o nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o nível de atividade física"
          error={errors.level?.message}
          options={levelOptions}
        />
        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione seu objetivo"
          error={errors.objective?.message}
          options={objectiveOptions}
        />
        <Pressable
          style={styles.button}
          onPress={handleSubmit(handleCreateDiet)}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },

  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
