import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';
import portfolioImage from './images/portfolioImage.PNG';

const Projects = () => {

    const [color, setColor] = useState({r:64, g:0, b:140});
    const [inverse, setInverse] = useState(false);
    const [mouse, setMouse] = useState({x:0, y:0});
    const [fading, setFading] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const [clicked, setClicked] = useState({});

    const colours = [{r:119, g:0, b:225}, {r:47, g:0, b:99}];

    useEffect(() => {
      const toggleElements = document.querySelectorAll('.toggle');

      toggleElements.forEach((element) => {
          setClicked((prevState) => ({
              ...prevState,
              [element.id]: false,
          }));
      });
    }, []);
    

    const toggleClick = (event) => {
      const id = event.currentTarget.id;
      setClicked((prevState) => ({
        ...prevState,
        [id]: !clicked[id],
      }));
    };

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

                        
                        
                        <li className={`p-1 md:p-2  transform transition  hover:text-purple-600 
                        hover:translate-y-1 hover:transform hover:transition ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                          <Link to='/projects'>Projects</Link>
                        </li>

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
                <div className='content z-10 text-center text-mnormal md:text-normal split pt-10'>
                  <button id='b1' className={`toggle z-10 ${clicked['b1'] ? 'proj-span split' : 'proj-fade' }`} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title1' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Full-stack Portfolio</h3>

                        <p id='descipton1' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton1'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          This personal project is a <b style={{ color: colorString }}>full-stack portfolio</b> that showcases my resume, skills, 
                          experience and my Dynamic Web Development Skills. Including a mini-blog of my porfessional journey.
                        </p>
                      </div>
                      
                      <figure id='img' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b1'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={portfolioImage} alt="LeetCode Profile" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>Portfolio Page Image</figcaption>
                      </figure>

                      <p id='p1' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b1'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p1'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        This project was developed using <b style={{ color: colorString }}>React JS, Tailwind CSS, Django </b> and <b style={{ color: colorString }}>MongoDB </b> 
                         and is hosted on <b style={{ color: colorString }}>Vercel</b>. I made use of reacts hooks to manage states and cause effects such as the dark mode toggle,
                         elements fading in and dynamic color changing elements.
                      </p>

                      <p id='p2' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b1'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p2'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        Throughout the development of this project, I learned how to make efficient <b style={{ color: colorString }}> Dynamic Web Apps </b>
                         that allows the user to navigate between different pages without having to reload the page with the use of <b style={{ color: colorString }}>Router </b>
                         module from React. I also learned how to Implement <b style={{ color: colorString }}>Django </b> and how react and django can communicate with each other.
                      </p>
                  </button>

                  <button id='b2' className={`toggle z-10 ${clicked['b2'] ? 'proj-span split' : 'proj-fade' }`} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title2' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title2'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>LSC Invoice Builder (Commissioned) </h3>

                        <p id='descipton2' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton2'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <b style={{ color: colorString }}>short descipton</b>
                        </p>
                      </div>
                      
                      <figure id='img2' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b2'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={portfolioImage} alt="LeetCode Profile" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>LeetCode Profile</figcaption>
                      </figure>

                      <p id='p3' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b2'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p3'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <b style={{ color: colorString }}>roles and technology used</b>
                      </p>

                      <p id='p4' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b2'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p4'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <b style={{ color: colorString }}>short descipton</b>
                      </p>
                  </button>

                  <button id='b3' className={`toggle z-10 ${clicked['b3'] ? 'proj-span split' : 'proj-fade' }`} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title3' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title3'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>Horse Racing Simulator</h3>

                        <p id='descipton3' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton3'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <b style={{ color: colorString }}>short descipton</b>
                        </p>
                      </div>
                      
                      <figure id='img3' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b3'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={portfolioImage} alt="LeetCode Profile" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>LeetCode Profile</figcaption>
                      </figure>

                      <p id='p5' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b3'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p5'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <b style={{ color: colorString }}>roles and technology used</b>
                      </p>

                      <p id='p6' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b3'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p6'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <b style={{ color: colorString }}>short descipton</b>
                      </p>
                  </button>

                  <button id='b4' className={`toggle z-10 ${clicked['b4'] ? 'proj-span split' : 'proj-fade' }`} onClick={toggleClick}>
                      <div className={`z-10`}>
                        <h3 id='title4' className={`p-1 pt-10 text-mh3 md:text-h3 md:p-3 md:pt-16 text-left 
                        fade-in duration-1000 ease-in-out ${fading['title4'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>LSC Homework Portal (Commissioned)</h3>

                        <p id='descipton4' className={`p-1 py-2 md:p-3 md:py-4 text-left
                          fade-in duration-1000 ease-in-out ${fading['descipton4'] ? 'opacity-100' : 'opacity-0'}
                          ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <b style={{ color: colorString }}>short descipton</b>
                        </p>
                      </div>
                      
                      <figure id='img4' className={`p-1 py-5 md:p-3 md:py-10 z-10 ${clicked['b4'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                          <img src={portfolioImage} alt="LeetCode Profile" style={{ width: '500px', height: 'auto' }} />
                          <figcaption className='text-mimgcap md:text-imgcap text-gray-600'>LeetCode Profile</figcaption>
                      </figure>

                      <p id='p7' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b4'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p7'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <b style={{ color: colorString }}>roles and technology used</b>
                      </p>

                      <p id='p8' className={`p-1 py-2 md:p-3 md:py-4 text-left z-10 ${clicked['b4'] ? 'block' : 'hidden' }
                        fade-in duration-1000 ease-in-out ${fading['p8'] ? 'opacity-100' : 'opacity-0'}
                        ${darkMode ? 'text-yellow-100' : 'text-black'}`}>
                        <b style={{ color: colorString }}>short descipton</b>
                      </p>
                  </button>       

              </div>
            </main>

            <footer>
                <h6 className='content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4'>&copy; 2024 Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}


export default Projects;
