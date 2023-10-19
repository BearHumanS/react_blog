import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Profile = () => {
  return (
    <>
      <ProfileBox>
        <ProfileFlex>
          <ProfileImage />
          <ProfileUserInfo>
            <ProfileEmail>test@test.com</ProfileEmail>
            <ProfileUserName>유저저</ProfileUserName>
          </ProfileUserInfo>
        </ProfileFlex>
        <ProfileLogout to="/">로그아웃</ProfileLogout>
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

const ProfileLogout = styled(Link)`
  color: gray;
  font-size: 14px;

  &:hover,
  &:focus {
    color: black;
  }
`;

export default Profile;
