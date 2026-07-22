'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaRegStar, FaStar } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const realReviews = [
  {
    text: 'আমাদের রিয়েল এস্টেট প্রজেক্টের ভিডিওগুলো অত্যন্ত প্রফেশনাল ছিল। তাদের কাজের মান এবং ডিটেইলস আমাদের ব্র্যান্ড ভ্যালু অনেক বাড়িয়ে দিয়েছে। আমরা তাদের সার্ভিসে খুবই সন্তুষ্ট',
    author: 'Mahbud Hasan Sobuj',
    position: 'Senior Manager, Perfect Living Properties Ltd.',
    rating: 5,
    image: 'https://i.ibb.co.com/RTMWcnmF/perfect.jpg',
  },
  {
    text: 'খুবই ভালো উদ্যোগ ভাই,,দোয়া করি সামনে এগিয়ে যান। পাশে আছি...🥰 ইনশাআল্লাহ। ❤️',
    author: 'MD Sakib Khan',
    position: 'Founder, Chowkat',
    rating: 5,
    image: 'https://i.ibb.co.com/WvLsMw74/chowkat.jpg',
  },
  {
    text: 'শিক্ষামূলক ভিডিওগুলোকে এতো সুন্দরভাবে প্রেজেন্ট করার জন্য ধন্যবাদ। জটিল বিষয়গুলো ভিজ্যুয়ালের মাধ্যমে খুব সহজ হয়ে উঠেছে, যা স্টুডেন্টদের কাছে অনেক জনপ্রিয় হয়েছে',
    author: 'Nahid Hasan',
    position: 'Founder, Nahid Biology',
    rating: 5,
    image: 'https://i.ibb.co.com/spNyvRQg/nb.jpg',
  },
  {
    text: 'অনেক অনেক শুভকামনা Delta Digivast এর সাথে আপনাদের পথচলা সুন্দর হোক❤️',
    author: 'Md Al Amin',
    position: 'Ceo,Rajshahi Florist',
    rating: 5,
    image: 'https://i.ibb.co.com/vxxywgx0/rajshahi-florist.jpg',
  },
  {
    text: 'আমাদের সার্ভিস প্রোমো ভিডিওটি এক কথায় চমৎকার হয়েছে। তারা আমাদের ব্যবসার মূল বিষয়গুলো খুব দারুণভাবে ফুটিয়ে তুলেছে। হাইলি রেকমেন্ডেড',
    author: 'Md Nayeem Hasan',
    position: 'Owner, Rajshahi Cooling Refrigeration',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    text: 'আরো এগিয়ে যান সফলতার পথে সবসময় অফুরন্ত ভালোবাসা থাকবে ❤️',
    author: 'Abid Hasan Rakib',
    position: 'Satisfied Client',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

const ClientReview = () => {
  return (
    <div className="container mx-auto px-4   transition-colors duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Client Reviews
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          আমাদের কাজের মান সম্পর্কে ক্লায়েন্টরা যা বলছেন
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={800}
        loop={true}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="client-review-swiper"
      >
        {realReviews.map((review, idx) => (
          <SwiperSlide key={idx} className="">
            <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-2xl relative border border-gray-100 dark:border-white/10 h-full flex flex-col justify-between min-h-[380px] transition-all hover:border-[#6efd0b]/30">
              <FaQuoteLeft className="absolute top-6 left-6 text-2xl text-[#6efd0b]/30" />

              <div className="flex justify-center mb-6">
                <img
                  src={review.image}
                  alt={review.author}
                  className="w-[90px] h-[90px] object-cover rounded-full border-4 border-[#6efd0b]/20"
                  onError={e => {
                    e.currentTarget.src =
                      'https://randomuser.me/api/portraits/lego/1.jpg';
                  }}
                />
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-[0.95rem] leading-relaxed text-center italic">
                &quot;{review.text}&quot;
              </p>

              <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {review.author}
                </h3>
                <p className="text-[#6efd0b] text-sm font-medium mb-3">
                  {review.position}
                </p>
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} className="text-sm text-yellow-400" />
                  ))}
                </div>
              </div>

              <FaQuoteLeft className="absolute bottom-6 right-6 rotate-180 text-2xl text-[#6efd0b]/30" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        :global(.client-review-swiper .swiper-pagination-bullet) {
          background: #6efd0b !important;
          opacity: 0.3;
        }
        :global(.client-review-swiper .swiper-pagination-bullet-active) {
          background: #6efd0b !important;
          opacity: 1;
          width: 25px;
          border-radius: 5px;
          transition: width 0.3s ease;
        }
        :global(.swiper-pagination) {
          position: relative !important;
        }
      `}</style>
    </div>
  );
};

export default ClientReview;
