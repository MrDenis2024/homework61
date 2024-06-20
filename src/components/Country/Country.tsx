import React from 'react';

interface Props {
  name: string
  onClick: React.MouseEventHandler
}

const Country: React.FC<Props> = ({name, onClick}) => {
  return (
    <span className='country' onClick={onClick}>
      {name}
    </span>
  );
};

export default Country;