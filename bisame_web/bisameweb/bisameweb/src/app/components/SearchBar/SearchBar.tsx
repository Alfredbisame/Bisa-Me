'use client';

import { ResponsiveSearchBar } from './components';
import { SearchBarProps } from './types';


const SearchBar: React.FC<SearchBarProps> = (props) => {
  return <ResponsiveSearchBar {...props} />;
};

export default SearchBar;


