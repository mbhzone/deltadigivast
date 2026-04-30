<div className="absolute inset-0 opacity-5">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#6efd0b] rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-6">
        <Camera size={16} />
        Professional Graphics Design
      </span>

      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        আপনার Brand-এর জন্য Creative 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6efd0b] to-[#2e9e00]">
          {' '}
          Graphics Design 
        </span>
      </h1>

      <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10">
        Logo থেকে social media post, banner থেকে packaging — আপনার business-এর visual identity 
        আমরাই তৈরি করি। রাজশাহীর সব ধরনের business-এর জন্য।
        extraordinary memories.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button className="px-8 py-4 bg-[#6efd0b] text-gray-900 rounded-md font-semibold hover:bg-[#4fd100] transition-all duration-200 transform hover:scale-105 shadow-lg shadow-[#6efd0b]/25 flex items-center gap-2">
          <Camera size={18} />
          Design Project শুরু করুন →
        </button>
        <button className="px-8 py-4 bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 rounded-md font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <ImageIcon size={18} />
          View Portfolio
        </button>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800"
              ></div>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Trusted by 100+ clients
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            (4.9/5 from 300+ reviews)
          </span>
        </div>
      </div>
    </div>
  </section>

  {/* Stats Section */}
  <section className="bg-white dark:bg-black py-16 border-y border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#6efd0b]/10 rounded-md mb-3">
              <stat.icon className="w-5 h-5 text-[#6efd0b]" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Services Section */}
  <section className="py-20 bg-white dark:bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#6efd0b]/10 text-[#6efd0b] rounded-full text-sm font-medium mb-4">
          <Sparkles size={16} />
          Our Services
        </span>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          কোন ধরনের Design আমরা করি
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Professional Graphics Design  to your specific needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-black p-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
          >
            <div
              className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <service.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {service.description}
            </p>

            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle className="w-4 h-4 text-[#6efd0b]" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="mt-4 text-[#6efd0b] hover:text-[#4fd100] font-medium text-sm flex items-center gap-1 transition-colors">
              Learn More <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Why Choose Us */}
  <section className="py-20 bg-white dark:bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Us
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          What sets our graphics services apart
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyChooseUs.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-black p-6 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className="w-14 h-14 bg-[#6efd0b]/10 rounded-md flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-[#6efd0b]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Process Section */}
  <section className="py-20 bg-white dark:bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Simple and straightforward process from start to finish
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            step: '01',
            title: ' Project Brief ',
            description: 'শুরুতে আমরা আপনার ব্যবসার লক্ষ্য, টার্গেট অডিয়েন্স এবং ডিজাইনের প্রয়োজনীয়তাগুলো বিস্তারিতভাবে জেনে নেই',
          },
          {
            step: '02',
            title: 'Concept Design ',
            description: 'আপনার ব্রিফ অনুযায়ী আমরা কয়েকটি ইউনিক ডিজাইন কনসেপ্ট বা ড্রাফট তৈরি করি এবং আপনার মতামতের জন্য পাঠাই',
          },
          {
            step: '03',
            title: 'Revisions & Finalization ',
            description: 'আপনার ফিডব্যাক অনুযায়ী আমরা ডিজাইনটিতে প্রয়োজনীয় পরিবর্তন আনি এবং সেটিকে চূড়ান্ত রূপ দেওয়ার কাজ করি',
          },
          {
            step: '04',
            title: 'Final Delivery ',
            description: 'ডিজাইন পছন্দ হলে আমরা সেটির সব ধরণের ফাইল ফরম্যাট (AI, EPS, PNG, PDF) এবং হাই-কোয়ালিটি ভার্সন আপনাকে বুঝিয়ে দেই',
          },
        ].map((item, index) => (
          <div key={index} className="relative">
            <div className="bg-white dark:bg-black p-6 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl font-bold text-[#6efd0b]/20 mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
            {index < 3 && (
              <div className="hidden md:block absolute top-1/2 -right-3 text-[#6efd0b]">
                <ChevronRight size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Pricing Note */}
  <section className="py-12 bg-[#6efd0b]/5 dark:bg-[#6efd0b]/10">
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <Package className="w-12 h-12 text-[#6efd0b] mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Custom Packages Available
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Every project is unique. Contact us for a personalized quote
        tailored to your specific needs.
      </p>
      <button className="px-6 py-3 bg-[#6efd0b] text-gray-900 rounded-md font-semibold hover:bg-[#4fd100] transition-all duration-200">
        Request a Quote
      </button>
    </div>
  </section>

  {/* Contact Section */}
  <section className="py-20 bg-white dark:bg-black">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-3xl p-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Capture Your Moments?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's discuss your photography needs. Get in touch with us
              today for a free consultation.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-[#6efd0b]" />
                <span>+880 1234 567890</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-[#6efd0b]" />
                <span>photography@agency.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-[#6efd0b]" />
                <span>123 Creative Agency Street, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6efd0b]/50"
              ></textarea>
              <button className="w-full py-3 px-6 bg-[#6efd0b] text-gray-900 font-semibold rounded-md hover:bg-[#4fd100] transition-all duration-200">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
