import './App.css'
import { useEffect, useState } from 'react'
import RandomImageGoldPrice from './components/RandomImage'

function App() {
  const [goldPrice, setGoldPrice] = useState({ buy: '–', sell: '–' })
  const [date, setDate] = useState('')
  const [updateTime, setUpdateTime] = useState('')
  const BASE_URL = 'http://localhost:3000'

  useEffect(() => {
    // fetch immediately…
    fetchGoldPrice()

    // …then every 10 seconds
    const id = setInterval(fetchGoldPrice, 10_000)
    return () => clearInterval(id)
  }, [])

  async function fetchGoldPrice(retries = 3) {
    try {
      const res = await fetch(`${BASE_URL}/latest`)
      console.log('Response:', res)
      const json = await res.json()
      console.log('JSON:', json)

      if (json.status === 'success' && json.response) {
        const { date, update_time, price } = json.response
        // choose which price to show (gold vs gold_bar)
        const bar = price.gold_bar
        console.log('Bar:', bar)

        setGoldPrice({
          buy: bar.buy,
          sell: bar.sell
        })

        setDate(date)
        setUpdateTime(update_time)
      } else {
        throw new Error('Bad payload')
      }
    } catch (err) {
      console.error('Fetch /latest failed', err)
      if (retries > 0) {
        setTimeout(() => fetchGoldPrice(retries - 1), 1_000)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error)
    } else {
      document.exitFullscreen().catch(console.error)
    }
  }

  return (
    <body>
      <img id="logo-image" src="./brandimg/logo.png" alt="Logo Image" onClick={()=> toggleFullscreen()}></img>
    <div className="container">
        <div className="sidebar" id="sidebar">
            <div className="detail">
                <h1>ราคาทองคำแท่ง 96.5%</h1>
                <table>
                    <tr>
                        <td>ขายออก</td>
                        <td className="price" id="gold_bar_buy">{goldPrice.buy}</td>
                    </tr>
                    <tr>
                        <td>รับซื้อ</td>
                        <td className="price" id="gold_bar_sell">{goldPrice.sell}</td>
                    </tr>
                </table>
            </div>
            <div>
                <h4>ข้อมูลล่าสุด ณ วันที่ <span id="date">{date}</span> <span id="update_time">{updateTime}</span></h4>
            </div>
        </div>
        <RandomImageGoldPrice/>
    </div>
    </body>
  )
}

export default App
