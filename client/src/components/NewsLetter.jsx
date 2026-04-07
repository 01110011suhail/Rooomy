import React from 'react'
import { assets } from '../assets/assets'

const NewsLetter = () => {
  return (
    <section className="relative max-w-6xl mx-auto my-32 px-6">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE - CONTENT */}
        <div className="space-y-6">
          <p className="text-sm tracking-widest text-indigo-400 uppercase">
            Exclusive Access
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
            Get insider access to luxury stays & hidden offers
          </h2>

          <p className="text-gray-500 max-w-md leading-relaxed">
            Unlock curated experiences, seasonal deals, and private invites —
            reserved only for our subscribers.
          </p>

          {/* Decorative line */}
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        {/* RIGHT SIDE - FLOATING CARD */}
        <div className="relative">

          <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 border border-gray-100">

            <h3 className="text-xl font-medium text-gray-900">
              Join the inner circle
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              No spam. Only premium updates.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
              />

              <button className="w-full flex items-center justify-center gap-2 
              bg-gray-900 text-white py-3 rounded-lg hover:bg-black 
              transition-all active:scale-95 group">

                Subscribe

                <img
                  src={assets.arrowIcon}
                  alt="arrow"
                  className="w-4 invert group-hover:translate-x-1 transition"
                />
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              By joining, you agree to receive occasional curated emails.
              You can unsubscribe anytime.
            </p>
          </div>

          {/* Floating accent */}
          <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-indigo-500/20 blur-2xl rounded-full"></div>
        </div>

      </div>
    </section>
  )
}

export default NewsLetter