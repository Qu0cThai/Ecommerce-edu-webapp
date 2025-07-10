import { mockProducts } from '@/data/mockProducts'

export const getSuggestions = async (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
            const viewed = JSON.parse(localStorage.getItem('viewed') || '[]')

            const allReference = [...favorites, ...viewed]

            const allIds = new Set(allReference.map(p => p.id))

            const subjectTags = [...new Set(allReference.map(p => p.subject))]
            const levelTags = [...new Set(allReference.map(p => p.level))]

            const bySubject = mockProducts.filter(p =>
                subjectTags.includes(p.subject) && !allIds.has(p.id)
            )

            const byLevel = mockProducts.filter(p =>
                levelTags.includes(p.level) &&
                !subjectTags.includes(p.subject) &&
                !allIds.has(p.id)
            )

            const result = [...bySubject, ...byLevel].slice(0, 3)

            resolve(result)
        }, 1000)
    })
}
