import AuthContext from '@/context/AuthContext';
import { useContext, useMemo } from 'react';
export const images = [
  'https://github.com/BearHumanS/react_blog/assets/115094069/a3232774-47f9-466e-bb8e-3f069e54fe69',
  'https://github.com/BearHumanS/react_blog/assets/115094069/0d895ed2-3684-4567-ad60-293a7f41f2c2',
  'https://github.com/BearHumanS/react_blog/assets/115094069/127d06f4-f0da-4e24-bb07-cb84b6bc4688',
];

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/* export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*()-+=])(?=.*[a-zA-Z]).{8,16}$/; */

export type CategoryType = 'free' | '면접질문' | '스터디' | '회고';
export const CATEGORYS: CategoryType[] = ['면접질문', '스터디', '회고'];

export const useAdmin = () => {
  const { user } = useContext(AuthContext);

  // useMemo를 사용하여 user.email 값이 변경될 때만 ADMIN 값을 재계산합니다.
  const isAdmin = useMemo(() => {
    return user?.email === import.meta.env.VITE_ADMIN_ID;
  }, [user?.email]);

  return isAdmin;
};

export const PROFILE_DEFAULT_IMG = '/default_profile.svg';
