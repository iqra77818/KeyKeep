import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', { position: "top-right", autoClose: 5000, theme: "dark" });
        navigator.clipboard.writeText(text);
    }

    const showPassword = () => {
        passwordRef.current.type = "text";
        if (ref.current.src.includes("3550622.png")) {
            ref.current.src = "https://png.pngtree.com/png-clipart/20220613/original/pngtree-white-eye-icon-on-black-background-png-image_7989012.png";
            passwordRef.current.type = "password";
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "https://cdn-icons-png.freepik.com/256/3550/3550622.png?semt=ais_hybrid";
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newEntry = { ...form, id: uuidv4() };
            setPasswordArray([...passwordArray, newEntry]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, newEntry]));
            setform({ site: "", username: "", password: "" });
            toast('Password saved!', { position: "top-right", autoClose: 5000, theme: "dark" });
        } else {
            toast('Error: Password not saved!');
        }
    }

    const deletePassword = (id) => {
        if (confirm("Do you really want to delete this password?")) {
            const updated = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updated);
            localStorage.setItem("passwords", JSON.stringify(updated));
            toast('Password Deleted!', { position: "top-right", autoClose: 5000, theme: "dark" });
        }
    }

    const editPassword = (id) => {
        const toEdit = passwordArray.find(i => i.id === id);
        setform(toEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

         
            <div className="p-3 md:mycontainer min-h-[88.2vh]">
    <h1 className="text-4xl font-bold text-center">
        <span className="text-white">&lt;</span>
        <span className="bg-gradient-to-r from-white to-violet-500 text-transparent bg-clip-text">KeyKeep</span>
        <span className="text-white">&gt;</span>
    </h1>
                <p className='text-violet-700 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-white gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-violet-800 bg-black w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-violet-800 bg-black w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-violet-800 bg-black w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="https://png.pngtree.com/png-clipart/20220613/original/pngtree-white-eye-icon-on-black-background-png-image_7989012.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-violet-900 hover:bg-violet-300 rounded-full px-8 py-2 w-fit border border-violet-900'>
                        <img src="https://cdn-icons-png.freepik.com/256/8690/8690923.png?semt=ais_hybrid" alt="Save" className="w-6 h-6" />
                        Save
                    </button>
                </div>
                <div className="passwords">
    <h2 className='font-bold text-2xl text-white py-4'>Your Passwords</h2>
    {passwordArray.length === 0 && (
        <div className="text-white">No passwords to show</div>
    )}
    {passwordArray.length !== 0 && (
        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-violet-900 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-black text-white'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 border border-black text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <img src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-copy-icon-png-image_4163058.jpg" onClick={() => copyText(item.site)} className="cursor-pointer w-6 h-6 ml-2" alt="Copy" />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-black text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <img src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-copy-icon-png-image_4163058.jpg" onClick={() => copyText(item.username)} className="cursor-pointer w-6 h-6 ml-2" alt="Copy" />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-black text-center'>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.password}</span>
                                                <img src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-copy-icon-png-image_4163058.jpg" onClick={() => copyText(item.password)} className="cursor-pointer w-6 h-6 ml-2" alt="Copy" />
                                            </div>
                                        </td>
                                        <td className='justify-center py-2 border border-black text-center'>
                                            <img src="https://www.shutterstock.com/image-vector/edit-icon-square-pen-linear-600w-1116215996.jpg" onClick={() => editPassword(item.id)} className="cursor-pointer w-6 h-6 mx-1 inline" alt="Edit" />
                                            <img src="https://cdn-icons-png.flaticon.com/512/3550/3550701.png" onClick={() => deletePassword(item.id)} className="cursor-pointer w-6 h-6 mx-1 inline" alt="Delete" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Manager;

