import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import { fetchWhiskies } from './actions';

import WhiskyGrid from './components/WhiskyGrid';

type whisky = {
  id: string;
  title: string;
  imageUrl: string;
};

interface IState {
  whiskies: whisky[];
  isLoading: boolean;
  error: null;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const whiskies = useSelector((state: IState) => state.whiskies);
  const isLoading = useSelector((state: IState) => state.isLoading);

  return (
    <div className='App'>
      <button onClick={() => dispatch(fetchWhiskies())}>Fetch whiskies</button>
      {isLoading && <h1>...Fetching Data...</h1>}
      {!isLoading && whiskies.length > 0 && <WhiskyGrid whiskies={whiskies} />}
    </div>
  );
};

export default App;
