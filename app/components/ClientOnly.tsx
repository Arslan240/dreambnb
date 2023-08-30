'use client'

import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode
}
const ClientOnly:React.FC<Props> = ({children}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  },[])

  if(!isMounted) return null;

    return (
    <div>
        {children}
    </div>
  )
}
export default ClientOnly