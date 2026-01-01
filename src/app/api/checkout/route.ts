import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy initialization - only create Stripe instance when needed (at runtime, not build time)
function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(apiKey, {
    apiVersion: '2025-11-17.clover',
  });
}

// Define pricing plans with Stripe Price IDs
const PRICING_PLANS = {
  // Main packages (one-time)
  starter: {
    name: 'Starter',
    priceId: 'price_1SkjChPhokLWRBHmTdzQ2uoz',
    mode: 'payment' as const,
  },
  business: {
    name: 'Business',
    priceId: 'price_1SkjDHPhokLWRBHmkcQo203j',
    mode: 'payment' as const,
  },
  professional: {
    name: 'Professional',
    priceId: 'price_1SkjDwPhokLWRBHmqv5dXybg',
    mode: 'payment' as const,
  },
  // Add-ons (one-time)
  bilingual: {
    name: 'Bilingual Add-on',
    priceId: 'price_1SkjElPhokLWRBHmgRv7LL26',
    mode: 'payment' as const,
  },
  // Monthly subscriptions
  'seo-maintenance': {
    name: 'SEO Maintenance',
    priceId: 'price_1SkjFpPhokLWRBHmS1KyccIA',
    mode: 'subscription' as const,
  },
  'social-media': {
    name: 'Social Media Management',
    priceId: 'price_1SkjH1PhokLWRBHmtES8GFbB',
    mode: 'subscription' as const,
  },
  'website-care': {
    name: 'Website Care Plan',
    priceId: 'price_1SkjIXPhokLWRBHmgVwoT6b6',
    mode: 'subscription' as const,
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
    const stripe = getStripe();

    // Create a Stripe Checkout Session using pre-defined Price IDs
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: plan.mode,
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
