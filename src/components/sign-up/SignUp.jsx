import React from 'react';

const SignUp = ({ onRouteChange }) => {
  return (
    <main>
      <article className='pa4 black-80 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5'>
        <form className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f2 fw6 ph0 mh0'>Sign Up</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='username'>
                Username
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-black w-100'
                type='text'
                name='username'
                id='username'
              />
            </div>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                className='pa2 input-reset ba bg-transparent hover-black w-100'
                type='email'
                name='email-address'
                id='email-address'
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Password
              </label>
              <input
                className='b pa2 input-reset ba bg-transparent hover-black w-100'
                type='password'
                name='password'
                id='password'
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={() => onRouteChange('home')}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Sign Up'
            />
          </div>
        </form>
      </article>
    </main>
  );
};

export default SignUp;
