'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";

export default function Home() {

  useEffect(() => {
      let b = async ()=>{
        let c = await fetch('/api');
        let d = await c.json()
        setdata(d)
      }
      b()
  }, [])


  const [data, setdata] = useState([])

  const [form_data, setform_data] = useState({
    username: '',
    password: '',
    link: ''
  })

  const handleChange = (e) => {
    setform_data({ ...form_data, [e.target.name]: [e.target.value] })
  }

  const handleSubmit = async() => {
    setdata([...data, form_data])
    setform_data({
      username: '',
      password: '',
      link: ''
    })
    // gonna post new data in the data base
    let response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form_data),
    });
  }

  const handleEdit = async(e) => {
    setform_data(e);
    setdata(data.filter(item => item !== e));
    // gonna post new data in the data base
    let response = await fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e),
    });
  }

  const handleDelete = async(e) => {
    setdata(data.filter(item => item !== e));
    // gonna post new data in the data base
    let response = await fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e),
    });
  }

  return (
    <>
      <div className="flex py-8 text-white gap-10 flex-col w-screen min-h-screen bg-stone-800 items-center">
        <div className="font-extrabold text-2xl md:text-4xl">Password Manager</div>
        <div className="flex flex-col gap-3 w-[80vw] my-0 m-auto">
          <div className="w-full flex gap-2">
            <input value={form_data.username} onChange={(e) => { handleChange(e) }} name='username' className="w-full p-2 rounded-xl px-3 text-black placeholder:text-slate-600" placeholder="Please Enter Your Username" type="text" />
            <input value={form_data.password} onChange={(e) => { handleChange(e) }} name='password' className="w-full p-2 rounded-xl px-3 text-black placeholder:text-slate-600" placeholder="Please Enter Your Password" type="password" />
          </div>
          <div className="w-full flex gap-2">
            <input value={form_data.link} onChange={(e) => { handleChange(e) }} name='link' className="w-full p-2 rounded-xl px-3 text-black placeholder:text-slate-600" placeholder="Please Enter Your Website Link" type="text" />
          </div>
          <button onClick={() => { handleSubmit() }} className="p-2 bg-blue-500 hover:bg-transparent hover:border-[1px] font-bold hover:border-white rounded-xl">Enter</button>
        </div>
        <div className="w-[80vw] my-0 m-auto">
          <Table>
            <TableCaption>Password Manager just for showchasing my programming skill.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">UserName</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Web Link</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((e, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium flex gap-1">{e.username}</TableCell>
                    <TableCell>{e.password}</TableCell>
                    <TableCell>{e.link}</TableCell>
                    <TableCell className='flex gap-2'>
                      <svg onClick={() => { handleDelete(e) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                      <svg onClick={() => { handleEdit(e) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
