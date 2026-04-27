'use client'

type HeroSwitcherProps = {
  activeHero: 'center' | 'left' | 'image'
  onSwitch: (hero: 'center' | 'left' | 'image') => void
}

export const HeroSwitcher = ({ activeHero, onSwitch }: HeroSwitcherProps) => {
  const heroes = [
    { id: 'center', name: 'Hero Center', icon: '🎯', description: 'SaaS, Digital Product' },
    { id: 'left', name: 'Hero Left', icon: '📝', description: 'Agency, Consultant' },
    { id: 'image', name: 'Hero With Image', icon: '🖼️', description: 'E-commerce, App' },
  ] as const

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-2 flex gap-2">
        {heroes.map((hero) => (
          <button
            key={hero.id}
            onClick={() => onSwitch(hero.id)}
            className={`
              px-5 py-3 rounded-xl transition-all duration-200 text-left
              ${activeHero === hero.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{hero.icon}</span>
              <div>
                <div className="font-semibold text-sm">{hero.name}</div>
                <div className={`text-xs ${activeHero === hero.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {hero.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}