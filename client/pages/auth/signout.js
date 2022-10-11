import { defaultConfig } from 'next/dist/server/config-shared';
import { Router } from 'next/router';
import { useEffect } from 'react';
import { useRequest } from '../../hooks/use-request';

export default () =>{
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () =>{
        Router.push('/'); 
    }
  })

  //Invoke it just one time
  //So second argument is an array
  useEffect(()=>{
    doRequest();
  },[]);
  return <div>Signing you out...</div>
};

