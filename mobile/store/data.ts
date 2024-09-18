import { create } from "zustand";

export type User = {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  level: string;
  objective: string;
};

type DataState = {
  user: User;
  setPageOne: (data: Omit<User, "gender" | "objective" | "level">) => void;
  setPageTwo: (data: Pick<User, 'gender' | 'objective' | 'level'>) => void;
};

export const useDataStore = create<DataState>((set) => ({
  user: {
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    level: "",
    objective: "",
  },

  setPageOne: (data) => set((state) => ({ user: { ...state.user, ...data } })),
  setPageTwo: (data) => set((state) => ({ user: { ...state.user, ...data } }))
}));
