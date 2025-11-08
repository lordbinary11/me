'use client';

import { useEffect, useState } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';
      const form = new FormData();
      form.append('access_key', accessKey);
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('subject', formData.subject || 'New Message from Portfolio');
      form.append('message', formData.message);
      form.append('from_name', 'Portfolio Contact Form');
      form.append('replyto', formData.email);
      form.append('botcheck', '');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
        headers: {
          Accept: 'application/json',
        },
      });

      const json = await res.json();
      if (json.success) {
        setStatus({ ok: true, message: 'Thanks! Your message was sent successfully.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ ok: false, message: json.message || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setStatus({ ok: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: (
        // Email icon
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5v-9A2.25 2.25 0 014.5 5.25h15a2.25 2.25 0 012.25 2.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5l8.484 5.656c.31.207.722.207 1.032 0L21 7.5" />
        </svg>
      ),
      title: 'Email',
      value: 'mujahidshahid72@gmail.com',
      link: 'mailto:mujahidshahid72@gmail.com',
    },
    {
      icon: (
        // Phone icon
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h2.047c.47 0 .905.263 1.123.684L9.6 7.8a1.25 1.25 0 01-.27 1.45l-1.1 1.1a13.5 13.5 0 005.42 5.42l1.1-1.1a1.25 1.25 0 011.45-.27l2.616 1.93c.421.218.684.653.684 1.123V19.5a2.25 2.25 0 01-2.25 2.25h-.75C8.266 21.75 2.25 15.734 2.25 8.25v-.75z" />
        </svg>
      ),
      title: 'Phone',
      value: '+233 (55) 968-1714',
      link: 'tel:+233559681728',
    },
    {
      icon: (
        // Location pin icon
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5-4.2-7.5-7.8-7.5-11.25A7.5 7.5 0 1119.5 9.75C19.5 13.2 16.5 16.8 12 21z" />
          <circle cx="12" cy="9.75" r="2.25" />
        </svg>
      ),
      title: 'Location',
      value: 'Kumasi, Ghana',
      link: '#',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-16 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f1f1f] dark:text-white mb-4 transition-colors">
            Get In <span className="text-[#ff6b6b]">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-[#ff6b6b] mx-auto mb-6"></div>
          <p className="text-lg text-[#666666] dark:text-gray-300 max-w-2xl mx-auto transition-colors">
            Have a project in mind? I'd love to hear from you. Let's work
            together to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-8 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            <div>
              <h3 className="text-2xl font-bold text-[#1f1f1f] dark:text-white mb-6 transition-colors">
                Contact Information
              </h3>
              <p className="text-[#666666] dark:text-gray-300 leading-relaxed mb-8 transition-colors">
                Feel free to reach out to me through any of these channels. I'm
                always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300 group"
                >
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <h4 className="font-semibold text-[#1f1f1f] dark:text-white mb-1 transition-colors">
                      {info.title}
                    </h4>
                    <p className="text-[#666666] dark:text-gray-300 group-hover:text-[#ff6b6b] transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field for Web3Forms (hidden) */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-[#1f1f1f] dark:text-white mb-2 transition-colors"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1f1f1f] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#1f1f1f] dark:text-white mb-2 transition-colors"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1f1f1f] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-[#1f1f1f] dark:text-white mb-2 transition-colors"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1f1f1f] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-[#1f1f1f] dark:text-white mb-2 transition-colors"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1f1f1f] dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-4 bg-[#ff6b6b] text-white font-semibold rounded-full hover:bg-[#ee5a5a] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>

              {status && (
                <p className={`${status.ok ? 'text-green-600' : 'text-red-600'} text-sm`}>{status.message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

