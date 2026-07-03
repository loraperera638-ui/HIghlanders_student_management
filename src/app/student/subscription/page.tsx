'use client';

import { useEffect, useState } from 'react';
import { CreditCard, Check, X, AlertCircle, Crown, Star } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  current?: boolean;
}

export default function StudentSubscription() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      // TODO: Implement subscription plans API
      const mockPlans: SubscriptionPlan[] = [
        {
          id: 'monthly',
          name: 'Monthly Membership',
          price: 45,
          billingCycle: 'monthly',
          features: [
            'Unlimited classes per month',
            'Access to all equipment',
            'Progress tracking',
            'Email support',
          ],
          current: true,
        },
        {
          id: 'quarterly',
          name: 'Quarterly Membership',
          price: 125,
          billingCycle: 'quarterly',
          features: [
            'Unlimited classes per month',
            'Access to all equipment',
            'Progress tracking',
            'Priority email support',
            '10% discount on workshops',
            'Free uniform upgrade',
          ],
          isPopular: true,
        },
        {
          id: 'yearly',
          name: 'Yearly Membership',
          price: 450,
          billingCycle: 'yearly',
          features: [
            'Unlimited classes per month',
            'Access to all equipment',
            'Progress tracking',
            'Priority email support',
            '20% discount on workshops',
            'Free uniform upgrade',
            'Private lesson once per month',
            'Competition entry fee waived',
          ],
        },
      ];
      setPlans(mockPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    setSelectedPlan(planId);
    try {
      // TODO: Implement Stripe checkout
      console.log(`Subscribing to plan: ${planId}`);
      alert('Redirecting to payment...');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to process subscription. Please try again.');
    } finally {
      setSelectedPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading subscription plans...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>
      
      {/* Current Subscription Info */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Current Subscription</h2>
            <p className="text-white/90">Monthly Membership - £45/month</p>
            <p className="text-white/80 text-sm">Next payment: May 1, 2024</p>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Active</span>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              plan.isPopular ? 'ring-2 ring-primary-sunset transform scale-105' : ''
            } ${plan.current ? 'ring-2 ring-green-500' : ''}`}
          >
            {plan.isPopular && (
              <div className="bg-gradient-to-r from-primary-sunset to-primary-wave text-white text-center py-2">
                <span className="text-sm font-semibold flex items-center justify-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </span>
              </div>
            )}
            
            {plan.current && (
              <div className="bg-green-500 text-white text-center py-2">
                <span className="text-sm font-semibold flex items-center justify-center">
                  <Check className="w-4 h-4 mr-1" />
                  Current Plan
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-gray-600 ml-1">/{plan.billingCycle}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={plan.current || selectedPlan === plan.id}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  plan.current
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : plan.isPopular
                    ? 'bg-gradient-to-r from-primary-sunset to-primary-wave text-white hover:shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } ${selectedPlan === plan.id ? 'opacity-50 cursor-wait' : ''}`}
              >
                {plan.current ? 'Current Plan' : selectedPlan === plan.id ? 'Processing...' : 'Subscribe'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cancellation Info */}
      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Subscription Management</h3>
            <p className="text-yellow-700">
              You can cancel your subscription at any time. Cancellations will take effect at the end of your current billing period.
              No refunds are provided for partial months. You can also change your plan at any time, with prorated billing.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-primary-sunset" />
          Payment Methods
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Default</span>
              <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
            </div>
          </div>
          
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
            + Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}
