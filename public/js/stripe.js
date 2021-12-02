/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51K1wIxEt2dnaChYUp6oA4g9p8pg2YzYUD4aRcdEt1LOzMplmfWGtu0nCpsEGcWGQLznuq19BP2ET158J2N77q2GE00PInB44HY'
);

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8080/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
