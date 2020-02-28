const spacingUnit = 8;

export default {
    colors: {
        primary: '#373737',
        rgbaPrimary: 'rgba(55, 55, 55, 0.96)',
        lightGrey: '#ddd', //d
        secondary: '#595959', //d
        black: '#232323', //d
        white: '#FFF', //d
        light: '#FAFAFA',
        shadow: '#BEBEBE', //d
        body: '#fafafa', //d
        red: '#DC143C', //d
        facebook: '#3b5998',

        text: '#1a1a1a'
    },
    fonts: {
        heading: 'Montserrat, sans-serif',
        body: 'Roboto, sans-serif',
        logo: 'Shadows Into Light, serif'
    },
    fontSizes: {
        xxxs: '1rem',
        xxs: '1.1rem',
        xs: '1.25rem',
        s: '1.4rem',
        sm: '1.6rem',
        md: '2rem',
        lg: '2.56rem',
        xl: '3.2rem',
        xxl: '3.84rem',
        xxxl: '6.4rem',
        hg: '9.6rem'
    },
    borderRadiuses: {
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '10px',
        xxl: '50px',
        circle: '50%'
    },
    spacingUnit,
    spaces: {
        xxs: `${spacingUnit / 2}px`,
        xs: `${spacingUnit}px`,
        sm: `${spacingUnit * 2}px`,
        md: `${spacingUnit * 3}px`,
        lg: `${spacingUnit * 4}px`,
        xl: `${spacingUnit * 5}px`,
        xxl: `${spacingUnit * 6}px`,
        hg: `${spacingUnit * 8}px`,
        gi: `${spacingUnit * 12}px`
    },
    breakpoints: {
        tabPort: '37.5em',
        tabLand: '63.75em',
        desktop: '75em',
        height2k: '90em',
        width2k: '135em'
    }
};
