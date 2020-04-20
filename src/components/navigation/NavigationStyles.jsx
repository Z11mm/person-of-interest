import styled, { css } from 'styled-components';

const navigationStyles = css`
  display: flex;
  justify-content: flex-end;
  transition: color 0.1s;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const CustomNavigation = styled.nav`
  text-decoration: underline;
  padding: 0 1rem;

  ${navigationStyles}
`;

export default CustomNavigation;
