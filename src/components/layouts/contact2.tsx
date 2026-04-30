'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast, Toaster } from 'sonner';

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
  address?: string; // New prop added
  className?: string;
}

const Contact2 = ({
  title = 'যোগাযোগ করুন',
  description = 'আপনার ব্যবসা বা প্রজেক্ট নিয়ে আমাদের সাথে সরাসরি কথা বলুন। রাজশাহীতে আপনার ডিজিটাল যাত্রা শুরু করতে আমরা সর্বদা প্রস্তুত।',
  phone = '+88016 3236 3235',
  email = 'help@deltadigivast.com',
  web = { label: 'deltadigivast.vercel.app', url: 'https://deltadigivast.vercel.app' },
  address = '৪৯/২ রাজিব চত্ত্বর, ওল্ড শিমলা, বোয়ালিয়া, রাজশাহী।',
  className,
}: Contact2Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      from: 'Homepage Contact Form',
      company: formData.get('message'), 
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/leads`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error('Failed to submit');

      if (res.ok) {
        toast.success('ধন্যবাদ! আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে।');
        form.reset();
      } else {
        toast.error('দুঃখিত, মেসেজ পাঠানো সম্ভব হয়নি। আবার চেষ্টা করুন।');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('সার্ভারে সমস্যা হচ্ছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={cn('py-20 bg-white dark:bg-black transition-colors duration-300', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:gap-20">
          
          {/* Left Side - Contact Details */}
          <div className="flex max-w-md flex-col gap-10">
            <div>
              <h1 className="mb-4 text-4xl font-bold lg:text-5xl text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-[#6efd0b] pl-4">কন্টাক্ট ডিটেইলস</h3>
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="font-bold text-sm text-[#6efd0b] uppercase tracking-wider">Phone & WhatsApp</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{phone}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-sm text-[#6efd0b] uppercase tracking-wider">Email</span>
                  <a href={`mailto:${email}`} className="text-gray-700 dark:text-gray-300 hover:text-[#6efd0b] transition-colors">
                    {email}
                  </a>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-sm text-[#6efd0b] uppercase tracking-wider">Address</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{address}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-sm text-[#6efd0b] uppercase tracking-wider">Website</span>
                  <a href={web.url} target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-[#6efd0b] transition-colors text-sm">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <form
            onSubmit={handleSubmit}
            className="grid w-full max-w-3xl grid-cols-2 gap-6 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 md:p-10 bg-gray-50/50 dark:bg-white/5 shadow-sm"
          >
            {/* Name */}
            <div className="grid gap-2 col-span-2 md:col-span-1">
              <Label htmlFor="name" className="text-sm font-semibold">আপনার নাম</Label>
              <Input
                name="name"
                type="text"
                id="name"
                placeholder="নাম লিখুন"
                required
                className="bg-white dark:bg-black"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2 col-span-2 md:col-span-1">
              <Label htmlFor="email" className="text-sm font-semibold">ইমেইল</Label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="example@mail.com"
                required
                className="bg-white dark:bg-black"
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2 col-span-2 md:col-span-1">
              <Label htmlFor="phone" className="text-sm font-semibold">ফোন নম্বর</Label>
              <Input
                name="phone"
                type="text"
                id="phone"
                placeholder="017XXXXXXXX"
                required
                className="bg-white dark:bg-black"
              />
            </div>

            {/* Address Input */}
            <div className="grid gap-2 col-span-2 md:col-span-1">
              <Label htmlFor="address" className="text-sm font-semibold">ঠিকানা (ঐচ্ছিক)</Label>
              <Input
                name="address"
                type="text"
                id="address"
                placeholder="আপনার শহর/এলাকা"
                className="bg-white dark:bg-black"
              />
            </div>

            {/* Message */}
            <div className="grid gap-2 col-span-2">
              <Label htmlFor="message" className="text-sm font-semibold">মেসেজ / প্রজেক্ট ডিটেইলস</Label>
              <Textarea
                name="message"
                id="message"
                placeholder="আপনার প্রজেক্ট সম্পর্কে লিখুন..."
                required
                className="bg-white dark:bg-black min-h-[120px]"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full col-span-2 py-6 bg-[#6efd0b] text-gray-900 font-bold text-lg hover:bg-[#4fd100] transition-all shadow-lg shadow-[#6efd0b]/20"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  পাঠানো হচ্ছে...
                </span>
              ) : (
                'মেসেজ পাঠান →'
              )}
            </Button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </section>
  );
};

export { Contact2 };
