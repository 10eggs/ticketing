import axios from 'axios'

export default ({req}) =>{

  if (typeof window === 'undefined'){
    //On the server
    console.log('On server');
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
  }else{ 
    //On the browser
    console.log('On browser');
    return axios.create({
      //We can skip line below
      // baseURL: '/'
    });
  }
}