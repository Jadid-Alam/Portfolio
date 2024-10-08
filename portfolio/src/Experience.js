import './index.css';
import React , {useState, useEffect} from 'react';
import myImage from './images/LeetcodeProfile.PNG';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';

const Experience = () => {
    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [posts, setPosts] = useState([]);
    const [delayedDarkModeLeft, setDelayedDarkModeLeft] = useState('');
    const [delayedDarkModeRight, setDelayedDarkModeRight] = useState('');

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
        zIndex: -1,
        width: '3000px',
        height: '3000px',
        borderRadius: '50%',
        pointerEvents: 'none',
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedDarkModeLeft(darkMode ? 'exp-left-gradient-dark' : 'exp-left-gradient');
        }, 300);
        return () => clearTimeout(timer);
    }, [darkMode]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedDarkModeRight(darkMode ? 'exp-right-gradient-dark' : 'exp-right-gradient');
        }, 300);
        return () => clearTimeout(timer);
    }, [darkMode]);

    /*

    const getData = () => {
        fetch('http://localhost:8000/api/experience/')
        .then(res => res.json())
        .then(data => {
          const exp = [];
          data.forEach(d => {
            exp.push({
              ...d
            });
          });
            
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const entries = [];

    for (key in posts) {                          
        entries.push(

        );
      };
    */
    const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
  return (
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 
        <div className='gradient' style={fadingCircle}></div>
        <header className={`fixed top-0 left-0 w-full text-mnav font-semibold md:text-nav colour md:font-semibold fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
              <h4 className="p-1 max-w-40 md:p-2" style={{ color: colorString }}>Jadid Alam</h4>
                <nav className="mr-auto">
                  <ul className="flex">
                    
                    <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                      hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/'>Home</Link></li>

                      <li className={`p-1 md:p-2  transform transition  hover:text-purple-600 
                      hover:translate-y-1 hover:transform hover:transition ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                        <Link to='/experience'>Experience</Link>
                      </li>
                      
                      <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                      hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/projects'>Projects</Link></li>

                      <li className={`p-1 md:p-2 transform transition hover:text-purple-600 hover:translate-y-1 
                      hover:transform hover:transition ${darkMode ? 'text-purple-500' : 'text-black'}`}><Link to='/mini-blog'>Mini-Blog</Link></li>
                      
                      
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
              <div className='content py-8 text-center text-mnormal md:text-normal md:py-16 split'>
               
                <div className="py-4 md:py-8 exp-left">
                  <h3 id='title1' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Job experience 1 htica cawd</h3>
                  
                    <p id='sp1' className={`p-1 py-1 md:p-3 md:py-2
                        fade-in duration-1000 ease-in-out ${fading['sp1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>What makes people feel content with their lives? Owning expensive cars? Living in a mansion? Neither. 
                        It's having a sense of purpose, goals to strive for!
                    </p>
                    <p id='bp1' className={`p-1 py-1 md:p-3 md:py-2
                          fade-in duration-500 ease-in-out ${fading['bp1'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Therefore, I make it a priority to set clear goals for myself and organize my daily activities to achieve them. 
                        For instance, I focus on completing challenges on LeetCode to enhance my coding skills and improve my acceptance rate.
                    </p>
                </div>
                <div className={`py-4 md:py-8 ${delayedDarkModeLeft}`}></div>
                
                <div className={`py-4 md:py-8 ${delayedDarkModeRight}`}></div>
                <div className="py-4 md:py-8 exp-right">
                  <h3 id='title1' className={`p-1 py-1 text-mh3 md:text-h3 md:p-3 md:py-2 
                    fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                    ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Job experience 1 htica cawd</h3>
                  
                    <p id='sp1' className={`p-1 py-1 md:p-3 md:py-2
                        fade-in duration-1000 ease-in-out ${fading['sp1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>What makes people feel content with their lives? Owning expensive cars? Living in a mansion? Neither. 
                        It's having a sense of purpose, goals to strive for!
                    </p>
                    <p id='bp1' className={`p-1 py-1 md:p-3 md:py-2
                          fade-in duration-500 ease-in-out ${fading['bp1'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Therefore, I make it a priority to set clear goals for myself and organize my daily activities to achieve them. 
                        For instance, I focus on completing challenges on LeetCode to enhance my coding skills and improve my acceptance rate.
                    </p>
                </div>
                
              
              </div>
          </main>

          <footer>
              <h6 className='content mt-8 mb-2 text-center md:mt-16 md:mb-4'>&copy; 2024 Jadid Alam. All rights reserved.</h6>
          </footer>
      </div>
  );
};

export default Experience;

