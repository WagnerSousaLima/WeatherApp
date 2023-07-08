import { ChangeEvent, useEffect, useState } from "react"

import { optionType, forecastType } from "../types"

const useForecast = () => {
  const [search, setSearch] = useState<string>('')

  const [city, setCity] = useState<optionType | null>(null)

  const [options, setOptions] = useState<[]>([])

  const [forecast, setForecast] = useState<forecastType | null>(null)

  const getSearchOptions = (value: string) => {
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`
    ).then(res => res.json()).then((data) => setOptions(data))
    

  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setSearch(value)

    if (value === '') return

    getSearchOptions(value)

  }

  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=standart&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        
        const forecasData = {
          ...data.city,
          list: data.list.slice(0,16),
        }
        
        
        setForecast(forecasData)
  })
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
  }, [city])
    
  return {
    forecast,
    options,
    search,
    onOptionSelect,
    onSubmit,
    onInputChange,
  }
}

export default useForecast