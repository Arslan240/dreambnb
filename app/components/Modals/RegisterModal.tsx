'use client'

import axios from 'axios'

import { useCallback, useState } from 'react'
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import {toast} from 'react-hot-toast'
import Button from '../Button'
import {FcGoogle} from 'react-icons/fc'
import {AiFillGithub} from 'react-icons/ai'

import {signIn} from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

const defaultValues = {
  name: '',
  email: '',
  password: '',
}

type Props = {}
const RegisterModal = (props: Props) => {
  // const {isOpen, onClose} = useRegisterModal();
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

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch(error => {
        toast.error(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  } 

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome to Airbnb'
        subtitle='Create an account'
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
        id='name'
        label='Name'
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
      />
      <Button 
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className='flex flex-row items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div 
            className='text-neutral-800 cursor-pointer hover:underline'
            onClick={toggle}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
export default RegisterModal