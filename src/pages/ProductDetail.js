import React, { Component } from 'react';
import styled from 'styled-components';
import { ArrowSvg, StarSvg } from '../svg/logo';
import { addProduct } from '../actions/cartActions';
import { connect } from 'react-redux';
import AddComment from '../components/AddComment';
import NavBar from '../sections/NavBar';
import CustomButton from '../components/CustomButton';
import Heading from '../typography/Heading';
import Comment from '../components/Comment';
import Footer from '../sections/Footer';
import posed, { PoseGroup } from 'react-pose';
import axios, {baseURL} from '../axios';

const MainContainer = styled.main`
  margin: 0 20px;
`;

const ProductSection = styled.section`
  margin: 80px 40px 0 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 1440px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ContentPose = posed.div({
    enter: {
        opacity: 1,
        transition: { delay: 230 }
    },
    exit: {
        opacity: 0
    }
});
const Content = styled(ContentPose)`
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;

const SlideShowContent = styled.section`
  max-width: 1000px;
  flex: 1;
`;
const MainImgWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;
const MainImg = styled.img`
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const SlideShowNavigation = styled.div`
  display: flex;
  align-items: center;
  margin: 20px auto 0 auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 1000px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tabPort}) {
  }
`;
const SmallImg = styled.img`
  object-fit: cover;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 10px;
  flex: 1;
  margin: 15px 5px;
`;
const StyledButton = styled.button`
  margin: 0;
  border: 0;
  padding: 10px;
  background: transparent;
`;
const DescriptionContent = styled.section`
  margin: 0 0 0 20px;
  max-width: 750px;
  padding: 30px 30px;
`;
const ProdName = styled.h2`
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  margin: 0 20px 0 0;
`;

const NameAndRateWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;
const RateWrapper = styled.div``;
const Rate = styled.span`
  display: inline;
  font-size: 3rem;
  margin-left: 10px;
`;
const PriceWrapper = styled.h3`
  font-size: 1.7rem;
  font-weight: 400;
  padding: 10px 0;
  color: ${({ theme }) => theme.colors.grey2};
  font-family: ${({ theme: { fonts } }) => fonts.heading};
`;

const Description = styled.div`
  font-size: 1.2rem;
  padding: 28px 0;
  overflow: hidden;
`;
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
class ProductDetail extends Component {
  state = {
      product: {},
      mainImg: '',
      images: [],
      comments: [],
      comment_allow: false
  };

  constructor (props) {
      super(props);

      const slug = this.props.match.params.slug;

      axios.get('/product/' + slug)
          .then(({ data }) => {
              this.setState({
                  product: data.product_info,
                  mainImg: data.product_info.image,
                  images: [
                      data.product_info.image,
                      data.product_info.image_2,
                      data.product_info.image_3
                  ],
                  comments: data.comments,
                  comment_allow: true
              });
          })
          .catch(err => console.log(err));
  }

  updateComments = new_comment => {
      this.setState({
          ...this.state,
          comments: [...this.state.comments, new_comment],
          comment_allow: false
      });
  };

  render () {
      return (
          <>
              <NavBar />
              <MainContainer>
                  <SlideShowContent>
                      <MainImgWrapper>
                          {/* <MainImg src={baseURL + this.state.mainImg} /> */}
                      </MainImgWrapper>

                      <SlideShowNavigation>
                          <StyledButton>
                              <ArrowSvg rotate />
                          </StyledButton>
                          {this.state.images.map(img => (
                              <SmallImg
                                  onClick={() => this.setState({ mainImg: img })}
                                  src={baseURL+img}
                              />
                          ))}
                          <StyledButton>
                              <ArrowSvg />
                          </StyledButton>
                      </SlideShowNavigation>
                  </SlideShowContent>
                  <Content>
                      <DescriptionContent>
                          <NameAndRateWrapper>
                              <ProdName>{this.state.product.name}</ProdName>
                              <RateWrapper>
                                  <StarSvg />
                                  <Rate>{this.state.product.average_rating}</Rate>
                              </RateWrapper>
                          </NameAndRateWrapper>
                          <PriceWrapper>{this.state.product.price} $</PriceWrapper>
                          <CustomButton
                              onClick={() => this.props.addProduct(this.state.product)}
                          >
                Dodaj do koszyka
                          </CustomButton>
                          <Description>{this.state.product.content}</Description>
                      </DescriptionContent>
                  </Content>
                  {this.state.comment_allow && (
                      <AddComment
                          update={this.updateComments}
                          id={this.state.product.id}
                      />
                  )}
                  <Content margin="10px 0px " padding="20px">
                      <Heading align="center" fsize="2rem">
              Komentarze
                      </Heading>
                  </Content>
                  <CommentsContainer>
                      <PoseGroup>
                          {this.state.comments.map(comm => (
                              <Content key={comm.id} margin="5px 0" padding="10px">
                                  <Comment
                                      profile_img={comm.author.profile_image}
                                      username={comm.author.username}
                                      comment={comm.content}
                                      rate={comm.rating}
                                  />
                              </Content>
                          ))}
                      </PoseGroup>
                  </CommentsContainer>
              </MainContainer>
              <Footer />
          </>
      );
  }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, { addProduct })(ProductDetail);
