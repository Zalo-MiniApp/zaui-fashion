import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Input } from 'zmp-ui';
import { InputProps } from 'zmp-ui/input';
import { useSearch } from 'miniapp-core/src';

const SearchBar = (props: InputProps) => {
  const [localKeyword, setLocalKeyword] = useState('');
  const { setKeyword } = useSearch();
  const location = useLocation();

  // Focus input on `/search`
  useEffect(() => {
    if (location.pathname === '/search') {
      setTimeout(() => {
        const input = document.querySelector<HTMLInputElement>('input[type="search"]');
        input?.focus();
      }, 0); // wait for next render tick
    }

    return () => {
      setKeyword('');
    };
  }, [location.pathname, setKeyword]);

  return (
    <Input.Search
      size="small"
      placeholder="Bạn đang tìm gì?"
      className="m-0"
      style={{
        viewTransitionName: 'search-bar',
        border: '1px solid #ccc',
        borderRadius: 8,
      }}
      value={localKeyword}
      onChange={(e) => setLocalKeyword(e.currentTarget.value)}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          setKeyword(localKeyword);
        }
      }}
      // onBlur={() => setKeyword(localKeyword)}
      clearable
      {...props}
    />
  );
};

export default SearchBar;
