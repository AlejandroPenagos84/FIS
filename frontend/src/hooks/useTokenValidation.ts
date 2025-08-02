// src/hooks/useTokenValidation.ts
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useTokenValidation = () => {
    const navigate = useNavigate()
    const [timeRemaining, setTimeRemaining] = useState<number>(0)
    const [isTokenValid, setIsTokenValid] = useState<boolean>(true)

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            localStorage.removeItem('token')
            setIsTokenValid(false)
            setTimeout(() => {
                // alert('Sesión expirada. Por favor, inicia sesión nuevamente.')
                navigate('/login')
            }, 1000)
            return false
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const currentTime = Date.now() / 1000
            const expirationTime = payload.exp
            const remainingTime = expirationTime - currentTime
            if (remainingTime <= 0 || !token) {
                localStorage.removeItem('token')
                alert('Sesión expirada. Por favor, inicia sesión nuevamente.')
                navigate('/login')
                setIsTokenValid(false)
                return false
            }
            setTimeRemaining(Math.floor(remainingTime))
            setIsTokenValid(true)
            if (remainingTime <= 30 && remainingTime > 0) {
                console.warn(`⚠️ Sesión expira en ${Math.floor(remainingTime)} segundos`)
            }
            return true
        } catch (error) {
            console.error('Error al decodificar el token:', error)
            localStorage.removeItem('token')
            setIsTokenValid(false)
            return false
        }
    }

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getTimeColor = (): string => {
        if (timeRemaining > 120) return "text-green-600"
        if (timeRemaining > 60) return "text-yellow-600"
        return "text-red-600"
    }

    useEffect(() => {
        checkTokenExpiration()
        const interval = setInterval(checkTokenExpiration, 1000)
        return () => clearInterval(interval)
    }, [navigate])

    return {
        checkTokenExpiration,
        timeRemaining,
        formatTime,
        getTimeColor,
        isTokenValid
    }
}