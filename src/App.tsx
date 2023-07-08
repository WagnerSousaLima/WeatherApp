
import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

function App() {

  const {
    forecast,
    options,
    search,
    onOptionSelect,
    onSubmit,
    onInputChange, 
  } = useForecast()

  

  return (
    <main className="flex justify-center items-center
    bg-gradient-to-br from-yellow-200 to-blue-300 border-6 border-black
    rounded-xl shadow-md h-[100vh] w-full">

      {forecast ? (
        <Forecast data={forecast} />
      ) : (
          
        <Search
          search={search}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit} />
          
      )}
      
    

    </main>
  );
}

export default App;