import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  //Browser
  // console.log('I am in the component ', object provided by getInitialProps)
  console.log(currentUser);
  
  return currentUser ? <h1>You are signed in!</h1> : <h1>You are not signed in</h1>
}

//Specific for Next.js
//While defined, Next.JS is going to call this function while it's attempting to render our application on the server
//Opportunit to fetch some data
//Retrieved data is provided to our component as an object
//We can't do any data loading on the component itself
//On initial load our components are rendered only once, so there is no option to fetch anything in component

//If we are duplicating things like here (we can use 'req' and 'req' in both getInitialProps and buildClient) we are receiving entire argument to the
//next function (build client). So first argument to this function(getInitialProps) we usually refer to as context.


LandingPage.getInitialProps = async (context) =>{
  const {data} = await buildClient(context).get('/api/users/currentuser');
  return data;
}
  
export default LandingPage;