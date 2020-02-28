import React from 'react';
import styled from 'styled-components';
import Heading from '../typography/Heading';
import Content from '../helpers/Content';
import FlexBox from '../helpers/FlexBox';

const Info1 = styled.div`
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
const Info2 = styled.div`
  background: red;
  min-width: 20rem;
  flex: 1;
  height: 100px;
  margin: 10px 10px;
`;
const Info3 = styled.div`
  background: red;
  min-width: 20rem;
  flex: 1;
  height: 100px;
  margin: 10px 10px;
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
        <Content padding="2rem">
            <Heading margin="3rem auto" align="center" fsize="3rem">
        Dlaczego my?
            </Heading>
            <FlexBox>
                <Info1 url="https://ocdn.eu/pulscms-transforms/1/XDtk9kqTURBXy9iZmI4NWM5ZmYwZjEzYTZlMjYyYWQ0YjFlMWJiOWIwNC5qcGVnkpUDAMzTzReizQ1LlQLNAeAAwsOCoTAFoTEB">
                    <Heading margin="2rem 0" align="center" fsize="3rem" color="white">
            Darmowa wysyłka
                    </Heading>
                    <Description>
            Zapewniamy darmową wysyłkę przy dokonaniu przedpłaty (przelewem /
            Blikiem) za zamówienie o wartości powyżej 400zł.(Nie dotyczy
            przesyłek zagranicznych i zamówień hurtowych)
                    </Description>
                </Info1>
                <Info1 url="https://ocdn.eu/pulscms-transforms/1/XDtk9kqTURBXy9iZmI4NWM5ZmYwZjEzYTZlMjYyYWQ0YjFlMWJiOWIwNC5qcGVnkpUDAMzTzReizQ1LlQLNAeAAwsOCoTAFoTEB">
                    <Heading margin="2rem 0" align="center" fsize="3rem" color="white">
            Najlepsza jakość
                    </Heading>
                    <Description>
            Dlaczego warto postawić na dobrą jakość mebli? Dla wielu z nas, jest
            to czynnik wiążący. Nie chcemy ich zmieniać co rok, czy dwa lata.
            Marzymy, aby były naszymi codziennymi i oddanymi towarzyszami,
            spełniającymi swe zadania.
                    </Description>
                </Info1>
                <Info1 url="https://ocdn.eu/pulscms-transforms/1/XDtk9kqTURBXy9iZmI4NWM5ZmYwZjEzYTZlMjYyYWQ0YjFlMWJiOWIwNC5qcGVnkpUDAMzTzReizQ1LlQLNAeAAwsOCoTAFoTEB">
                    <Heading margin="2rem 0" align="center" fsize="3rem" color="white">
            Konkurencyjne ceny
                    </Heading>
                    <Description>
            Zapewniamy darmową wysyłkę przy dokonaniu przedpłaty (przelewem /
            Blikiem) za zamówienie o wartości powyżej 400zł.(Nie dotyczy
            przesyłek zagranicznych i zamówień hurtowych)
                    </Description>
                </Info1>
            </FlexBox>
        </Content>
    );
};

export default Info;
