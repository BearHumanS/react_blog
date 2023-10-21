import AuthContext from '@/context/AuthContext';
import { app } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import {
  ProfileBox,
  ProfileFlex,
  ProfileImage,
  ProfileUserInfo,
  ProfileEmail,
  ProfileUserName,
  ProfileLogout,
} from './Profile';

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const auth = getAuth(app);

  const onLogout = async () => {
    try {
      await signOut(auth);
      toast.success('로그아웃이 되었습니다.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <>
      <ProfileBox>
        <ProfileFlex>
          <ProfileImage />
          <ProfileUserInfo>
            <ProfileEmail>{auth?.currentUser?.email}</ProfileEmail>
            <ProfileUserName>
              {auth?.currentUser?.displayName || '사용자'}
            </ProfileUserName>
          </ProfileUserInfo>
        </ProfileFlex>
        <ProfileLogout role="presentation" onClick={onLogout}>
          로그아웃
        </ProfileLogout>
      </ProfileBox>
    </>
  );
};
