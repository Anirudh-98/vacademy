const logos = [
  'Google', 'Microsoft', 'Meta', 'Amazon', 'Apple', 'Netflix',
  'Spotify', 'Stripe', 'Airbnb', 'IBM', 'Adobe', 'Shopify',
]

export default function SocialProof() {
  const doubled = [...logos, ...logos]

  return (
    <section className="py-14 bg-[#F9FAFB] border-y border-purple-100 overflow-hidden">
      <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
        Trusted by learners at world-class companies
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-10 flex-shrink-0"
            >
              <span className="text-lg font-black text-gray-300 hover:text-[#6D28D9] transition-colors tracking-tight whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
