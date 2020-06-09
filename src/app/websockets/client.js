import io from "socket.io-client"
let socket
socket = io("localhost:5000");
// const init = (store, rootURL) => {
  
//   // add listeners to socket messages so we can re-dispatch them as actions
//   Object.keys(messageTypes).forEach(key =>
//     socket.on(key, data => {
//       const { type, payload } = data
//       store.dispatch({ type, payload })
//     })
//   )
// }

//const emit = (type, payload) => socket && socket.emit(type, payload)

// Helper to emit a redux action to our websocket server
const emitAction = action => {
  return (...args) => {
    const result = action.apply(this, args)
    if (socket) {
      socket.emit(result.key, result.payload)
    }
    return result
  }
}

export { emitAction }