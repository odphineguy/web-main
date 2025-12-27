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

// Define pricing plans with their details
const PRICING_PLANS = {
  // Main packages (one-time)
  starter: {
    name: 'Starter Chatbot',
    price: 49900, // $499.00 in cents
    description: 'Custom AI Chatbot with 24/7 Lead Capture, Basic Analytics, Email Integration, and Limited Support',
    mode: 'payment' as const,
  },
  business: {
    name: 'Business Web & AI Chatbot',
    price: 149900, // $1,499.00 in cents
    description: 'Custom Website (up to 5 pages), AI Chatbot, Basic SEO, Email Integration, and 30-day Support',
    mode: 'payment' as const,
  },
  professional: {
    name: 'Professional Web & App',
    price: 350000, // $3,500.00 in cents
    description: 'Custom Website & App Design with SEO Optimization, Advanced Chatbot Integration, CMS, Priority Support, and Dedicated Project Manager',
    mode: 'payment' as const,
  },
  // Add-on packages
  'seo-maintenance': {
    name: 'SEO Maintenance',
    price: 9900, // $99.00 in cents
    description: 'Monthly SEO audit, keyword monitoring, performance reports, and content optimization tips',
    mode: 'subscription' as const,
    interval: 'month' as const,
  },
  'social-media': {
    name: 'Social Media Management',
    price: 9900, // $99.00 in cents
    description: '1 weekly post, content creation, platform management, and engagement monitoring',
    mode: 'subscription' as const,
    interval: 'month' as const,
  },
  'new-website': {
    name: 'New Website',
    price: 9900, // $99.00 in cents
    description: 'Up to 5 pages, mobile responsive design, basic SEO setup, and contact form included',
    mode: 'payment' as const,
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

    // Build price_data based on whether it's a subscription or one-time payment
    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
      currency: 'usd',
      product_data: {
        name: plan.name,
        description: plan.description,
      },
      unit_amount: plan.price,
    };

    // Add recurring interval for subscriptions
    if (plan.mode === 'subscription' && 'interval' in plan) {
      priceData.recurring = {
        interval: plan.interval,
      };
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: priceData,
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
