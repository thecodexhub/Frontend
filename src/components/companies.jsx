
export default function TrustedPartners() {
  return (
    <div id="features" className="w-full bg-black text-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold tracking-tight text-white">Our Trusted Partners</h2>
          <p className="text-gray-400 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu nunc amet, elit aliquam ullamcorper id id.
            Sed sit enim ullamcorper nunc, nec.
          </p>
          
        </div>
        <div className="grid grid-cols-3 gap-8">
          {/* Row 1 */}
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo1.jpeg"
              alt="Descript"
              className="h-14 w-auto object-contain "
            />
          </div>
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo2.jpeg"
              alt="Spotify"
              className="h-14 w-auto object-contain "
            />
          </div>
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo3.jpeg"
              alt="Slack"
              className="h-14 w-auto object-contain "
            />
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo4.png"
              alt="Discord"
              className="h-14 w-auto object-contain "
            />
          </div>
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo5.png"
              alt="Tinder"
              className="h-14 w-auto object-contain "
            />
          </div>
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo6.png"
              alt="Stripe"
              className="h-14 w-auto object-contain "
            />
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo7.png"
              alt="Docker"
              className="h-14 w-auto object-contain "
            />
          </div>
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo8.png"
              alt="PayPal"
              className="h-14 w-auto object-contain "
            />
          </div>
          <div className="flex items-center justify-center bg-gray-900 p-1 w-32  rounded-lg h-20">
            <img
              src="/logos/logo9.png"
              alt="Pipedrive"
              className="h-14 w-auto object-contain "
            />
          </div>
        </div>
      </div>
    </div>
  )
}

