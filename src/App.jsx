import { useState, useCallback, useEffect, useRef } from 'react'
import SavedPasswordItem from './SavedPasswordItem'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  const [savedPasswords, setSavedPasswords] = useState(() => {
    const saved = localStorage.getItem('savedPasswords');
    return saved ? JSON.parse(saved) : [];
  });
  const [website, setWebsite] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  // Save to localStorage whenever savedPasswords changes
  useEffect(() => {
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
  }, [savedPasswords]);

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!website || !websiteUrl || !password) return;
    setSavedPasswords(prev => [
      ...prev,
      { website, websiteUrl, password, id: Date.now() }
    ]);
    setWebsite("");
    setWebsiteUrl("");
  };

  const handleDelete = (id) => {
    setSavedPasswords(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <div className="min-h-screen bg-[#10141a] flex flex-col items-center justify-center py-8">
      {/* Main Password Generator Card */}
      <div className="w-full max-w-md shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3 text-2xl font-bold'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
                type="text"
                value={password}
                className="outline-none w-full py-1 px-3 text-lg bg-gray-700 text-orange-300"
                placeholder="Password"
                readOnly
                ref={passwordRef}
            />
            <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 transition'
            >Copy</button>
        </div>
        <div className='flex text-sm gap-x-4 justify-between mb-4'>
          <div className='flex items-center gap-x-2'>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer accent-orange-500'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label className="text-white font-medium">Length: <span className="text-orange-400 font-bold">{length}</span></label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev )}
            />
            <label htmlFor="characterInput" className="text-white">Characters</label>
          </div>
        </div>
        <form onSubmit={handleSavePassword} className="my-4 bg-gray-700 p-4 rounded flex flex-col gap-3">
          <input
            type="text"
            className="outline-none px-2 py-2 rounded text-base bg-gray-600 text-orange-200 placeholder:text-orange-300"
            placeholder="Website Name (e.g. Gmail)"
            value={website}
            onChange={e => setWebsite(e.target.value)}
            required
          />
          <input
            type="url"
            className="outline-none px-2 py-2 rounded text-base bg-gray-600 text-orange-200 placeholder:text-orange-300"
            placeholder="Website URL (e.g. https://mail.google.com)"
            value={websiteUrl}
            onChange={e => setWebsiteUrl(e.target.value)}
            required
          />
          <input
            type="text"
            className="outline-none px-2 py-2 rounded bg-gray-500 text-orange-400 text-base"
            value={password}
            readOnly
            required
          />
          <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded font-semibold hover:bg-green-700 transition">Save Password</button>
        </form>
      </div>

      {/* Saved Passwords Card - Separate and wider */}
      <div className="w-full max-w-2xl mt-8 shadow-md rounded-lg px-6 py-5 bg-gray-900 text-orange-400">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">Saved Passwords</h2>
        </div>
        <ul className="space-y-3">
          {savedPasswords.length === 0 && <li className="text-gray-400">No passwords saved yet.</li>}
          {savedPasswords.map(item => (
            <SavedPasswordItem
              key={item.id}
              item={item}
              onCopy={(pwd) => navigator.clipboard.writeText(pwd)}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App