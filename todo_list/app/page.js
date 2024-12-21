'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [list, setlist] = useState([]);
  const [listDone, setlistDone] = useState([]);
  const [current, setcurrent] = useState('Not Done');
  const [form, setform] = useState({ task: '' });

  // Initialize data from localStorage
  useEffect(() => {
    const savedList = localStorage.getItem('list');
    const savedListDone = localStorage.getItem('listDone');

    // Ensure we set the state correctly if data is present
    if (savedList) {
      setlist(JSON.parse(savedList));
    }
    if (savedListDone) {
      setlistDone(JSON.parse(savedListDone));
    }
  }, []);


  const handleNotDone = (itemToRemove) => {
    const updatedList = list.filter((item) => item !== itemToRemove);
    setlist(updatedList);
    localStorage.setItem('list', JSON.stringify(updatedList));
    setlistDone([...listDone, itemToRemove]);
    localStorage.setItem('listDone', JSON.stringify([...listDone, itemToRemove]));
  };

  const handleDone = (itemToRemove) => {
    const updatedListDone = listDone.filter((item) => item !== itemToRemove);
    setlistDone(updatedListDone);
    localStorage.setItem('listDone', JSON.stringify(updatedListDone));
    setlist([...list, itemToRemove]);
    localStorage.setItem('list', JSON.stringify([...list, itemToRemove]));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.task.trim()) {
      setlist([...list, form.task]);
      localStorage.setItem('list', JSON.stringify([...list, form.task]));
      setform({ task: '' });
    }
  };

  return (
    <div className="w-[90vw] m-auto flex flex-col items-center min-h-[90vh] border-[1px] border-slate-500 rounded-lg">
      <div className="h-[10%] flex justify-center items-center my-3 font-extrabold text-4xl">List</div>
      <div className="h-[10%] flex max-md:flex-col w-full justify-center my-3 gap-2 items-center">
        <input
          name="task"
          value={form.task}
          onChange={handleChange}
          type="text"
          placeholder="Enter your task here!"
          className="placeholder:text-slate-500 p-2 w-[50%] max-md:w-[80%] border-[1px] rounded-lg"
        />
        <button
          onClick={handleSubmit}
          className="text-white p-2 border rounded-lg bg-emerald-500 w-[30%] max-md:w-[80%] border-white hover:bg-white hover:text-black hover:border-black"
        >
          Enter
        </button>
      </div>
      <div className="h-[10%] my-10 w-full flex items-center justify-around">
        <div
          onClick={() => setcurrent('Not Done')}
          className={`cursor-pointer ${current === 'Not Done' && 'border-b-[2px] border-b-blue-500'}`}
        >
          Not Done
        </div>
        <div
          onClick={() => setcurrent('Done')}
          className={`cursor-pointer ${current === 'Done' && 'border-b-[2px] border-b-blue-500'}`}
        >
          Done
        </div>
      </div>
      <div className="my-16 w-[90%] flex flex-col gap-4 m-auto">
        {current === 'Not Done' &&
          list.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <div
                onClick={() => handleNotDone(item)}
                className="w-4 h-4 cursor-pointer border-black border"
              ></div>
              {item}
            </div>
          ))}
        {current === 'Done' &&
          listDone.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <div
                onClick={() => handleDone(item)}
                className="w-4 h-4 border-black cursor-pointer bg-blue-500 border"
              ></div>
              <span className="line-through">{item}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
