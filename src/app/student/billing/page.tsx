'use client';

import { useEffect, useState } from 'react';
import { Download, FileText, CreditCard, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

interface BillingRecord {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  invoiceUrl?: string;
  receiptUrl?: string;
}

export default function StudentBilling() {
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillingRecords();
  }, []);

  const fetchBillingRecords = async () => {
    try {
      // TODO: Implement billing records API
      const mockRecords: BillingRecord[] = [
        {
          id: '1',
          date: '2024-04-01',
          amount: 45,
          status: 'paid',
          description: 'Monthly Membership - April 2024',
          invoiceUrl: '#',
          receiptUrl: '#',
        },
        {
          id: '2',
          date: '2024-03-01',
          amount: 45,
          status: 'paid',
          description: 'Monthly Membership - March 2024',
          invoiceUrl: '#',
          receiptUrl: '#',
        },
        {
          id: '3',
          date: '2024-02-01',
          amount: 45,
          status: 'paid',
          description: 'Monthly Membership - February 2024',
          invoiceUrl: '#',
          receiptUrl: '#',
        },
        {
          id: '4',
          date: '2024-05-01',
          amount: 45,
          status: 'pending',
          description: 'Monthly Membership - May 2024',
          invoiceUrl: '#',
        },
      ];
      setBillingRecords(mockRecords);
    } catch (error) {
      console.error('Error fetching billing records:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading billing records...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Billing & Payments</h1>
      
      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">This Month</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">£45</h3>
          <p className="text-sm text-gray-600">Monthly membership</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Next Payment</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">May 1</h3>
          <p className="text-sm text-gray-600">5 days remaining</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Payment Method</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">•••• 4242</h3>
          <p className="text-sm text-gray-600">Visa ending in 4242</p>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Billing History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    £{record.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(record.status)}
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {record.invoiceUrl && (
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          Invoice
                        </button>
                      )}
                      {record.receiptUrl && (
                        <button className="text-green-600 hover:text-green-900 flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Receipt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
        
        <div className="space-y-6">
          {/* Auto-pay Settings */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-3">Automatic Payments</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700">Enable automatic payments for your membership</p>
                <p className="text-sm text-gray-500">Payments will be automatically charged 3 days before due date</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium mb-3">Payment Method</h3>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Visa •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                Change
              </button>
            </div>
          </div>

          {/* Billing Notifications */}
          <div>
            <h3 className="text-lg font-medium mb-3">Billing Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Payment reminders</p>
                  <p className="text-sm text-gray-500">Receive email reminders before payment due date</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Payment confirmations</p>
                  <p className="text-sm text-gray-500">Receive email when payment is processed</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
