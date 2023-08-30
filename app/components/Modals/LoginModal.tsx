'use client'

import {signIn} from 'next-auth/react'

import useLoginModal from '@/app/hooks/useLoginModal'
import { useCallback, useState } from 'react'
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import {toast} from 'react-hot-toast'
import Button from '../Button'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { useRouter } from 'next/navigation'

const defaultValues = {
  email: '',
  password: '',
}

type Props = {}

const LoginModal = (props: Props) => {
  const router = useRouter()

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {register,handleSubmit, formState:{
    errors,
  } } = useForm<FieldValues>({
    defaultValues: defaultValues,
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false);

      if(callback?.ok){
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error)
      }
    })
  } 

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  },[loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome back'
        subtitle='Login to your account'
      />
      <Input 
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr/>
      <Button 
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
        // disabled={isLoading}
        />
      <Button 
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
        // disabled={isLoading}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>First time using Airbnb</div>
          <div 
            className='text-neutral-800 cursor-pointer hover:underline'
            onClick={toggle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
export default LoginModal