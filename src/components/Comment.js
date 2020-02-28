import React from 'react';
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';

const CommentContent = styled.div`
  display: flex;
`;
const ImgWrapper = styled.div``;
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.circle};
  object-fit: cover;
`;
const CommentInfo = styled.div`
  width: 100%;
  padding: 0 15px;
`;
const Username = styled.span`
  display: block;
  margin: 0 15px 0 0;
  font-size: 1.5rem;
`;
const CommentText = styled.div`
  margin: 10px 0 0 0;
  font-size: 1.1rem;
`;

const Comment = ({ profile_img, username, comment, rate }) => {
    return (
        <>
            <CommentContent>
                <ImgWrapper>
                    <ProfileImg src={'http://127.0.0.1:8000' + profile_img} />
                </ImgWrapper>
                <CommentInfo>
                    <Username>
                        {username}{' '}
                        <Rating
                            name="half-rating-read"
                            value={rate}
                            precision={0.5}
                            size="small"
                            readOnly
                        />
                    </Username>
                    <CommentText>{comment}</CommentText>
                </CommentInfo>
            </CommentContent>
        </>
    );
};

export default Comment;
