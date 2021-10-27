import * as React from 'react';

import checked from '../images/checked@2x.png';
import './demo.scss';

interface IProps {
  a?: string;
}

const Demo: React.FC<IProps> = () => {
  const [count, setCount] = React.useState(1);

  const onClick = () => {
    setCount(Math.random());
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
