import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="">
            <h4 className="p-1 max-w-40 md:p-2">Jadid Alam</h4>
              <nav className="mr-auto">
                <ul className="flex">
                    <li className="p-1 md:p-2"><a href="index.html">Home</a></li>
                    <li className="p-1 md:p-2"><a href="experience.html">Work Experience</a></li>
                    <li className="p-1 md:p-2"><a href="projects.html">Projects</a></li>
                    <li className="p-1 md:p-2"><a href="blog">Mini Blog</a></li>
                </ul>
              </nav>
              
              <nav className="mr-1 items-end sm:mr-2 md:mr-4">
                <ul className="flex">
                    <li className="p-1 md:p-2"><a href="index.html">Resume</a></li>
                    <li className="p-1 md:p-2"><a href="experience.html">Contact Me</a></li>
                </ul>
            </nav>
        </header>

        <main>
            <div className='content'>
              <div>
                  <h2 className="p-1 md:p-2">I am Jadid Alam, an aspiring student pursuing a career in the tech industry.</h2>
                  <p className="p-1 md:p-2">What makes people feel content with their lives? Owning expensive cars? Living in a mansion? Neither. It's having a sense of purpose, goals to strive for!</p>
              </div>

              <div>
                  <p className="p-1 md:p-2">Therefore, I make it a priority to set clear goals for myself and organize my daily activities to achieve them. 
                      For instance, I focus on completing challenges on LeetCode to enhance my coding skills and improve my acceptance rate.
                  </p>
                  
                  <figure className="p-1 md:p-2">
                      <img src="images/leetcode.png" alt="LeetCode"/>
                      <figcaption>LeetCode</figcaption>
                  </figure>
              </div>

              <div>

                  <h3 className="p-1 md:p-2">Academic History:</h3>

                  <p className="p-1 md:p-2">"I am currently studying Computer Science at Queen Mary University of London, where I am exploring programming languages, data structures, and honing my skills as a programmer. 
                      My passion for Computer Science began in secondary school, but I initially pursued Engineering due to not taking the subject at GCSE.
                  </p>

                  <p className="p-1 md:p-2">
                      After a year at the University of Oxford, I realized my true interest lay in Computer Science, prompting my transfer to Queen Mary. Here, I am excited to deepen my technical 
                      knowledge and gain practical experience, particularly through an individual project in my final year that will allow me to explore my specific interests within the field."
                  </p>
              </div>
            </div>
        </main>

        <footer>
            <h6 className='content mt-4 md:mt-8'>&copy; 2024 Jadid Alam. All rights reserved.</h6>
        </footer>
    </div>
  );
}

export default App;
