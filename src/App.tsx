import './App.css'
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner/Spinner';

export type TAdviceSlip = {
  slip: {
    id: number,
    advice: string
  }
}


function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TAdviceSlip | null>(null);
  const [error, setError] = useState<string | null>(null);

  const slip = data?.slip?.advice;
  
  //fetch data from api
 async function fetchHandler () {
  const abortController = new AbortController();
  const signal = abortController.signal;

  setLoading(true);
  setError(null);



  fetch("https://api.adviceslip.com/advice", {signal})
  .then((response) => {
    if(!response.ok){
      throw new Error(`THIS IS HTTP ERROR, error is ${response.status}`);
    }
    return response.json();
  })
  .then((advice) => {
    setLoading(false);
    setError(null);
    setData(advice);    
  })
  .catch((err) => {
    console.log("ERRR");
    
    setError(err.message);
    setData(null);
    setLoading(false);
  });
  return() => abortController.abort();
 }

 useEffect(() => {
  fetchHandler()
 }, [])

  return (
    <>
      <h1 style={{fontStyle: 'italic'}}><span className={'bismuth'} style={{color: '#9551ff', fontStyle: 'normal'}}>Life Adivce App</span></h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
      <div style={{maxWidth: '40rem'}}>
          <p style={{fontSize: '30px', fontStyle: 'italic', color: 'white'}}>"{slip}"</p>
          <button
              onClick={fetchHandler}
              title={'Refresh the advice'}
              type={'button'}>
          Refresh
      </button>
    </div>
      )}
    </>
  )
}

export default App
