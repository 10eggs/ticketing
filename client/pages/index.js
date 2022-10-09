 import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  //Browser
  // console.log('I am in the component ', object provided by getInitialProps)
  console.log(currentUser);
  
  return <h1>LANDING</h1>;
}

//Specific for Next.js
//While defined, Next.JS is going to call this function while it's attempting to render our application on the server
//Opportunit to fetch some data
//Retrieved data is provided to our component as an object
//We can't do any data loading on the component itself
//On initial load our components are rendered only once, so there is no option to fetch anything in component
LandingPage.getInitialProps = async ({req}) =>{
  console.log(`Check headers: ${req.headers}`);

  if(typeof window === 'undefined'){
    //We are o the server!
    //Request should be made to http://ingress-nginx.ingres-snginx.~~
    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', 
      {
        headers: req.headers
      }
    );
    return data;
  }
  else{
    //We are on the browser!
    //Request can be made with a base url of ''
    const {data} = await axios.get('/api/users/currentuser')
    return data;
  }
}
  
export default LandingPage;