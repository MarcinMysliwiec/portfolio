import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-web';
import animate from 'lottie-web';
import axios from 'axios';
import Alert from './Alert.js';
import ButtonLoader from './ButtonLoader';

const defaultAlertData = { message: '', type: 'success', display: false, position: '-600px', timeout: 2000 };

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState(defaultAlertData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./rocket.json'),
    });
    animate.setSpeed(0.5);
  }, []);

  const showAlert = (message, type) => {
    setAlertData({ ...defaultAlertData, message, type, display: true, position: '40px' });

    setTimeout(() => {
      setAlertData((prevState) => {
        return { ...prevState, position: '-600px' };
      });
      setTimeout(() => {
        setAlertData(defaultAlertData);
      }, 500);
    }, defaultAlertData.timeout);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACK_URL}/api/sendmail`,
      timeout: 1000 * 7,
      data: { name, email, message }
    })
      .then(response => {
        setLoading(false);
        return response.data;
      })
      .then(() => {
        setName('');
        setEmail('');
        setMessage('');
        showAlert('Wiadomość została wysłana pomyślnie!', 'success');
      })
      .catch(error => {
        setLoading(false);
        showAlert('UPS! \nNie udało się wysłać wiadomośći', 'error');
        console.error(error);
      });
  };

  return (<section className="my-28" id="contact">

    <Alert alertData={alertData}/>

    <div className="md:mx-6 flex flex-col flex-wrap md:flex-row justify-between">

      <div className="md:w-6/12 md:px-0 mt-2">
        <header className="text-2xl font-bold">
          <h2>Contact Me</h2>
          <p className="text-base font-thin">I'd love to hear your thoughts!</p>
        </header>
        <div className="mt-7">
          <p className="font-bold">Marcin Myśliwiec</p>
          <p className="font-thin">61-131 Poznań</p>
          <p className="font-thin">Nowe Miasto</p>
          <a href="mailto: marcin.mysliw@gmail.com" className="border-b-2 mt-3 inline-block border-gray-500">
            marcin.mysliw@gmail.com
          </a>
        </div>
        <a className="border-b-2 mt-3 inline-block border-gray-500"
           href="./assets/files/Resume - Marcin Mysliwiec.pdf"
           target="_blank" rel="noreferrer">
          Resume
        </a>
        <div className="flex flex-row flex-wrap mt-7">
          <div className="mr-4">
            <a href="https://www.linkedin.com/in/marcin-mysliwiec-poz" target="_blank" rel="noreferrer">
                <span className="mb-2 flex flex-row items-end border border-gray-500 p-2 rounded-lg text-sm">
                  <img src="./assets/icons/linkedin.svg" alt="" width="24px" height="24px" className="mr-1"/>
                  LinkedIn
                </span>
            </a>
          </div>

          <div className="mr-4">
            <a href="https://github.com/MarcinMysliwiec" target="_blank" rel="noreferrer">
                <span className="mb-2 flex flex-row items-end border border-gray-500 p-2 rounded-lg text-sm">
                  <img src="./assets/icons/github.svg" alt="" width="24px" height="24px" className="mr-1"/>
                  GitHub
                </span>
            </a>
          </div>

        </div>
        <div className="md:m-6 flex flex-col flex-wrap md:flex-row justify-between">
          <div className="container" ref={container}></div>
        </div>
      </div>

      <div
        className="bg-gray px-5 py-10 md:py-8 sm:p-8 my-2 md:rounded-lg shadow-lg  justify-between w-full  md:w-6/12 ">
        <form className="flex flex-col space-y-3 m-auto w-full" name="contact" method="post" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact"/>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="gradient" required value={name}
                 onChange={e => setName(e.target.value)}></input>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className="gradient" required value={email}
                 onChange={e => setEmail(e.target.value)}></input>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" cols="25" rows="5" className="gradient" required value={message}
                    onChange={e => setMessage(e.target.value)}></textarea>

          <ButtonLoader loading={loading}/>

        </form>
      </div>
    </div>
  </section>);
};

export default Contact;
