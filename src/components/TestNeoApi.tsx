import { useState, useEffect } from 'react';

export const TestNeoApi: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([] as any);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }
    fetch('http://ws00800.11880.com:8000/api/v1/skills', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        skill_name: query,
        desired_job_id: 8497,
      }),
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
        {results?.map((i: any) => (
          <li key={i.skill_id || i.job_attr_name}>
            <pre>{JSON.stringify(i)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};
