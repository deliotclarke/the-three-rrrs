import React from 'react';

type whisky = {
  id: string;
  title: string;
  imageURL: string;
};

interface IProps {
  whisky: whisky;
}

const Whisky: React.FC<IProps> = ({ whisky }) => {
  console.log(whisky);
  console.log(whisky.title);
  console.log(whisky.imageURL);
  return (
    <div>
      <img
        style={{ width: '300px', height: '300px' }}
        src={`${whisky.imageURL}`}
        alt={whisky.title}
      />
      <h3>{whisky.title}</h3>
    </div>
  );
};

export default Whisky;
