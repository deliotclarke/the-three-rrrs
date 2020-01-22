import React from 'react';

import Whisky from './Whisky';

type whisky = {
  id: string;
  title: string;
  imageUrl: string;
};

interface IProps {
  whiskies: whisky[];
}

const WhiskyGrid: React.FC<IProps> = ({ whiskies }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
    {whiskies.map(whisky => (
      <Whisky key={whisky.id} whisky={whisky} />
    ))}
  </div>
);

export default WhiskyGrid;
