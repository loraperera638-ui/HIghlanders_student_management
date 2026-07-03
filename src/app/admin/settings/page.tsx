'use client';

import { useEffect, useState } from 'react';
import { Save, Upload, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Settings, SocialMediaLink } from '@/types';

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // TODO: Implement settings API
      const mockSettings: Settings = {
        _id: '1',
        clubName: 'Highlanders Amateur Taekwondo CIC',
        vision: 'To be the leading Taekwondo community in Scotland',
        mission: 'To provide high-quality Taekwondo instruction in a safe, inclusive environment',
        description: 'Professional Taekwondo training and community development',
        masters: [],
        contactInfo: {
          address: '123 Highland Avenue, Edinburgh, EH1 2YZ, Scotland',
          phone: '+44 131 234 5678',
          email: 'info@highlanderstkd.com',
        },
        socialMedia: [
          { platform: 'Facebook', icon: 'facebook', url: 'https://facebook.com/highlanderstkd', isEnabled: true },
          { platform: 'Instagram', icon: 'instagram', url: 'https://instagram.com/highlanderstkd', isEnabled: true },
          { platform: 'Twitter', icon: 'twitter', url: 'https://twitter.com/highlanderstkd', isEnabled: true },
          { platform: 'YouTube', icon: 'youtube', url: 'https://youtube.com/highlanderstkd', isEnabled: true },
        ],
        operatingHours: {
          monday: '16:00 - 21:30',
          tuesday: '16:00 - 21:30',
          wednesday: '16:00 - 21:30',
          thursday: '16:00 - 21:30',
          friday: '16:00 - 21:30',
          saturday: '09:00 - 14:00',
          sunday: 'Closed',
        },
        membershipFees: {
          monthly: 45,
          quarterly: 125,
          yearly: 450,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setSettings(mockSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      // TODO: Implement settings update API
      console.log('Saving settings:', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateContactInfo = (field: keyof NonNullable<typeof settings>['contactInfo'], value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      contactInfo: {
        ...settings.contactInfo!,
        [field]: value,
      },
    });
  };

  const updateSocialMedia = (index: number, field: keyof SocialMediaLink, value: string) => {
    if (!settings) return;
    const newSocialMedia = [...settings.socialMedia];
    newSocialMedia[index] = {
      ...newSocialMedia[index],
      [field]: value,
    };
    setSettings({
      ...settings,
      socialMedia: newSocialMedia,
    });
  };

  const updateOperatingHours = (day: keyof NonNullable<typeof settings>['operatingHours'], value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      operatingHours: {
        ...settings.operatingHours!,
        [day]: value,
      },
    });
  };

  const updateMembershipFees = (period: keyof NonNullable<typeof settings>['membershipFees'], value: number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      membershipFees: {
        ...settings.membershipFees!,
        [period]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading settings...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">No settings found.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Club Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Club Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Club Name
              </label>
              <input
                type="text"
                value={settings.clubName}
                onChange={(e) => setSettings({ ...settings, clubName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-primary-sunset" />
            Contact Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Address
              </label>
              <textarea
                rows={2}
                value={settings.contactInfo.address}
                onChange={(e) => updateContactInfo('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.contactInfo.phone}
                  onChange={(e) => updateContactInfo('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={settings.contactInfo.email}
                  onChange={(e) => updateContactInfo('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Social Media Links</h2>
          
          <div className="space-y-4">
            {settings.socialMedia.map((social, index) => (
              <div key={social.platform} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {social.platform === 'Facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                  {social.platform === 'Instagram' && <Instagram className="w-5 h-5 text-pink-600" />}
                  {social.platform === 'Twitter' && <Twitter className="w-5 h-5 text-sky-500" />}
                  {social.platform === 'YouTube' && <Youtube className="w-5 h-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
                    placeholder={`${social.platform} URL`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Operating Hours</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.operatingHours).map(([day, hours]) => (
              <div key={day}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {day}
                </label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => updateOperatingHours(day as keyof typeof settings.operatingHours, e.target.value)}
                  placeholder="e.g., 09:00 - 17:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Membership Fees */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Membership Fees</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly (£)
              </label>
              <input
                type="number"
                value={settings.membershipFees.monthly}
                onChange={(e) => updateMembershipFees('monthly', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarterly (£)
              </label>
              <input
                type="number"
                value={settings.membershipFees.quarterly}
                onChange={(e) => updateMembershipFees('quarterly', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yearly (£)
              </label>
              <input
                type="number"
                value={settings.membershipFees.yearly}
                onChange={(e) => updateMembershipFees('yearly', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-sunset focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
