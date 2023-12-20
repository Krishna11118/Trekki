import React, { useRef, useEffect, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo 2.png'
import './gateway.css'
import { AuthContext } from '../../context/AuthContext'
import PaymentImg from '../../assets/images/payment.png'
import toast from 'react-hot-toast'

const Gateway = () => {
  const navigate = useNavigate()

  const Booked = (event) => {
    event.preventDefault()
    const cardNumber = document.getElementById('card-number').value
    const cardName = document.getElementById('card-name').value
    const expiryDate = document.getElementById('expiry-date').value
    const securityCode = document.getElementById('security-code').value

    if (cardNumber === '' || cardName === '' || expiryDate === '' || securityCode === '') {
      toast.error('Please fill in all the required fields')
    } else {
      navigate('/thank-you')
    }
  }

  return (
    <div className='payment-container'>
      <div className='payment-image'>
        {/* <img src={PaymentImg} alt='Payment' /> */}
      </div>
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Payment Checkout</h2>
          <p>Please enter your payment details below.</p>
        </div>
        <div className="payment-form-container">
          <div className="payment-left-image">
            <img src={PaymentImg} alt='Left Image' />
          </div>
          <form className="payment-form">
            <div className="input-group">
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" required />
            </div>
            <div className="input-group">
              <label htmlFor="card-name">Name on Card</label>
              <input type="text" id="card-name" required />
            </div>
            <div className="input-group">
              <label htmlFor="expiry-date">Expiry Date</label>
              <input type="text" id="expiry-date" placeholder="MM / YY" required />
            </div>
            <div className="input-group">
              <label htmlFor="security-code">Security Code</label>
              <input type="text" id="security-code" required />
            </div>
            <div className="input-group">
              <button onClick={Booked} type="submit" className="payment-button">Pay Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Gateway;
