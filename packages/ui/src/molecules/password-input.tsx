'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '@mitay/ui/atoms/button'
import { Input, type InputProps } from '@mitay/ui/atoms/input'

type PasswordInputProps = Omit<InputProps, 'type' | 'endAddon'>

function PasswordInput({ autoComplete = 'current-password', ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      autoComplete={autoComplete}
      endAddon={
        <Button
          variant="ghost"
          color="neutral"
          size="icon-sm"
          aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((current) => !current)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </Button>
      }
      {...props}
    />
  )
}

export { PasswordInput, type PasswordInputProps }
