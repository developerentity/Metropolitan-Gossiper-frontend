'use client'

import { useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface IProps {
    currentPath: string
    limit: number
    expandSize: number
    reachedEnd: boolean
}

export default function PaginationTrigger({ limit, currentPath, expandSize, reachedEnd }: IProps) {
    const router = useRouter()
    const triggerRef = useRef<HTMLDivElement>(null)

    const checkHeightAndPaginate = useCallback(() => {
        if (!triggerRef.current) return

        const windowHeight = window.innerHeight
        const contentHeight = document.documentElement.scrollHeight

        if (contentHeight > windowHeight) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !reachedEnd) {
                        router.push(`${currentPath}?limit=${limit + expandSize}`, { scroll: false })
                        observer.disconnect()
                    }
                })
            })

            observer.observe(triggerRef.current)
        }
    }, [currentPath, limit, expandSize, router])

    useEffect(() => {
        checkHeightAndPaginate()
        window.addEventListener('resize', checkHeightAndPaginate)
        return () => {
            window.removeEventListener('resize', checkHeightAndPaginate)
        }
    }, [checkHeightAndPaginate])

    return <div
        ref={triggerRef}
        style={{ width: '1px', height: '1px', backgroundColor: 'red' }}
    />
}