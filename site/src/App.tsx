import { useEffect, useState } from "react";
import "./App.css";
import Event from './events'
import Card from './components/Card'
import { generateEvents, generateEvent, generateRandomUsers } from "./events";
import GuestList from "./components/GuestList";
import EventDetails from "./components/EventDetails";

function App() {
  const [eventList, setEventList] = useState<Event[]>()

  const [event, setEvent] = useState<Event>()
 


  useEffect(() => {
    setEvent(generateEvent(Math.floor(Math.random() * 20) + 1))
  }, []);

  return (
    <div className="bg-gradient-to-b from-custom-gold to-custom-black min-h-screen w-full flex flex-col">
      <div className="flex-grow py-4 md:px-24 md:py-10">
        <div className="max-w-6xl mx-auto">
          {event && (
            <>
              <EventDetails event={event} />
              <GuestList guestlist={event.attendees} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;