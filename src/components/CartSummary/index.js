import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const getTotalPrice = () => {
        let totalPrice = 0
        cartList.forEach(eachItem => {
          totalPrice += eachItem.quantity * eachItem.price
        })
        return totalPrice
      }

      const getCartItemsCount = () => cartList.length

      return (
        <div className="cart-summary-bg-container">
          <div className="cart-summary-card">
            <h1 className="total-price-heading">
              Order Total:{' '}
              <span className="total-price-style">Rs {getTotalPrice()}/-</span>
            </h1>
            <p className="items-count">{getCartItemsCount()} Items in cart</p>
          </div>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
