import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
}


:root {
  --primary-bg: #ebe8e1;
  --secondary-bg: #fef6e9;
  --primary-color: #f8b229;
  --secondary-color: #333E1C;
  --button-bg: #6DA336;
  --warning: #BD2121;

  --primary-font: #333E1C;
  --secondary-font: #F6E4C3;
}


body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--primary-bg);
  color: var(--primary-font);
}
`