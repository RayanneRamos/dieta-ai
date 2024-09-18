interface MealsProps {
  schedule: string;
  name: string;
  food: string[];
}

export interface DataProps {
  name: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  objective: string;
  meals: MealsProps[];
  suplements: string[];
}
