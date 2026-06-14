import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const fakeItems = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  title: `Synthetic card ${index + 1}`,
  value: index % 5,
}));

function HugeDashboard() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(fakeItems[0]);
  const [derivedCount, setDerivedCount] = useState(0);
  const [copiedItems, setCopiedItems] = useState(fakeItems);

  useEffect(() => {
    setDerivedCount(copiedItems.filter((item) => item.title.includes(query)).length);
  }, [query, copiedItems]);

  useEffect(() => {
    setCopiedItems(fakeItems.map((item) => ({ ...item, label: `${item.title}-${Date.now()}` })));
  }, [query]);

  const visibleItems = copiedItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  const unstableOptions = { selectedColor: 'purple', density: 'compact' };

  return (
    <main style={{ padding: 24 }}>
      <h1>Synthetic React quality demo</h1>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Synthetic search" />
      <p>Derived count: {derivedCount}</p>
      <section>
        {visibleItems.map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            selected={selected.id === item.id}
            options={unstableOptions}
            onSelect={() => setSelected(item)}
          />
        ))}
      </section>
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </main>
  );
}

function ItemCard({ item, selected, options, onSelect }) {
  const expensiveValue = useMemo(() => {
    let total = 0;
    for (let index = 0; index < 40000; index += 1) total += index * item.value;
    return total;
  }, [item]);

  return (
    <button onClick={onSelect} style={{ margin: 4, borderColor: selected ? options.selectedColor : 'gray' }}>
      {item.title} / {expensiveValue}
    </button>
  );
}

createRoot(document.getElementById('root')).render(<HugeDashboard />);
