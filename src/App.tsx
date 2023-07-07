import { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "./types";

function App() {

  const [search, setSearch] = useState<string>('')

  const [city, setCity] = useState<optionType | null>(null)

  const [options, setOptions] = useState<[]>([])

  const getSearchOptions = (value: string) => {
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`
    ).then(res => res.json()).then((data) => setOptions(data))
    

  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setSearch(value)

    if(value ==='') return

    getSearchOptions(value)

  }

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`
    ).then(res => res.json()).then(data => console.log({ data }))

  }

  const onSubmit = () => {
    if (!city) return
    
    getForecast(city)
  }

  const onOptionSelect = (option: optionType) => {

    setCity(option)

  
      

  }

  useEffect(() => {

    if (city) {
      setSearch(city.name)
      setOptions([])
    }
  })

  return (
    <main className="flex justify-center items-center
    bg-gradient-to-br from-yellow-200 to-blue-300 border-6 border-black
    rounded-xl shadow-md h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center 
      items-center md:px-10 lg:p-6 h-full lg:h-[700px] bg-white
      bg-opacity-20 backdrop:blur-lg rounded drop-shadow-lg text-zinc-700">
        
        <div className="relative flex mt-1 md:mt-4">

          <ul className="absolute top-9 bg-white ml-1 rounded">
            {options.map((option: optionType, index: number) => (
            <li key={option.name + '-' + index}>
                <button className="text-left text-sm w-full hover:bg-zinc-700 
                hover:text-white px-2 py-1 cursor-pointer" onClick={() => 
                onOptionSelect(option)}>
                  {option.name}
                </button>
                </li>
            ))}
          </ul>
          

        <button className="rounded-l-md border-2 border-zinc-200 
          hover:border-zinc-500 text-zinc-100 px-2 py1 cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>

          <input
            type="text"
            value={search}
            className="px-2 py-1 rounded-1-md border-2 border-white"
            onChange={onInputChange}

          />

        </div>
     </section>
    </main>
  );
}

export default App;