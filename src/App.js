import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const matchedProduct = cartList.find(
        eachItem => eachItem.id === product.id,
      )
      if (matchedProduct === undefined) {
        return {cartList: [...cartList, product]}
      }
      const updatedProduct = {
        ...matchedProduct,
        quantity: matchedProduct.quantity + product.quantity,
      }
      const filteredCartList = cartList.filter(
        eachItem => eachItem.id !== product.id,
      )
      return {cartList: [...filteredCartList, updatedProduct]}
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + 1,
          }
        }
        return eachItem
      })
      return {cartList: updatedCartList}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => {
      const {cartList} = prevState
      const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
      return {cartList: filteredCartList}
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState

      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      })

      const filteredCartList = updatedCartList.filter(
        eachItem => eachItem.quantity !== 0,
      )
      return {cartList: filteredCartList}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
