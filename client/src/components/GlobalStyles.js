import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    
      /* Color Theme Swatches in Hex */
    --color-primary: #010326;
    --color-light-blue: #A0AED9;
    --color-dark-green: #2F7310;
    --color-medium-green: #6A8C51;
    --color-light-green: #AFBF73;
    --font-heading: "Lato", sans-serif;
    --font-body: "Lato", sans-serif;
    --padding-page: 24px;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      font-family: var(--font-body);
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  h1,
h2,
h3,
label,
button {
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 32px;
  text-align: center;
}
h2 {
  font-size: 26px;
}
h3 {
  font-size: 22px;
}
h4 {
  font-size: 18px;
}
p,
a,
li,
blockquote,
input {
  font-family: var(--font-body);
}
`;
