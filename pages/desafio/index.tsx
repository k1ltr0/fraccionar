import React from "react";

import { Calculator } from "./containers/calculator";

/**
 * Calculator page
 * @returns React.Component
 */
export default function PagesCalculadora() {

  return (
    <main>

      {/* Header */}
      <div className="bg-black py-4"  >
        <div className="max-w-7xl mx-auto px-4" >
          <a href="/desafio">

            {/* Logo */}
            <div className="flex" >
              <svg viewBox="0 0 512 512" fill="none" className="h-8 w-auto"><path d="M10 35C10 21.1929 21.1929 10 35 10H133V133H10V35Z" fill="currentColor"></path><rect x="133" y="133" width="123" height="123" fill="currentColor"></rect><rect x="256" y="256" width="123" height="123" fill="currentColor"></rect><rect x="133" y="379" width="123" height="123" fill="currentColor"></rect><rect x="256" y="10" width="246" height="123" fill="currentColor"></rect></svg>
              <div className="pt-4 text-xs" >Fraccional.cl</div>
            </div>
            {/* /Logo */}

          </a>
        </div>
      </div>
      {/* /Header */}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4" >
        {/* TODO: this exposes api key in the browser. This may be hiiden by adding a proxy api with a faster expiring token */}
        <Calculator apiKey={process.env.API_KEY || ''} />
      </div>
      {/* /Content */}
    </main>
  )
}
