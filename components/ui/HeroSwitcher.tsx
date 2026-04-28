'use client'

type HeroSwitcherProps = {
  activeHero: 'center' | 'left' | 'image'
  onSwitch: (hero: 'center' | 'left' | 'image') => void
}

export const HeroSwitcher = ({ activeHero, onSwitch }: HeroSwitcherProps) => {
  const heroes = [
    { id: 'center' as const, name: 'Hero Center', icon: '🎯' },
    { id: 'left' as const, name: 'Hero Left', icon: '📝' },
    { id: 'image' as const, name: 'Hero With Image', icon: '🖼️' },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-2 flex gap-2">
        {heroes.map((hero) => (
          <button
            key={hero.id}
            onClick={() => onSwitch(hero.id)}
            className={`
              px-4 py-2 rounded-xl transition-all duration-200
              ${activeHero === hero.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span className="text-xl mr-2">{hero.icon}</span>
            <span className="text-sm font-medium">{hero.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}