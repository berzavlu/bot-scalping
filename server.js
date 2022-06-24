const ccxt = require('ccxt')
const MongoHelper = require('./config/database')

const pair = 'BTC/USDT'

const exchange = new ccxt.binance({
  'apiKey': '',
  'secret': '',
})

async function getPrice() {
  const orderbook = await exchange.fetchOrderBook(pair)
  const bid = orderbook.bids.length && orderbook.bids[0][0]
  const ask = orderbook.asks.length && orderbook.asks[0][0]
  const spread = (bid && ask) && ask - bid

  return { bid, ask, spread }
}

async function buyOrder(price, bid) {
  const order = exchange.createOrder(pair, 'market', 'buy', price, bid)
  return order
}

async function createOrder(amountToBuy) {
  const orderbook = await exchange.fetchOrderBook(pair)
  const bid = orderbook.bids.length && orderbook.bids[0][0]
  const ask = orderbook.asks.length && orderbook.asks[0][0]
  const spread = (bid && ask) && ask - bid

  console.log (pair + ' price', { bid, ask, spread })
  
  const binanceComision = amountToBuy * 0.01
  const amount = amountToBuy + binanceComision
  const price = amount / bid
  // const createOrder = exchange.createOrder(pair, 'market', 'buy', price, bid)
  // return createOrder
  return {
    bid: 29766.41,
    ask: 29766.42,
    spread: 0.00999999999839929
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async () => {
  const activeTrades = []
  let id = 0
  try {
    // const mongo = new MongoHelper()
    // await mongo.connect()
    // const data = mongo.getDB()
    // const collection = await data.collection('scalping').findOne({})
    // console.log(collection)

    while (true) {
      console.log('------------------------------------------------------------------')
      await sleep(5000)
      console.log('Active trades', activeTrades)
      const resPrice = await getPrice()
      console.log (pair + ' price', resPrice)

      // Paso 1: Creo la orden de compra
      if (activeTrades.length === 0 || activeTrades[activeTrades.length - 1]?.completed) {
        const amountToBuy = 10
        const newId = id + 1
        
        const binanceComision = amountToBuy * 0.01
        const amount = amountToBuy + binanceComision
        const price = amount / resPrice.bid

        const obj = {
          id: newId,
          pair,
          price,
          amountToBuy,
          completed: false
        }
        
        const data = await exchange.createOrder(pair, 'market', 'buy', price, resPrice.bid)
        console.log(data)
        activeTrades.push(obj)
      } else {
        // Paso 2: Creo la orden de venta



        // const lastTrade = activeTrades[activeTrades.length - 1]
        // exchange.
        console.log(activeTrades)
        console.log('waiting to sale')
      }

      // const amountToBuy = 10
      // const buy = await buyOrder(amount, price.bid)
      console.log('encontrado')
    }
    // const trades = await exchange.fetchMyTrades (pair, null, null, null)
    // console.log(trades)
  } catch (error) {
    console.log(error)
  }
})()