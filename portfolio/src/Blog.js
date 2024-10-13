import './index.css';
import React , {useState, useEffect} from 'react';
import myImage from './images/LeetcodeProfile.PNG';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';

const Blog = () => {

    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [darkMode, setDarkMode] = useState(false);

    const colours = [{r:119, g:0, b:225}, {r:47, g:0, b:99}];

    const toggleDarkMode = () => {
        if (darkMode) {
            setDarkMode(false);
        }
        else
        {
            setDarkMode(true);
        }
    };
    
    const changeColor = () => {
        setColor((color) => {
            if (color.r > colours[0].r && color.b > colours[0].b) {
                setInverse(true);
            }
            else if (color.r < colours[1].r && color.b < colours[1].b) {
                setInverse(false);
            }

            if (!inverse) {
                const rn = color.r + 8;
                const bn = color.b + 13;
                return {r:rn, g:color.g, b:bn};
            }
            else
            {
                const rn = color.r - 8;
                const bn = color.b - 13;
                return {r:rn, g:color.g, b:bn};
            }

        });
    };

    useEffect(() => {
        const interval = setInterval(changeColor, 70);
        return () => clearInterval(interval);
    }, [color.r]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMouse({x: e.clientX, y: e.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouse.x, mouse.y]);

    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in');
    
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setFading((prevState) => ({
                  ...prevState,
                  [entry.target.id]: true,
                }));
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
    
        elements.forEach((element) => {
          observer.observe(element);
        });
    
        return () => {
          elements.forEach((element) => {
            observer.unobserve(element);
          });
        };
      }, []);

    const fadingCircle = {
        position: 'fixed',
        top: mouse.y - 1500,
        left: mouse.x - 1500,
        zIndex: 0,
        width: '3000px',
        height: '3000px',
        borderRadius: '50%',
        pointerEvents: 'none',
    };

    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  return (
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 

        <div className={`${darkMode ? 'gradient-dark' : 'gradient'}`} style={fadingCircle}></div>

          <header className={`fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav md:font-semibold fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
                <h4 className="p-1 max-w-40 md:p-2" style={{ color: colorString }}>Jadid Alam</h4>
                  <nav className="mr-auto">
                    <ul className="flex">
                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                        hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/'>Home</Link></li>

                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                        hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/experience'>Experience</Link></li>

                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                        hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/projects'>Projects</Link></li>

                        
                        <li className={`p-1 md:p-2  transform transition  hover:text-purple-600 
                        hover:translate-y-1 hover:transform hover:transition ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                          <Link to='/mini-blog'>Mini-Blog</Link>
                        </li>
                        
                    </ul>
                  </nav>
                  
                  <nav className="mr-1 items-end sm:mr-2 md:mr-4">
                    <ul className="flex justify-end">
                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition
                            ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/resume' className='FINISH THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS'>Resume</Link></li>  
                        <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 hover:transform hover:transition
                            ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/contact-me'>Contact Me</Link></li>
                        <button onClick={toggleDarkMode}><img src={darkMode ? lightModeImage : darkModeImage} style={{ width: '35px', height: 'auto' }} /></button>
                        
                    </ul>
                  </nav>
            </header>

            <main>
                <div className='content z-10 text-center text-mnormal md:text-normal'>
                  <div className='pt-20 md:pt-40 blog-grid'>
                    <div className={`border-r border-b rounded-sm duration-1000 ease-in-out ${darkMode ? 'border-purple-900' : 'border-purple-300'}`}>
                        <figure id='img' className={`p-1 pt-5 pb-2 md:p-3 md:pt-10 md:pb-3
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <img className='ml-auto'  src={myImage} alt="LeetCode Profile" style={{ width: 'auto', height: '500px' }} />
                        <figcaption className='text-mimgcap md:text-imgcap text-right text-gray-600'>Date and Time</figcaption>
                      </figure>
                      <p id='p1' className={`p-1 pt-1 pb-3 md:p-3 md:pt-2 md:pb-6
                            fade-in duration-1000 ease-in-out ${fading['p1'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            Photo comment: this is this and athadwa
                      </p>
                    </div>
                    <div className='grid grid-rows-[9fr_1fr]'>
                        <div id='comments2' className={`p-1 text-mnav md:text-nav md:p-3 text-left fade-in duration-1000 ease-in-out ${fading['comments2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            <p className='pb-1'>comment1</p>
                            <p className='pb-1'>comment2</p>
                        </div>
                        <form className='p-1'>
                            <input id='commentInp1' type='text' placeholder='Comment' className={`text-mnav md:text-nav p-1 w-[95%] mx-auto
                                border-b rounded-sm ${darkMode ? 'bg-gray-900 border-purple-900 text-yellow-100' : 'bg-gray-200 border-purple-300 text-black'}`} />
                        </form>
                    </div>
                  </div>

                  <div className='pt-20 md:pt-40 blog-grid'>
                    <div className={`border-r border-b rounded-sm duration-1000 ease-in-out ${darkMode ? 'border-purple-900' : 'border-purple-300'}`}>
                        <figure id='img2' className={`p-1 pt-5 pb-2 md:p-3 md:pt-10 md:pb-3
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <img className='ml-auto'  src={myImage} alt="LeetCode Profile" style={{ width: 'auto', height: '500px' }} />
                        <figcaption className='text-mimgcap md:text-imgcap text-right text-gray-600'>Date and Time</figcaption>
                      </figure>
                      <p id='p2' className={`p-1 pt-1 pb-3 md:p-3 md:pt-2 md:pb-6
                            fade-in duration-1000 ease-in-out ${fading['p2'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            Photo comment: this is this and athadwa
                      </p>
                    </div>
                    <div className='grid grid-rows-[9fr_1fr]'>
                        <div id='comments' className={`p-1 text-mnav md:text-nav md:p-3 text-left fade-in duration-1000 ease-in-out ${fading['comments'] ? 'opacity-100' : 'opacity-0'}
                            ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                            <p className='pb-1'>comment1</p>
                            <p className='pb-1'>comment2</p>
                        </div>
                        <form className='p-1'>
                            <input id='commentInp2' type='text' placeholder='Comment' className={`text-mnav md:text-nav p-1 w-[95%] mx-auto
                                border-b rounded-sm ${darkMode ? 'bg-gray-900 border-purple-900 text-yellow-100' : 'bg-gray-200 border-purple-300 text-black'}`} />
                        </form>
                    </div>
                  </div>

                  
                </div>
            </main>

            <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; 2024 Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}


export default Blog;