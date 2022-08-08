import Redis from 'ioredis'
import { useState } from 'react'
import Link from 'next/link'
import React from 'react';
import Header from '../components/Header';
import Router from 'next/router';
import Pane from '../components/Pane'
// import Test from '../components/Test';
import Main from '../lib/context';


// get data
let redis = new Redis(process.env.REDIS_URL)

export default function App({ data }) {
  const [count, setCount] = useState(data)

  const increment = async () => {
    const response = await fetch('/api/incr', { method: 'POST' })
    const data = await response.json()
    setCount(data.count)
  }

  return (
    <div>
      <Header/>
        <Main>
          <Pane/>
        </Main>

      {/* <a onClick={this.gotoTr}>to tr</a> */}
      {/* <Test/> */}
    </div>
  )
}

export async function getServerSideProps() {
  const data = await redis.incr('counter')
  return { props: { data } }
}
