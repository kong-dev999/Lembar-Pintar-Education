const Midtrans = require('midtrans-client');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, amount, customer } = req.body;

    const snap = new Midtrans.Snap({
      isProduction: false,
      // prefer an actual server-only env var for the server key
      serverKey:
        process.env.MIDTRANS_SERVER_KEY || process.env.NEXT_PUBLIC_SECRET || process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY || '',
    });

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      item_details: [
        {
          id: orderId,
          price: amount,
          quantity: 1,
          name: 'Paket Langganan',
        },
      ],
      customer_details: {
        first_name: customer?.name || 'Guest',
        email: customer?.email || '',
      },
    };

    const token = await snap.createTransactionToken(parameter);

    return res.status(200).json({ token });
  } catch (error) {
    console.error('midtrans error', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
