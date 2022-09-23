import { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { Socket } from 'socket.io-client'

export interface ServerStyleContextData {
  key: string
  ids: Array<string>
  css: string
}

export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null)

export interface ClientStyleContextData {
  reset: () => void
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
)

type ProviderProps = {
  socket: Socket | undefined
  children: ReactNode
}

const context = createContext<Socket | undefined>(undefined)

export function useSocket () {
  return useContext(context)
}

export function SocketProvider ({ socket, children }: ProviderProps) {
  return <context.Provider value={socket}>{children}</context.Provider>
}
