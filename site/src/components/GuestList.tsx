import React, { useState } from 'react';

interface Guest {
  id: number;
  name: string;
  role: string;
  photo: string;
  isFriend: boolean;
  isVIP: boolean;
  username: string;
  friends: number;
  groups: number;
}

interface GuestListProps {
  guestlist: Guest[]
}

const GuestList = ({guestlist}: GuestListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [hoveredGuest, setHoveredGuest] = useState<Guest | null>(null);

  const filteredGuests = guestlist.filter(guest =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'All' || 
     (filter === 'Friends' && guest.isFriend) || 
     (filter === 'VIPs' && guest.isVIP) || 
     (filter === 'Organizer' && guest.role === 'Host')) // Updated condition for Organizer
  );

  const empty = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <svg className="w-16 h-16 text-purple-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
      <h3 className="text-xl font-semibold text-white mb-2">No one's here yet</h3>
      <p className="text-gray-400">It's your big chance! Be the first to join the party.</p>
    </div>
  );

  return (
    <div className="text-white p-4">
      <h2 className="text-4xl font-bold mb-4 text-left">Guest List ({guestlist.length})</h2>
      <div className="mb-4 flex justify-left">
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#5A5142] bg-opacity-50 text-white p-3 rounded-full mb-4 sm: w-full md:w-1/2" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap space-x-2 mb-4">
        {['All', 'Friends', 'Organizer', 'VIPs'].map((filterOption) => (
          <button
            key={filterOption}
            className={`bg-[#5A5142] bg-opacity-50 px-3 py-1 rounded-full mb-2 ${filter === filterOption ? 'bg-white text-black' : 'bg-gray-700'} hover:bg-white hover:text-black`} 
            onClick={() => setFilter(filterOption)}
          >
            {filterOption} {filterOption === 'All' ? '🔥' : filterOption === 'Friends' ? '🤝' : filterOption === 'VIPs' ? '⭐' : '👑'}
          </button>
        ))}
      </div>
      
      {filteredGuests.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGuests.map(guest => (
            <div
              key={guest.id}
              className="relative bg-[#5A5142] bg-opacity-30 p-6 rounded-lg text-center"
              onMouseEnter={() => setHoveredGuest(guest)}
              onMouseLeave={() => setHoveredGuest(null)}
            >
              <img
                src={guest.photo}
                alt={guest.name}
                className="w-32 h-32 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="font-bold text-2xl sm:text-xl">{guest.name}</p>
              <p className="text-base sm:text-sm text-gray-400">{guest.role}</p>
              
              {hoveredGuest === guest && (
    <div className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 bg-[#5A5142] bg-opacity-30 p-4 rounded-lg shadow-lg w-80 z-10 border border-gray-300 backdrop-blur-sm">
    <div className="flex items-center mb-2">
      <img
        src={guest.photo}
        alt={guest.name}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <div>
        <p className="font-bold text-xl text-white">{guest.name}</p>
        <p className="text-sm text-gray-300">@{guest.username}</p>
      </div>
    </div>
    <button className="bg-[#4A412F] text-white text-sm px-3 py-3 rounded-full absolute top-8 right-4">
      Friend +
    </button>
    <div className="flex justify-center mt-4 space-x-8">
      <div>
        <p className="font-bold text-2xl text-white">{guest.friends}</p>
        <p className="text-sm text-gray-300">Friends</p>
      </div>
      <div>
        <p className="font-bold text-2xl text-white">{guest.groups}</p>
        <p className="text-sm text-gray-300">Groups</p>
      </div>
    </div>
  </div>
)}
            </div>
          ))}
        </div>
      ) : (
        empty()
      )}
    </div>
  );
};

export default GuestList;