'use client'

import Image from "next/image"

interface Props {
  children?: React.ReactNode;
  src?: string | null
}
const Avatar:React.FC<Props> = ({src}) => {
  return (
    <Image
        className="rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={src || "/images/placeholder.jpg"}
    />
  )
}
export default Avatar