import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '@store';
import { getUserData, setUser } from '@slices';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@utils-cookie';
import { useSelector } from 'react-redux';
import { loginUserApi } from '@api';
import AppRoutes from '@constants';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserData);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    loginUserApi({ email, password })
      .then((res) => {
        dispatch(setUser(res.user));
        setCookie('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch((error) => setError(error));
  };

  return (
    <LoginUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
