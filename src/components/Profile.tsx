import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { app } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { PROFILE_DEFAULT_IMG } from '@/lib/constants';

const Profile = () => {
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
          <ProfileImage>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="프로필" width={72} height={72} />
            ) : (
              <img
                src={PROFILE_DEFAULT_IMG}
                alt="프로필"
                width={72}
                height={72}
              />
            )}
          </ProfileImage>
          <ProfileUserInfo>
            <ProfileEmail>{user?.email}</ProfileEmail>
            <ProfileUserName>{user?.displayName || '사용자'}</ProfileUserName>
          </ProfileUserInfo>
        </ProfileFlex>
        <ProfileLogout role="presentation" onClick={onLogout}>
          로그아웃
        </ProfileLogout>
      </ProfileBox>
    </>
  );
};

const ProfileBox = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  font-size: 18px;
  margin: 0 auto;
  max-width: 680px;
  text-align: left;
  line-height: 24px;
  justify-content: space-between;
  padding: 20px;
  background-color: ${(props) => props.theme.profileBox};
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ProfileFlex = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 72px;
  height: 72px;

  border-radius: 50%;
`;

const ProfileUserInfo = styled.div``;

const ProfileEmail = styled.div`
  font-weight: 500;
`;

const ProfileUserName = styled.div`
  font-size: 16px;
  padding: 4px 0;
`;

const ProfileLogout = styled.div`
  color: ${(props) => props.theme.logout};
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.logoutHover};
  }
`;

export default Profile;
