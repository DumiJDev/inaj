import styled from "@emotion/styled";

export const Aside = styled.aside`
  background: #5c33f6;
  max-width: 300px;
  min-height: 100vh;

  a {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    transition: all linear 500ms;
  }

  ul {
    padding: 0;
  }

  li {
    text-align: center;
    list-style: none;
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    
    transition: all linear 500ms;
  }

  li:hover {
    background: #fff;
    transition: background linear 500ms;
  }

  li:hover a {
    color: #5c33f6;
    transition: color linear 500ms;
  }
`;
