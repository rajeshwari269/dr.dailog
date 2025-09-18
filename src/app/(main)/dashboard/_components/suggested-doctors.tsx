import Image from 'next/image'
import React from 'react'
import { DoctorAgent } from './doctor-card'

type Props = {
  doctorAgent: DoctorAgent
  setSelectedDoctor: (doctor: DoctorAgent) => void
  selectedDoctor: DoctorAgent | null
}

const SuggestedDoctors = ({ doctorAgent, setSelectedDoctor, selectedDoctor }: Props) => {
  const isSelected = selectedDoctor?.id === doctorAgent.id

  return (
    <div
      onClick={() => setSelectedDoctor(doctorAgent)}
      className={`
        flex flex-col items-center justify-center gap-3 
        border-2 
        rounded-xl 
        p-5 
        transition-all 
        duration-200 
        cursor-pointer 
        w-48
        h-56
        bg-white
        dark:bg-zinc-800
        shadow-sm
        hover:shadow-lg
        ${isSelected ?
          'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/30 shadow-emerald-500/20' :
          'border-zinc-200 dark:border-zinc-700 hover:border-emerald-400'
        }
        hover:scale-[1.02]
        overflow-hidden
        relative
        group
      `}
    >
      <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity
        ${isSelected ? 'bg-emerald-500' : 'bg-emerald-400'}`} />

      <div className={`relative z-10 rounded-full p-1 transition-all duration-300
        ${isSelected ?
          'ring-2 ring-emerald-500 ring-offset-2' :
          'group-hover:ring-1 group-hover:ring-emerald-400'
        }`}>
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover border border-white dark:border-zinc-700"
        />
      </div>

      <div className="relative z-10 text-center space-y-1">
        <h2 className="font-medium text-base text-emerald-800 dark:text-emerald-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
          {doctorAgent.name}
        </h2>
        <p className="text-xs text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {doctorAgent.specialist}
        </p>
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
      )}
    </div>
  )
}

export default SuggestedDoctors