import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/ad?keyword=компьютер')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>Данные</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}