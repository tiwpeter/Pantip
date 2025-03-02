// Import necessary types from React
import type { ReactNode } from 'react';
import React from 'react';

import Nab from './nab/nab';
import Nav from './nav/nav';
import StickyNav from './scollnavstink/scollnavstink';

// Define the interface for props
interface BaseTemplateProps {
  children?: ReactNode; // ReactNode type to support any valid React children
}

// Main layout component
const BaseTemplate: React.FC<BaseTemplateProps> = (props) => {
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <div className="mx-auto flex min-h-screen flex-col bg-blue-200">
        {/* Nav */}
        <Nav />
        <Nab />
        <StickyNav />
        <main className="flex grow justify-center bg-blue-200">
          <section className="w-[1078px] grow justify-center">
            {props.children}
            {/* = <ClientComponent/> */}
          </section>
        </main>
      </div>
    </div>
  );
};

export { BaseTemplate };
