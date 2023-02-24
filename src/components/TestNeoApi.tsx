import { useState, useEffect } from 'react';

export const TestNeoApi: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([] as any[]);

  useEffect(() => {
    fetch('http://ws00800.11880.com:8000/api/v1/occupation', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'post',
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        console.log('data', data);
        setResults(data);
      })
      .catch((err) => console.error('FETCH_ERR:', err));
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(ev) => setQuery(ev.target.value)} />
      <ul>
        {results.map((i) => (
          <li>
            <pre>{JSON.stringify(i)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};
