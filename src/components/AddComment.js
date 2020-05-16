import React, { useState } from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';
import CustomButton from './CustomButton';
import axios from '../axios';
import { connect } from 'react-redux';

const AddCommentContent = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0 0 0;
  padding: 20px;
`;
const Header = styled.h3`
  font-family: ${({ theme: { fonts } }) => fonts.heading};
  font-size: 2rem;
  text-align: center;
  font-weight: 400;
`;
const TextArea = styled.textarea`
  resize: none;
  outline: none;
  margin: 20px 0 0 0;
  padding: 15px;
  width: 100%;
  height: 150px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.heading};
`;
const StyledRating = styled(Rating)`
  margin: 10px 20px 10px 0;
  display: inline;
`;
const Rate = styled.span`
  display: inline-block;
  font-size: 2.2rem;
`;
const ErrorMessage = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.red};
  font-size: 1.4em;
`;

const AddComment = ({ id, update, auth }) => {
    const [comment, setComment] = useState('');
    const [rate, setRate] = useState(0);
    const [error, setError] = useState('');

    const setCommentHandler = e => setComment(e.target.value);
    const setRateHandler = e => setRate(e.target.value);

    const submitHandler = () => {
        if(!auth.isAuthenticated){
          return alert('Aby dodać komentarz musisz się zalogować.')
        }
        if (comment === '') {
            return setError('Wpisz treść komentarza.');
        }
        if (rate === 0) {
            return setError('Wybierz ocenę.');
        }
        axios
            .post('/add_comment/', { comment, rate, id })
            .then(({ data }) => update(data.new_comment))
            .catch(err => alert('Coś poszło nie tak...'));
    };
    return (
        <AddCommentContent>
            <Header>Oceń nasz produkt</Header>
            <TextArea
                onChange={e => setCommentHandler(e)}
                value={comment}
                maxLength="450"
                placeholder="Wpisz komentarz."
            />
            <StyledRating
                name="half-rating"
                onChange={e => setRateHandler(e)}
                value={rate}
                precision={0.5}
                size="large"
            />
            <Rate>{rate === 0 ? '' : rate}</Rate>
            <ErrorMessage>{error}</ErrorMessage>
            <CustomButton primary onClick={() => submitHandler()}>
        Dodaj komentarz
            </CustomButton>
        </AddCommentContent>
    );
};
const mapStateToProps = state => {
  return {
      auth: state.auth
  };
};

export default connect(mapStateToProps)(AddComment);

