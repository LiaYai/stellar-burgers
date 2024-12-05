import { TIngredient } from '@utils-types';

export type ConstructorPageUIProps = {
  isIngredientsLoading: boolean;
  handleDrop: (item: TIngredient) => void;
};
