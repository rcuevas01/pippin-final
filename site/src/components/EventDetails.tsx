import React from 'react';
import Event  from '../events';

interface EventDetailsProps {
    event: Event
}

const EventDetails = ({ event }: EventDetailsProps) => {
  return (
    <div className="bg-transparent text-white p-6 max-w-7xl mx-auto mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24">
      {/* Image and Buttons Section */}
      <div className="flex flex-col order-1 md:order-2 w-full">
      <div className="relative w-full h-screen md:h-auto mb-6">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Blur */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent md:hidden">
                
                <div className="absolute inset-0 backdrop-blur-md"></div> 
            </div>
          {/* Mobile */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between md:hidden">
            <button className="bg-[#B8860B] text-white px-4 py-4 rounded-2xl flex flex-col items-center justify-center w-[48%]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>0</span>
            </button>
            <button className="bg-[#B8860B] text-white px-4 py-4 rounded-2xl flex items-center justify-center w-[48%]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Desktop */}
        <div className="hidden md:flex justify-between mb-6">
          <button className="bg-[#B8860B] text-white px-4 py-4 rounded-2xl flex flex-col items-center justify-center w-[48%]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>0</span>
          </button>
          <button className="bg-[#B8860B] text-white px-4 py-4 rounded-2xl flex items-center justify-center w-[48%]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        {/* Not Logged In */}
          <div className='my-8 order-2 md:order-3'> {/* Changed order for mobile */}
            <h3 className="text-2xl font-semibold mb-4 text-left">Event Chat</h3>
            <div className="bg-[#5A5142] bg-opacity-30 p-4 rounded-lg">
              <p className="text-center text-xl mb-4"><b>Chat with other attendees</b></p>
              <p className="text-center text-sm mb-4">
                You must be logged in to chat with other attendees.
              </p>
              <button className="bg-[#5A5142] bg-opacity-70 text-white w-1/2 py-4 rounded-full"> 
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* Left Column*/}
        <div className="order-2 md:order-1">
          <h1 className="text-6xl font-bold mb-2 text-left leading-snug">{event.name}</h1>
          {/* Date, Open Invite, etc. */}
          <div className="flex justify-start space-x-2 mb-4">
          <button className="bg-[#B8860B] text-white px-4 py-2 rounded-full text-sm">
              🗓 {`${event.startDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })} - ${event.endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
            </button>
            <button className="bg-[#B8860B] text-white px-4 py-2 rounded-full text-sm">
              🔓 Open Invite
            </button>
          </div>

          <div className="flex justify-start">
            <button className="bg-[#B8860B] text-white px-4 py-2 rounded-full text-sm mb-6">
              📍 RSVP for address
            </button>
          </div>
          

          {/* Hosts */}
          <div className="space-y-2 mb-6">
            {event.hosts.map((host, index) => (
              <div key={index} className="flex items-center justify-between bg-[#5A5142] bg-opacity-30 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={host.photo} alt={host.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{host.name}</p>
                    <p className="text-md text-left">
                    {index === 0 ? 'Host' : 'Cohost'}
                  </p>
                  </div>
                </div>
                <button className="bg-[#4A412F] px-4 py-2 rounded-full text-sm">Friend +</button>
              </div>
            ))}
          </div>
          
          <h3 className="text-2xl font-grey mb-2 text-left">Description</h3>
          <p className="text-md mb-6 text-left">
            {event.description}
          </p>
          {/* Tickets */}
          <div className='mt-10'>
          <h3 className="text-xl font-semibold mb-2 text-left">Tickets</h3>
          <div className="bg-[#5A5142] bg-opacity-30 p-3 rounded-lg relative flex flex-row justify-between">
  <div className="absolute left-0 top-1/2 w-1.5 h-3 bg-[#2A2317] -translate-y-1/2 rounded-r-full"></div>
  <div className="absolute right-0 top-1/2 w-1.5 h-3 bg-[#2A2317] -translate-y-1/2 rounded-l-full"></div>
  <div className="flex flex-row justify-between w-full">
    <div className="flex flex-col items-start w-2/3 pr-2">
      <div className="flex items-center mb-4">
        <div className="bg-purple-500 bg-opacity-50 px-3 py-2 ml-2 rounded-md border border-purple-700">
          <p className="font-bold text-sm">${(event.price / 100).toFixed(2)}</p>
        </div>
        <p className="text-sm ml-3"><i>{event.ticketsLeft} tickets left</i></p>
      </div>
      <p className="text-md mb-1">FREE ENTRY</p>
      <p className="text-sm text-gray-400 text-left"><i>Closes {event.endDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</i></p>
    </div>
    <div className="flex flex-col items-end w-1/3 pl-2 py-5">
      <button className="bg-[#5A5142] bg-opacity-30 text-white w-full py-3 px-1 rounded-full text-xs font-semibold">RSVP</button>
    </div>
  </div>
</div>
</div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;