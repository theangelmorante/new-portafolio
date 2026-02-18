import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-cyber-cyan text-sm font-mono mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 bg-cyber-gray border border-cyber-cyan/30 
          text-cyber-cyan placeholder-cyber-cyan/50 font-mono
          focus:outline-none focus:border-cyber-cyan focus:shadow-cyber-glow
          transition-all duration-300
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-red-500 text-xs font-mono">{error}</p>
      )}
    </div>
  )
}
