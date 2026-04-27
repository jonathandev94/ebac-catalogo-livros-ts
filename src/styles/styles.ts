import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 40px 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
`;

export const Title = styled.h1`
  text-align: center;
  color: #2d3748;
  margin-bottom: 30px;
`;

export const BookCard = styled.div<{ lido: boolean }>`
  background: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 8px solid ${props => props.lido ? '#48bb78' : '#ed8936'};
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

export const ActionButton = styled.button<{ variant?: 'delete' | 'toggle' }>`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  transition: opacity 0.2s;
  background: ${props => props.variant === 'delete' ? '#e53e3e' : '#3182ce'};
  margin-left: 5px;

  &:hover { opacity: 0.8; }
`;