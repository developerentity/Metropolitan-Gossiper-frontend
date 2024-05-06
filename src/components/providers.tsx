'use client'

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { ReduxProvider } from '@/lib/redux/provider';

interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider >
            <ReduxProvider>
                <LocalizationProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </LocalizationProvider>
            </ReduxProvider>
        </SessionProvider>
    )
}

export default Providers