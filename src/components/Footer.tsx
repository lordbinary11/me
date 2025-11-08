'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'www.linkedin.com/in/mujahid-shahid-777a78238',
      icon: (
        <img src="/linked.png" alt="LinkedIn" className="w-5 h-5" />
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com/lordbinary11',
      icon: (
        <img src="/ghub.png" alt="GitHub" className="w-5 h-5" />
      ),
    },
    {
      name: 'Twitter/X',
      href: 'https://x.com/lord_binary_',
      icon: (
        <img src="/x.png" alt="X" className="w-5 h-5" />
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/lordbinary11/',
      icon: (
        <img src="/insta.png" alt="Instagram" className="w-5 h-5" />
      ),
    },
    {
      name: 'Fcebook',
      href: 'https://www.instagram.com/lordbinary11/',
      icon: (
        <img src="/fb.png" alt="Facebook" className="w-5 h-5" />
      ),
    },
  ];

  return (
    <footer className="bg-[#1f1f1f] dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-400 leading-relaxed">
            I build cool things, break them accidentally, and then pretend it was all part of the plan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-[#ff6b6b] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-[#ff6b6b] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-400 hover:text-[#ff6b6b] transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-[#ff6b6b] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#ff6b6b] transition-all duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Lord Binary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

