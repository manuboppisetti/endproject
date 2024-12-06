import React, { useState } from "react";
import styled from "styled-components";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImg from "../utils/Images/Logo.png";
import {
  FavoriteBorder,
  MenuRounded,
  SearchRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Button from "./Button";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/UserSlice";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;
const Logo = styled.img`
  height: 34px;
`;
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Navlink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    padding: 6px 12px;
    border: 1px solid ${({ theme }) => theme.primary};
    border-radius: 20px;
    outline: none;
    width: 200px;
    transition: width 0.3s ease-in-out;

    &:focus {
      width: 300px;
    }
  }

  button {
    background: none;
    border: none;
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};

    &:hover {
      color: ${({ theme }) => theme.text_primary};
    }
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  color: ${({ theme }) => theme.primary};

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;
const MobileIcons = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`;
const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  width: 80%;
  padding: 12px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;
const TextButton = styled.span`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Navbar = ({ setOpenAuth, openAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <Nav>
      <NavContainer>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>
        <NavLogo to="/">
          <Logo src={LogoImg} />
        </NavLogo>
        <SearchContainer>
          <input type="text" placeholder="Search..." />
          <button>
            <SearchRounded />
          </button>
        </SearchContainer>
        <MobileIcons>
          <Navlink to="/favorite">
            <FavoriteBorder style={{ fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/cart">
            <ShoppingCartOutlined style={{ fontSize: "28px" }} />
          </Navlink>
          {currentUser && (
            <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
          )}
        </MobileIcons>
        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/dishes">Dishes</Navlink>
          <Navlink to="/orders">Orders</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <Navlink to="/" onClick={() => setIsOpen(false)}>
              Home
            </Navlink>
            <Navlink to="/dishes" onClick={() => setIsOpen(false)}>
              Dishes
            </Navlink>
            <Navlink to="/orders" onClick={() => setIsOpen(false)}>
              Orders
            </Navlink>
            <Navlink to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Navlink>
            {currentUser ? (
              <TextButton onClick={() => dispatch(logout())}>
                Logout
              </TextButton>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <Button
                  text="Sign Up"
                  outlined
                  small
                  onClick={() => setOpenAuth(true)}
                />
                <Button
                  text="Sign In"
                  small
                  onClick={() => setOpenAuth(true)}
                />
              </div>
            )}
          </MobileMenu>
        )}
        <ButtonContainer>
          {currentUser ? (
            <>
              <Navlink to="/favorite">
                <FavoriteBorder style={{ fontSize: "28px" }} />
              </Navlink>
              <Navlink to="/cart">
                <ShoppingCartOutlined style={{ fontSize: "28px" }} />
              </Navlink>
              <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
              <TextButton onClick={() => dispatch(logout())}>
                Logout
              </TextButton>
            </>
          ) : (
            <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
          )}
        </ButtonContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
