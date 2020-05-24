import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../svg/logo';
import CartIcon from '../svg/shoppingCartIcon';
import UserIcon from '../svg/user';
import Hamburger from '../components/Hamburger';
import posed, { PoseGroup } from 'react-pose';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Divider from '../components/Divider';
import NavItem from '../components/NavItem';
import { StyledLink } from '../components/NavItem';
import { logoutUser } from '../actions/authActions';
import { clearCart } from '../actions/cartActions';
import { baseURL } from '../axios';

const NavBarContainer = styled.nav`
  position: fixed;
  width: 100vw;
  background: ${({ theme, scroll }) =>
    scroll > 100 ? theme.colors.primary : 'transparent'};
  padding: ${({ scroll }) => (scroll > 100 ? '1px' : '9px')} 50px;
  display: flex;
  align-items: center;
  top: 0;
  z-index: 999;
  transition-name: background padding-top padding-bottom;
  transition-duration: 0.3s;

  @keyframes swing {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation-name: swing;
  animation-duration: 1s;

  @media (max-width: ${({ theme }) => theme.breakpoints.tabPort}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
const LogoWrapper = styled.div`
  flex: 1;
  transform: ${({ scroll }) => (scroll > 100 ? 'scale(0.67)' : 'scale(1)')};
  transition: transform 0.5s;

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.tabLand}) {
    flex: 0;
  }
`;
const IconWrapper = styled.button`
  cursor: pointer;
  padding: 0 20px 0 0;
  background: transparent;
  border: 0;
  position: relative;

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.tabLand}) {
    display: ${({ hide }) => (hide ? 'none' : '')};
  }
  &:last-child {
    padding: 0;
  }
`;
const QuantityIcon = styled.span`
  position: absolute;
  text-align: center;
  top: 0;
  left: -5px;
  height: 20px;
  width: 20px;
  line-height: 20px;
  background: ${({ theme: { colors } }) => colors.red};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.circle};
  color: ${({ theme: { colors } }) => colors.white};
  font-weight: bold;
`;
const HamburgerWrapper = styled.div`
  display: none;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.tabLand}) {
    display: flex;
    flex: 1;
    position: relative;
    justify-content: flex-start;
    align-items: center;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  justify-content: flex-end;
  align-items: center;
`;
const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  flex: 1;
  margin: 0 20px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.tabLand}) {
    display: none;
  }
`;
const BackdropPose = {
  enter: { background: 'rgba(0, 0, 0, 0.7)' },
  exit: { background: 'rgba(0, 0, 0, 0.0)' },
};
const Backdrop = styled(posed.div(BackdropPose))`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.colors.primary};
  top: 0;
  left: 0;
  position: fixed !important;
  z-index: ${({ cartOpen }) => (cartOpen ? '11' : '9')};

  @media (min-width: 1021px) {
    display: ${({ cartOpen }) => (cartOpen ? 'flex' : 'none')};
  }
`;

const MobileMenu = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 300 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 300 },
  },
});
const MobileNavMenu = styled(MobileMenu)`
  padding: 20px 20px;
  align-items: center;
  background: ${({ theme: { colors } }) => colors.rgbaPrimary};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.xl};
  @media (max-width: ${({ theme }) => theme.breakpoints.tabPort}) {
    padding: 10px 5px;
  }
`;
const ProductsMenuPosed = posed.ul({
  show: {
    height: 'auto',
  },
  hide: {
    height: 0,
  },
});
const MobileSubMenu = styled(ProductsMenuPosed)`
  overflow: hidden;
  margin: 0 auto;
`;

const MobileSubMenuItem = styled.li`
  padding: 15px 80px;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  color: ${({ theme: { colors } }) => colors.white};
`;

const SubMenuContent = styled.ul`
  list-style: none;
  padding: 0 7px;
  position: absolute;
  background: ${({ theme: { colors } }) => colors.rgbaPrimary};
  ${({ pose }) => pose || 'transform: scaleY(0); opacity:0;'};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.md};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};
  transform-origin: top;
  top: 190%;
  left: 0;
  transition: all 0.2s;
  &:after {
    position: absolute;
    top: -12px;
    right: 53px;
    content: '';
    border-style: solid;
    border-width: 0 10px 11px 10px;
    border-color: transparent transparent
      ${({ theme: { colors } }) => colors.lightGrey} transparent;
  }
`;

const SubItem = styled.li`
  padding: 12px 15px;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.s};
  transition: all 0.4s;
`;

const UserProfileContent = styled.div`
  position: absolute;
  background: ${({ theme: { colors } }) => colors.rgbaPrimary};
  ${({ pose }) => pose || 'transform: scaleY(0); opacity:0;'};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.xl};
  border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};
  transform-origin: top;
  max-width: 350px;
  right: 20px;
  top: 120%;
  transition: all 0.2s;
`;
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 20px;
  position: relative;
  &:after {
    position: absolute;
    top: -12px;
    right: 45px;
    content: '';
    border-style: solid;
    border-width: 0 10px 11px 10px;
    border-color: transparent transparent
      ${({ theme: { colors } }) => colors.lightGrey} transparent;
  }
`;
export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGrey};
  border-radius: ${({ theme: { borderRadiuses } }) => borderRadiuses.circle};
  object-fit: cover;
`;
const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;
const ProfileName = styled.h5`
  color: ${({ theme: { colors } }) => colors.white};
  padding: 5px;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  text-align: left;
`;
const ProfileEmail = styled.h6`
  color: ${({ theme: { colors } }) => colors.white};
  padding: 5px;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xxxs};
`;

