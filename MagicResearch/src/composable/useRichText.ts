import type { Ref } from 'vue'

export function useRichText(size: Ref<number | undefined, number | undefined>) {
  const map: Record<string, { name: string; icon: string }> = {
    water: {
      name: 'Eau',
      icon: '/icones/water.png',
    },
    fire: {
      name: 'Feu',
      icon: '/icones/fire.png',
    },
    mana: {
      name: 'Mana',
      icon: '/icones/mana.png',
    },
    coins: {
      name: 'Or',
      icon: '/icones/coin.png',
    },
    stone: {
      name: 'Pierre',
      icon: '/icones/stone.png',
    },
  }
 // exemple &water.name.value:+8& ou &water.name& ou &water&
const parse = (text: string) => {
  return text.replace(
    /\&(\w+)(?:\.(name))?(?:\.value:([+-]?\d+(?:[.,]\d+)?(?:~\d+(?:[.,]\d+)?)?|\*\d+(?:[.,]\d+)?))?(?:\.max)?(?:\.time)?\&/g,
    (_, key, hasName, value, _max, _time) => {
      const data = map[key]
      if (!data) return 'undefined'

      // Détecte si .time et .max sont présents dans le match original
      const time = /\.time/.test(_)
      const max = /\.max/.test(_)

      const img = `<img style="width:${size.value}px;height:${size.value}px" src="${data.icon}">`
      const timeSuffix = time ? ' /s' : ''
      const maxSuffix = max && value ? ' Max' : ''

      if (value && hasName) {
        return `<span class="richText ${key}">
          ${value}${maxSuffix} ${img}${timeSuffix} ${data.name}
        </span>`
      }

      if (value) {
        return `<span class="richText ${key}">
          ${value}${maxSuffix} ${img}${timeSuffix}
        </span>`
      }

      if (hasName) {
        return `<span class="richText ${key}">
          ${img}${timeSuffix} ${data.name}
        </span>`
      }

      return `<span class="richText ${key}">
        ${img}${timeSuffix}
      </span>`
    }
  )
}
  return { parse }
}
