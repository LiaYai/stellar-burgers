import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient, TBurger, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  getOrderIngredients,
  getOrderModalData,
  getOrderRequest,
  resetOrder,
  postOrder,
  getUserData
} from '@slices';
import AppRoutes from '@constants';
import { useNavigate } from 'react-router-dom';

const flatIngredients = (ingredients: TBurger) =>
  (ingredients.bun
    ? [...ingredients.ingredients, ingredients.bun, ingredients.bun]
    : ingredients.ingredients
  ).map((item) => item._id);

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getOrderIngredients);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const user = useSelector(getUserData);

  const orderIngredients = useMemo(
    () => flatIngredients(constructorItems),
    [constructorItems]
  );

  // Клик на кнопку заказа
  const onOrderClick = useCallback(() => {
    if (!constructorItems.bun || !constructorItems.ingredients.length)
      return alert('Выберите ингредиенты');
    if (orderRequest)
      return alert('Заказ уже отправлен, подождите, пожалуйста');
    if (!user) {
      return navigate(AppRoutes.LOGIN);
    }
    dispatch(postOrder(orderIngredients));
  }, [constructorItems, orderRequest, orderIngredients]);

  const closeOrderModal = useCallback(() => dispatch(resetOrder()), [dispatch]);

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
