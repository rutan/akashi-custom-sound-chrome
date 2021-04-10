/** @jsx h */
import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

interface Props {
  className?: string;
  onClick: () => void;
}

const Container = styled('button')`
  cursor: pointer;
  text-align: center;
  border: 0;
  color: #fff;
  font-size: 14px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.92);
  }
`;

export const Button: FunctionalComponent<Props> = ({ className, onClick, children }) => {
  return (
    <Container className={className} onClick={onClick}>
      {children}
    </Container>
  );
};
