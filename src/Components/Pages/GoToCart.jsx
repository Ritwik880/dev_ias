import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/authSlice';
const GoToCart = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const totalPrice = cartItems.reduce((accumulator, priceString) => {
    const match = priceString.price.match(/\d+(?:,\d+)*(\.\d+)?/);
    const numericPrice = parseFloat(match[0].replace(',', ''));
    return accumulator + numericPrice;
  }, 0);
  const formattedTotalPrice = totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });

  const dispatch = useDispatch();

  const handleRemoveProduct = (id) => {
    dispatch(removeFromCart(id));
  }
  return (
    <section className='cart-section'>
      <div className='row container'>
        <div className='col-lg-8 col-md-12'>
          <h1 className='shopping-cart-heading'>
            Shopping Cart
          </h1>
          <h3 className='dynamic-courses-count'>
            {cartItems ? cartItems.length : 0} Courses in Cart
          </h3>
          {
            cartItems.length !== 0 ?
              <>
                {cartItems.map((item) => {
                  return (
                    <div className="card mt-2 add-to-cart-courses" key={item.id}>
                      <div className="card-header"></div>
                      <div className="card-body checkout-cart-card-body">
                        <div className='checkout-cart-card-inner'>
                          <img src={item.img} alt="Course Image" className="checkout-cart-img" />
                          <div>
                            <h5 className="card-title">
                              {item.title}
                            </h5>
                            <p className="card-text checkout-cart-para">
                              {item.para}
                            </p>
                          </div>
                        </div>
                        <div className='checkout-cart-card-btn'>
                          <button className="checkout-btn" onClick={() => handleRemoveProduct(item.id)}>Remove</button>
                          <button className="checkout-btn">Save for later</button>
                        </div>
                        <div>
                          <span className='price-tag'>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
                }
              </> :
              <p className='no-courses'>
                No items in cart
              </p>
          }
        </div>
        <div className='col-lg-4 col-md-12'>
          <h5 className='amount-total'>
            Total:
          </h5>
          <span className='price-total'>
            ₹ {formattedTotalPrice ? formattedTotalPrice : 0}
          </span>
          <button className='ud-btn'>Checkout</button>
          <hr />
          <div className="card scheduled-classes mt-3">
            <img src="https://uploads.iasscore.in/banner/1708514822-a0f12e3d-495b-4af1-9dea-d9adfc93663b.webp.webp" className="card-img-top scheduled-card" alt="image" />
            <div className="card-body">
              <h6 className="eachBatchStart">Batch Starts: <span className="eachDate">18th September, 2024</span> </h6>
              <h5 className="card-title eachSubTitle">
                IAS 2025: Geography Optional Foundation
              </h5>
              <div className="course_btn">
                <button className="btn btn-danger">
                  Add to cart
                </button>
                <button className="btn btn-outline-danger ml-1 font-16"><i className="fa fa-download"></i>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoToCart