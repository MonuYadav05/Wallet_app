

import React from 'react'
import { Center } from '@repo/ui/center';
import { SetPass } from '../../../components/SetPass';


export default async function setPass({params}:{params:{number:string}}) {

  return (
    <div className='max-h-screen w-screen my-48'> 
        <Center>
        <SetPass />
        </Center>
            </div>
  )
}

