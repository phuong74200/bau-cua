import React from 'react';

import ReactDOM from 'react-dom';
import { FaRegTimesCircle } from 'react-icons/fa';

import { ButtonIcon } from '../Button/ButtonIcon';
import * as Styled from './index.style';

const Dialog = ({ isShowing, hide, children, title, ...others }) =>
    isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <Styled.ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <Styled.ModalOverlay onClick={() => hide()} />
                      <Styled.StyledModal {...others}>
                          <Styled.ModalMain>
                              <Styled.ModalHeader>
                                  <Styled.Title>
                                      <b>{title}</b>
                                  </Styled.Title>
                                  <ButtonIcon
                                      icon={
                                          <FaRegTimesCircle
                                              style={{ width: '20px', height: '20px' }}
                                          />
                                      }
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
