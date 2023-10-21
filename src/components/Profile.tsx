import { app } from '@/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Profile = () => {
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
`;

const ProfileFlex = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 72px;
  height: 72px;
  background-color: #f2f2f2;
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
  color: gray;
  font-size: 14px;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
  }
`;

export default Profile;
