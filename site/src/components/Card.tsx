import React from 'react'
import Event from './../events'

interface CardProps  {
    event: Event
}

const Card = ({event}: CardProps) => {

    return (
        <div className="w-full h-full p-4 box-border">
            <div className="relative w-full h-128 flex flex-col items-center justify-center border rounded-lg overflow-hidden">
                <img className="w-full h-128 object-cover" src={event.image} alt={event.name} />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-50 text-white">
                    <h1 className="text-lg font-bold">{event.name}</h1>
                    <h2 className="text-sm">{event.startDate.toString()}</h2>
                </div>
            </div>
        </div>
    )
}

export default Card