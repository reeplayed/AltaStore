import React from 'react';
import styled from 'styled-components';
import Heading from '../typography/Heading';
import FlexBox from '../helpers/FlexBox';
import wysylka from '../static/wysylka.webp';
import jakosc from '../static/jakosc.jpg';
import price from '../static/price.jpg';

const Container = styled.section`
  padding: 2rem;


`;

const InfoContainer = styled.div`
  background: red;
  min-width: 25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${({ url }) => url});
  background-size: cover;
  background-position: bottom center;
  padding: 4rem 2rem;
  border-radius: 5px;
`;
const Description = styled.h4`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.5;
`;
const Info = () => {
    return (
        <Container>
            <Heading margin="3rem auto" align="center" fsize="3rem">
        Dlaczego my?
            </Heading>
            <FlexBox align='strech'>
                <InfoContainer url={wysylka}>
                    <Heading margin="2rem 0" align="center" fsize="3rem" color="white">
            Darmowa wysyłka
                    </Heading>
                    <Description>
            Zapewniamy darmową wysyłkę przy dokonaniu przedpłaty (przelewem /
            Blikiem) za zamówienie o wartości powyżej 1500zł.
                    </Description>
                </InfoContainer>
                <InfoContainer url={jakosc}>
                    <Heading margin="2rem 0" align="center" fsize="3rem" color="white">
            Najlepsza jakość
                    </Heading>
                    <Description>
        Nie chcemy ich zmieniać co rok, czy dwa lata.
            Marzymy, aby były naszymi codziennymi i oddanymi towarzyszami,
            spełniającymi swe zadania.
                    </Description>
                </InfoContainer>
                <InfoContainer url={price}>
                    <Heading margin="2rem 0" align="center" fsize="3rem" color="white">
            Konkurencyjne ceny
                    </Heading>
                    <Description>
            Zapewniamy konkurencyjne ceny. Nasza firma posiada najbardziej zoptymalizowane produkty, 
            jeżeli bierzemy pod uwagę cenę oraz jakośc.
                    </Description>
                </InfoContainer>
            </FlexBox>
        </Container>
    );
};

export default Info;