const ProfileMenuItem = styled.div`
  color: ${({ theme: { colors } }) => colors.white};
  padding: 20px;
  cursor: pointer;
`;
const MobileProfileInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const NavBar = props => {
  const [scroll, setScroll] = useState(0);
  const [subMobileMenuOpen, setSubMobileMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const scrollHandler = _.throttle(() => setScroll(window.scrollY), 100);

  useEffect(() => {
    if (props.scroll) {
      window.addEventListener('scroll', scrollHandler);
      if (window.scrollY > 100) {
        setScroll(window.scrollY);
      }

      return () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    } else {
      setScroll(101);
    }
  }, []);

  const isOpenHandler = itemName => isOpen === itemName;
  const setOpenHandler = itemName =>
    setOpen(isOpen !== itemName ? itemName : false);

  const MobileMenu = (
    <MobileNavMenu>
      {props.auth.isAuthenticated && (
        <>
          <MobileProfileInfo>
            <ProfileImage src={baseURL + props.auth.image} />
            <NamesWrapper>
              <ProfileName>{props.auth.username}</ProfileName>
              <ProfileEmail>{props.auth.email}</ProfileEmail>
            </NamesWrapper>
          </MobileProfileInfo>
          <Divider />
        </>
      )}

      <NavItem title="Strona główna" />
      <Divider />
      <NavItem
        title="Produkty"
        click={() => setSubMobileMenu(!subMobileMenuOpen)}
      />
      <MobileSubMenu pose={subMobileMenuOpen ? 'show' : 'hide'}>
        <Divider />
        <MobileSubMenuItem>
          <StyledLink to="/sofy">Sofy</StyledLink>
        </MobileSubMenuItem>
        <Divider />
        <MobileSubMenuItem>
          <StyledLink to="/fotele">Fotele</StyledLink>
        </MobileSubMenuItem>
        <Divider />
        <MobileSubMenuItem>
          <StyledLink to="/narozniki">Narożniki</StyledLink>
        </MobileSubMenuItem>
        <Divider />
      </MobileSubMenu>
      <Divider />
      <NavItem title="Polityka prywatności" />
      <Divider />
      <NavItem title="Kontakt" />
      {props.auth.isAuthenticated ? (
        <>
          <Divider />
          <NavItem
            title="Wyloguj"
            click={() => {
              props.logoutUser();
              props.clearCart();
              setOpen(false);
            }}
          />
        </>
      ) : (
        <>
          <Divider />
          <NavItem title="Zaloguj" to="/login" />
          <Divider />
          <NavItem title="Rejestracja" to="/register" />
        </>
      )}
    </MobileNavMenu>
  );

  const SubMenu = (
    <SubMenuContent pose={isOpenHandler('subMenu')}>
      <SubItem>
        <StyledLink to="/sofy">Sofy</StyledLink>
      </SubItem>
      <Divider />
      <SubItem>
        <StyledLink to="/fotele">Fotele</StyledLink>
      </SubItem>
      <Divider />
      <SubItem>
        <StyledLink to="/narozniki">Narożniki</StyledLink>
      </SubItem>
    </SubMenuContent>
  );
  return (
    <NavBarContainer scroll={scroll}>
      <PoseGroup>
        {isOpenHandler('cart') && (
          <Backdrop key="backdrop" cartOpen>
            <Cart close={() => setOpen(false)} />
          </Backdrop>
        )}
        {isOpenHandler('mobileMenu') && (
          <Backdrop key="backdrop">{MobileMenu}</Backdrop>
        )}
      </PoseGroup>

      <HamburgerWrapper>
        <Hamburger
          isOpen={isOpenHandler('mobileMenu')}
          click={() => setOpenHandler('mobileMenu')}
        />
      </HamburgerWrapper>

      <LogoWrapper scroll={scroll}>
        <Link to="/">
          <Logo />
        </Link>
      </LogoWrapper>

      <NavMenu>
        <NavItem title="Strona główna" to="/" />
        <NavItem title="Produkty" click={() => setOpenHandler('subMenu')}>
          {SubMenu}
        </NavItem>
        <NavItem title="Polityka prywatności" />
        <NavItem title="Kontakt" />
      </NavMenu>
      <Wrapper>
        <UserProfileContent pose={isOpenHandler('userInfo')}>
          {props.auth.isAuthenticated ? (
            <>
              <ProfileInfo>
                <ProfileImage src={baseURL + props.auth.image} />
                <NamesWrapper>
                  <ProfileName>{props.auth.username}</ProfileName>
                  <ProfileEmail>{props.auth.email}</ProfileEmail>
                </NamesWrapper>
              </ProfileInfo>
              <Divider />
              <ProfileMenuItem
                onClick={() => {
                  props.logoutUser();
                  props.clearCart();
                  setOpen(false);
                }}
              >
                Wyloguj się
              </ProfileMenuItem>
            </>
          ) : (
            <>
              <ProfileMenuItem>
                <StyledLink to="/login">Logowanie</StyledLink>
              </ProfileMenuItem>
              <Divider />
              <ProfileMenuItem>
                <StyledLink to="/register">Rejestracja</StyledLink>
              </ProfileMenuItem>
            </>
          )}
        </UserProfileContent>
        <IconWrapper hide onClick={() => setOpenHandler('userInfo')}>
          <UserIcon />
        </IconWrapper>
        <IconWrapper onClick={() => setOpenHandler('cart')}>
          <CartIcon />
          {!_.isEmpty(props.cart.products) ? (
            <QuantityIcon>
              {_.sum(props.cart.products.map(prod => prod.quantity))}
            </QuantityIcon>
          ) : (
            ''
          )}
        </IconWrapper>
      </Wrapper>
    </NavBarContainer>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { logoutUser, clearCart })(NavBar);
