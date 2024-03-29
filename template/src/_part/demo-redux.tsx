import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCount } from '../model/action';
import { IRootState } from '../model/store';

import checked from '../images/checked@2x.png';
import './demo.scss';

interface IProps {
  a?: string;
}

const Demo: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const count = useSelector((v: IRootState) => v.appState.count);

  console.log(count, '<-- count');
  const onClick = () => {
    dispatch(setCount(Math.random()));
  };

  return (
    <div styleName="hello">
      Hello React!
      <img src={checked} alt="" />
      <div className="globals">{count}</div>
      <div styleName="stylename">stylenam2e</div>
      <button type="button" onClick={onClick}>click me!</button>
    </div>
  );
};

export default Demo;
