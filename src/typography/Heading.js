import styled from 'styled-components';

export default styled.h3`
    font-family: ${({ theme: { fonts } }) => fonts.heading};
    font-size: ${({ fsize }) => fsize};
    font-weight: 400;
    color: ${({ theme: { colors }, color }) =>
      color ? color : colors.primary};
    }
    text-align: ${({ align }) => {
      switch (align) {
        case 'center':
          return 'center';
        case 'right':
          return 'right';
      }
    }};
     margin: ${({ margin }) => margin};
`;
