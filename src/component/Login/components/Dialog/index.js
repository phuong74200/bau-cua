import React from 'react';

import ReactDOM from 'react-dom';
import { BsXLg } from 'react-icons/bs';

import { ButtonIcon } from '../Button/ButtonIcon';
import * as Styled from './index.style';

const Dialog = ({ isShowing, hide, children, title, ...others }) =>
    isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <Styled.ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <Styled.ModalOverlay onClick={() => hide()} />
                      <Styled.StyledModal {...others}>
                          <Styled.ModalMain isShowing={isShowing}>
                              <Styled.ModalHeader>
                                  <Styled.Title>
                                      <b>{title}</b>
                                  </Styled.Title>
                                  <ButtonIcon
                                      icon={<BsXLg />}
                                      border="1px solid #000"
                                      color="#fff"
                                      onClick={() => hide()}
                                  />
                              </Styled.ModalHeader>
                              {children}
                          </Styled.ModalMain>
                      </Styled.StyledModal>
                  </Styled.ModalWrapper>
              </React.Fragment>,
              document.body
          )
        : null;

export default Dialog;
