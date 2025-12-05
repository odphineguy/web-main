import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

// Define pricing plans with their details (flat one-time prices)
const PRICING_PLANS = {
  starter: {
    name: 'Starter Chatbot',
    price: 150000, // $1,500.00 in cents
    description: 'Custom AI Chatbot with 24/7 Lead Capture, Basic Analytics, Email Integration, and Limited Support',
  },
  professional: {
    name: 'Professional Web & App',
    price: 350000, // $3,500.00 in cents
    description: 'Custom Website & App Design with SEO Optimization, Advanced Chatbot Integration, CMS, Priority Support, and Dedicated Project Manager',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId } = body;

    if (!planId || !PRICING_PLANS[planId as keyof typeof PRICING_PLANS]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS[planId as keyof typeof PRICING_PLANS];

    // Create a Stripe Checkout Session for one-time payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/pricing?success=true&plan=${planId}`,
      cancel_url: `${request.nextUrl.origin}/pricing?canceled=true`,
      metadata: {
        planId,
        planName: plan.name,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
