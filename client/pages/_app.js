import 'bootstrap/dist/css/bootstrap.css';

//Export react component
//Whenever you try to navigate to some distinct page with Next.js,
//Next is going to import your component from one of these files from client directory
//Next does not just take your component and show it on the screen
//It wraps it up in its own custom default component
//In next this component is refered to as an 'app'
//However we create our own custom component, _app.js

//So route looks like this:
//1. Navigate to route,
//2. Next is importing this component (if you are navigating to root, it takes root) and it's going to pass it into our custom default component (_app) as
//'Component' prop
//By using this we can just import our global css component into one file, so bootstrap only imported to _app.js

export default ({Component, pageProps }) =>{
  return <Component {...pageProps}/>
} 

