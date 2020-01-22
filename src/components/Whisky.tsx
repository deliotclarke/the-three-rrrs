import React from 'react';

type whisky = {
  id: string;
  title: string;
  imageUrl: string;
};

interface IProps {
  whisky: whisky;
}

const Whisky: React.FC<IProps> = ({ whisky }) => (
  <div>
    <img
      style={{ width: '300px', height: '300px' }}
      src={whisky.imageUrl}
      alt={whisky.title}
    />
    <h3>{whisky.title}</h3>
  </div>
);

export default Whisky;
