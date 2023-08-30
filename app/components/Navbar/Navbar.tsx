'use client'

/** type SafeUser is used, because in next js we can pass plain objects but we can't pass DateTime objects as props. 
 * So User is directly used from prism/client, it has DateTime objects. In our getCurrentUser we convert those dates to ISOStrings. 
 * Now User from prisma/client is no longer adaptable. Now we must use SafeUser which is defined in types/index.ts and add to the original User type. */


import Container from "../Container"
import Categories from "./Categories"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { SafeUser } from '@/app/types'


interface ContainerProps {
  currentUser?: SafeUser | null,
  children?: React.ReactNode

}

const Navbar: React.FC<ContainerProps> = ({ 
  currentUser,
  children
 }) => {

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">

      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
        <Categories/>
      </div>
    </div>
  )
}
export default Navbar