import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --primary-1: #976fea;
    --primary-2: #5d3ba4;
    --primary-3: #b28cff;
    --primary-4: #c1a8f3;
    --primary-5: #e9deff;
    --white: #ffffff;
    --white-light: #f3f3f3;
    --light: #eaeaea;
    --grey-light: #d6d6d6;
    --grey-medium: #bfbfbf;
    --grey: #a9a9a9;
    --grey-1: #a9a9a9;
    --grey-dark: #929292;
    --grey-black: #424242;
    --black: #000000;
    --secondary-1: #26c95d;
    --secondary-2: #f20000;
    --secondary-3: #fba500;
    --secondary-4: #336cff;
    --secondary-5: #b52cf5;
    --secondary-6: #3fc6ff;
    --shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    --shadow-hover: 0px 2px 4px rgba(0, 0, 0, 0.15);
  }
  *,*::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    font-family: 'Sarabun', sans-serif !important;
    
  }

  *::-webkit-scrollbar {
    width: 0px;
  }
  *::-webkit-scrollbar-thumb {
    width: 0px;
  }
  *::-webkit-scrollbar-track {
    width: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

/* Firefox */
  input[type=number] {
    appearance: textfield;
  }
  html,
  body{
    height: 100%;
    width: 100%;
  }

  body{
    line-height: 1.3;
    font-family: 'Sarabun', sans-serif;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Sarabun', sans-serif;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  /*text style*/ 
.heading_1-bold {
  font-family: 'Sarabun Bold';
  font-size: 64px;
  font-weight: 700;
  line-height: 83px;
}
.heading_2-regular {
  font-family: 'Sarabun';
  font-size: 64px;
  font-weight: 400;
  line-height: 83px;
}
.heading_3-bold {
  font-family: 'Sarabun Bold';
  font-size: 48px;
  font-weight: 700;
  line-height: 62px;
}
.heading_4-medium {
  font-family: 'Sarabun Medium';
  font-size: 48px;
  font-weight: 500;
  line-height: 62px;
}
.heading_5-regular {
  font-family: 'Sarabun';
  font-size: 48px;
  font-weight: 400;
  line-height: 62px;
}
.title_1-bold {
  font-family: 'Sarabun Bold';
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
}
.title_2-medium {
  font-family: 'Sarabun Medium';
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
}
.title_3-regular {
  font-family: 'Sarabun';
  font-size: 32px;
  font-weight: 400;
  line-height: 42px;
}
.subtitle_1-bold {
  font-family: 'Sarabun Bold';
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
}
.subtitle_2-medium {
  font-family: 'Sarabun Medium';
  font-size: 24px;
  font-weight: 500;
  line-height: 31px;
}
.subtitle_3-regular {
  font-family: 'Sarabun';
  font-size: 24px;
  font-weight: 400;
  line-height: 31px;
}
.subtitle_4-bold {
  font-family: 'Sarabun Bold';
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
}
.body_1-bold {
  font-family: 'Sarabun Bold';
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
}
.body_2-medium {
  font-family: 'Sarabun Medium';
  font-size: 18px;
  font-weight: 500;
  line-height: 23px;
}
.body_3-regular {
  font-family: 'Sarabun';
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
}
.body_4-bold {
  font-family: 'Sarabun Bold';
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
}
.body_5-medium {
  font-family: 'Sarabun Medium';
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
}
.body_6-regular {
  font-family: 'Sarabun';
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
}
.small_1-bold {
  font-family: 'Sarabun Bold';
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
}
.small_2-medium {
  font-family: 'Sarabun Medium';
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
}
.small_3-regular {
  font-family: 'Sarabun';
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
}
.small_4-bold {
  font-family: 'Sarabun Bold';
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}
.small_5-medium {
  font-family: 'Sarabun Medium';
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}
.small_6-regular {
  font-family: 'Sarabun';
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}
.small_7-regular {
  font-family: 'Sarabun';
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
}


`;
