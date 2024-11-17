import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrderIngredients,
  selectOrderModalData,
  selectOrderRequest,
  resetOrder,
  sendNewOrder
} from '../../services/newOrder';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectOrderIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const dispatch: AppDispatch = useDispatch();

  const orderIngredients = useMemo(
    () =>
      (constructorItems.bun
        ? [...constructorItems.ingredients, constructorItems.bun]
        : constructorItems.ingredients
      ).map((item) => item.name),
    [constructorItems]
  );
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    dispatch(sendNewOrder(orderIngredients));
  };
  const closeOrderModal = useCallback(() => dispatch(resetOrder()), []);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
