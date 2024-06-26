'use client'

import {signOut} from 'next-auth/react'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRentModal from '@/app/hooks/useRentModal'

import { SafeUser } from '@/app/types'

import { AiOutlineMenu } from 'react-icons/ai'

interface Props {
	currentUser?: SafeUser | null,
	children?: React.ReactNode
}
const UserMenu:React.FC<Props> = ({currentUser}) => {
	const [isOpen, setIsOpen] = useState(false);
	const rentModal = useRentModal();
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const router = useRouter()

	const toggleOpen = useCallback(() => {
		setIsOpen(value => !value)
	}, [])

	const onRent = useCallback(() => {
		if(!currentUser) {
			return loginModal.onOpen();
		}

		// Open rent modal
		rentModal.onOpen();
	},[loginModal, currentUser, rentModal])

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
				>
					Airbnb Your home
				</div>
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image}/>
					</div>
				</div>
			</div>
			{isOpen ? (
				<div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-14 text-sm'>
					<div className='flex flex-col cursor-pointer'>

						{currentUser ? (
							<>
								<MenuItem onClick={() => router.push('/trips')} label='My Trips'/>
								<MenuItem onClick={() => router.push('/favorites')} label='My Favorites'/>
								<MenuItem onClick={() => router.push('/reservations')} label='My reservations'/>
								<MenuItem onClick={() => router.push('/properties')} label='My properties'/>
								<MenuItem onClick={() => rentModal.onOpen()} label='Airbnb my home'/>
								<hr/>
								<MenuItem onClick={() => signOut()} label='Logout'/>
							</>

						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label='Login'/>
								<MenuItem onClick={registerModal.onOpen} label='Signup'/>
							</>

						)}
					</div>
				</div>
			) : null
			}
		</div>
	)
}
export default UserMenu