'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const ContactSection = () => {
  // Mock data - this will come from the API
  const contactInfo = {
    address: '123 Highland Avenue, Edinburgh, EH1 2YZ, Scotland',
    phone: '+44 131 234 5678',
    email: 'info@highlanderstkd.com',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2238.123456789!2d-3.200000!3d55.950000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU3JzAwLjAiTiAzcwrJMTInMDAuMCJF!5e0!3m2!1sen!2suk!4v1234567890',
  };

  const socialMedia = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'bg-blue-600' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'bg-gradient-to-br from-purple-600 to-pink-600' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'bg-sky-500' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'bg-red-600' },
  ];

  return (
    <section id="contact" className="section-gradient py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-athletic">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us to learn more about our classes, schedule a trial session, or ask any questions about our programs.
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 font-athletic text-gray-900">
                Get in Touch
              </h3>
              
              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-sunset to-[#FF3E00] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-sunset to-[#FF3E00] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-sunset to-[#FF3E00] rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-gray-900">Follow Us</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialMedia.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center text-white`}>
                      <social.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-xl font-semibold mb-4 text-gray-900">Operating Hours</h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">16:00 - 21:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full min-h-[400px]"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Highlanders Taekwondo Location"
                className="min-h-[400px]"
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-athletic">
              Ready to Start Your Taekwondo Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join us for a free trial class and experience the Highlanders difference. 
              No experience necessary – all skill levels welcome!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Schedule Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                Call Us Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
