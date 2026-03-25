'use client'
import React, { Component, ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class GLTFErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error) {
    console.warn("GLTF Model not found, using highly polished 3D cylinder fallback.")
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
