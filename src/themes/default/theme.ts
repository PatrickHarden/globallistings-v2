export const theme = {
  borders: {
    fine: '1px solid rgba(35,31,32,0.1)',
    thick: '2px solid #006a4d',
  },
  colours: {
    light: '#fff',
    primary: '#006a4d',
    primaryDark: '#003728',
    secondary: '#5ca623',
  },
  font: {
    futura: "'Futura-pt', helvetica, arial, sans-serif",
    size: {
      s: '.8em',
      m: '1em',
      l: '1.2em',
      xl: '1.5em',
    },
    weight: {
      normal: 300,
    },
    letterSpacing: '0.36',
  },
  gutter: {
    s: '0.8rem',
    m: '1rem',
    l: '2rem',
  },
  layout: {
    columns: {
      l: '70%',
      r: '30%',
    },
  },
  media: {
    screen: {
      s: '768px',
    },
  },
  shadow: {
    light: '0 4px 7px 0 rgba(35, 31, 32, 0.05)',
  },
};

export type Theme = typeof theme;
