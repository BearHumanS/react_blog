import { DefaultTheme } from 'styled-components';

//상세 디자인 스타일은 우주부동산 피그마에 정리되어 있습니다.
export const theme: DefaultTheme = {
  light: {
    backgroundColor: 'white',
    hoverColor: 'black',
    color: 'gray',
    secondaryBackgroundColor: 'white',
    secondaryColor: 'black',
    profile: 'gray',
    logout: 'gray',
    logoutHover: 'red',
    content: 'black',
    profileBox: 'white',
  },
  dark: {
    backgroundColor: '#1e2937',
    hoverColor: 'white',
    color: 'lightgray',
    secondaryBackgroundColor: '#111827',
    secondaryColor: 'white',
    profile: '#cbcbcb',
    logout: 'lightgray',
    logoutHover: 'red',
    content: 'white',
    profileBox: '#364e66',
  },
};
