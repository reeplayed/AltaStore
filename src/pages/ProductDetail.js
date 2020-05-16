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
import posed, { PoseGroup } from 'react-pose';
import axios, {baseURL} from '../axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const MainContainer = styled.main`
  margin: 70px 15px 0 15px;
  
`;
const Container = styled.main`
  
  display:flex;
  flex-wrap: wrap;
  align-items: strech;
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
  height: 100%;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;

const SlideShowContent = styled.section`
  max-width: 1000px;
  margin: 10px;
  flex: 1 1 50%;
  @media (max-width:${({ theme })=>theme.breakpoints.tabLand}){
    flex: 1 1 100%;

  }
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
  cursor: pointer;
`;
const StyledButton = styled.button`
  margin: 0;
  border: 0;
  padding: 10px;
  background: transparent;
`;
const DescriptionContent = styled.section`
  
  flex: 1 1 40%;
  margin: 10px;
`;
const ProdName = styled.h2`
  font-size: 2.6rem;
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
  margin: 0 20px 0 0;
  @media (max-width:${({ theme })=>theme.breakpoints.desktop}){
    font-size: 2.2rem;
    margin: 0 10px 0 0;
   
  }
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
  padding: 15px 0;
  overflow: hidden;
  @media (max-width:${({ theme })=>theme.breakpoints.tabLand}){
   padding: 5px 0;
  }
`;
const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ProgressWrapper = styled.div`
    margin-top: 120px; 
    display: flex;
    align-items: center;
    justify-content: center;
`;

class ProductDetail extends Component {
  state = {
      product: {},
      mainImg: '',
      images: [],
      comments: [],
      comment_allow: false,
      loading: true
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
          .catch(err => console.log(err))
          .finally(()=>this.setState({loading: false}))
  }

  updateComments = new_comment => {
      this.setState({
          ...this.state,
          comments: [...this.state.comments, new_comment],
          comment_allow: false
      });
  };

  render () {
      return this.state.loading ? (
        <ProgressWrapper>
            <CircularProgress size='15rem'/>
        </ProgressWrapper>
      ) : (
          <>
              <NavBar />
              <MainContainer>
                <Container>
                  <SlideShowContent>
                      <MainImgWrapper>
                          <MainImg src={baseURL + this.state.mainImg} />
                      </MainImgWrapper>

                      <SlideShowNavigation>
                          
                          {this.state.images.map(img => (
                              <SmallImg
                                  onClick={() => this.setState({ mainImg: img })}
                                  src={baseURL+img}
                              />
                          ))}
                         
                      </SlideShowNavigation>
                  </SlideShowContent>
                      <DescriptionContent>
                  <Content padding='20px'>
                          <NameAndRateWrapper>
                              <ProdName>{this.state.product.name}</ProdName>
                              <RateWrapper>
                                  <StarSvg />
                                  <Rate>{this.state.product.average_rating}</Rate>
                              </RateWrapper>
                          </NameAndRateWrapper>
                          <Wrapper>
                          <CustomButton
                              onClick={() => this.props.addProduct(this.state.product)}
                          >
                            Dodaj do koszyka
                          </CustomButton>
                          <PriceWrapper>{this.state.product.price} $</PriceWrapper>
                          </Wrapper>
                          
                          <Description>{this.state.product.content}</Description>
                  </Content>
                      </DescriptionContent>
                      </Container>

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
