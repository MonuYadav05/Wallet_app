

import React from 'react'
import { Center } from '@repo/ui/center';
import { SetPass } from '../../../components/SetPass';


export default async function setPass({params}:{params:{number:string}}) {

  return (
    <div className='md:w-screen mx-3 ms:mx-0 h-screen'> 
        <Center>
        <SetPass />
        </Center>
            </div>
  )
}

