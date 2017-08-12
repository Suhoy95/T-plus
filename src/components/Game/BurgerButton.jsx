import React from 'react';

function BurgerButton(props) {
  return (
    <div className="BurgerButton" {...props}>
      <div className="BurgerButton--line" />
      <div className="BurgerButton--line" />
      <div className="BurgerButton--line" />
    </div>
  );
}

export default BurgerButton;
