import './index.css';
import React , {useState, useEffect} from 'react';
import darkModeImage from './images/night-mode.png';
import lightModeImage from './images/day-mode.png';
import { Link } from 'react-router-dom';


const AddPost = () => {

    
  const [darkMode, setDarkMode] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);  


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);  

    try {
        const response = await fetch('http://localhost:8000/api/blog/create/', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error adding post' + response.statusText);
        }

        const data = await response.json();
        console.log(data);  
    } catch (error) {
        console.error(error);  
    }
  };

  return (
      <div className={`fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}> 


          <header className={`fixed z-20 top-0 left-0 w-full text-mnav font-semibold md:text-nav md:font-semibold fade-in duration-1000 ease-in-out ${darkMode ? 'bg-gray-950' : 'bg-yellow-50'}`}>
                <h4 className="p-1 max-w-40 md:p-2" >Jadid Alam</h4>
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
                        <button onClick={() => setDarkMode(!darkMode)}><img src={darkMode ? lightModeImage : darkModeImage} style={{ width: '35px', height: 'auto' }} /></button>
                        
                    </ul>
                  </nav>
            </header>

            <main>
                
                <form className='py-40' onSubmit={handleSubmit}>
  
                    <div>
                        <label htmlFor='caption'>Caption:</label>
                        <textarea
                        id='caption'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor='image'>Image:</label>
                        <input
                        type='file'
                        id='image'
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    <button type='submit'>Add Post</button>
                </form>
            </main>

            <footer>
                <h6 className={`content z-10 mt-8 mb-2 text-center md:mt-16 md:mb-4 ${darkMode ? 'text-yellow-100' : 'text-black'}`}>&copy; 2024 Jadid Alam. All rights reserved.</h6>
            </footer>
      </div>
  );
}


export default AddPost;