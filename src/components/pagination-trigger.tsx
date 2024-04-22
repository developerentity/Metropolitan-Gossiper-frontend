'use client'

import { useCallback } from "react"
import { useRouter } from "next/navigation"

interface IProps {
    currentPath: string
    limit: number
    expandSize: number
}

export default function Trigger({ limit, currentPath, expandSize }: IProps) {
    const router = useRouter()

    const TriggerRef = useCallback(
        (node: any) => {
            if (!node) return

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        router.push(`${currentPath}?limit=${limit + expandSize}`, { scroll: false })
                        observer.disconnect()
                    }
                })
            })

            observer.observe(node)
        },
        [limit]
    )

    return <div
        ref={TriggerRef}
        style={{ width: '1px', height: '1px', backgroundColor: 'red' }}
    />
}