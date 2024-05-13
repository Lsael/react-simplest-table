import { useState } from 'react'
import { CustomTable } from '../dist/main'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <CustomTable title={"someTitle"}
    id={"someId"}
    labels={[{
      label: "string1",
      id: "string1"
  }, {
    label: "string2",
    id: "string2"
}]}
    datas={[{string1: "test1", string2:"test2"}]}
    options={{
      headerFont: "white",
      headerBackground: "black",
      oddLines: "lightGray",
      oddFont: "black",
      evenLines: "gray",
      evenFont: "white",
    }}/>
  )
}

export default App
