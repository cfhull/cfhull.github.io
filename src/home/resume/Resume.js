import React from 'react'
import ResumeSection from './ResumeSection'
import Skills from './Skills'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faBriefcase,
  faBook,
  faWrench,
  faIdCard,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'
import {
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

const Resume = () => (
	<div className="resume">
  	<ResumeSection
			title="About Me"
			icon={<FontAwesomeIcon icon={faUser} fixedWidth />}
		>
			<p>I have experience in cyber security, web development, and video game development, love each of the fields, and am excited for opportunities in any of them. My problem-solving skills, my careful attention to detail, and my ability to work independently or in a team has transferred to my work, and allowed me to thoroughly enjoy all the positions I've held. I am developing video games with the local independent development community, and continuing to improve upon this website to keep my skills in each of these areas sharp. Please look over my previous experience and skills and contact me if you have any questions or if you would like me to join your team!</p>
		</ResumeSection>
  	<ResumeSection
			title="Experience"
			icon={<FontAwesomeIcon icon={faBriefcase} fixedWidth />}
		>
		  <div>
			  <div>
				  <h3>Unity3D Programming Engineer (Short-term Contract)</h3>
				  <h4>Galvanize Labs (April 2014 - June 2014)</h4>
				  <p>In this short-term contract position, I used the Unity3D game engine to write scripts, fix bugs, and reorganize game assets for an educational platformer game. I also provided gameplay and issues feedback to the lead developer and game designer. Read more about it below.</p>
				  <p><a href="http://www.takenchargegame.com">Taken Charge</a></p>
			  </div>
	  	  <div>
		  	  <h3>Web Developer</h3>
		  	  <h4>HDI - Nebraska Chapter (August 2012 - March 2013)</h4>
		  	  <p>I volunteered in maintaining the website for this volunteer professional organization while they underwent a major website revision.</p>
	  	  </div>
	  	  <div>
		  	  <h3>Business Support Specialist</h3>
		  	  <h4>CSG International (May 2011 - August 2012)</h4>
		  	  <p>I supported our company's business continuity planning operations. This involved:</p>
		  	  <ul>
			  	  <li>Writing VBA macros to organize and streamline processes contributing to cost avoidance initiatives</li>
			  	  <li>Developing a GUI front-end to our SQL database, using ASP.NET</li>
			  	  <li>Creating automated graphs and crawl banners for a monitoring website during a disaster recovery exercise</li>
			  	  <li>Taking training courses in Process Management and Agile/UDM to improve my efficacy in managing the software development lifecycle</li>
		  	  </ul>
		  	  <p>My managers nominated me for, and I received, the 2012 AIM Institute College Intern of the Year Award for Nebraska and the surrounding area. Learn more about the institute and its importance to IT companies in the Midwest <a href="http://aimforbrilliance.org/">here</a>.</p>
			  </div>
		  </div>
		</ResumeSection>
  	<ResumeSection
			title="Education"
			icon={<FontAwesomeIcon icon={faBook} fixedWidth />}
		>
		  <div>
			  <div>
				  <h3>Bachelors of Science, Computer Science, Minor in Cyber Security</h3>
				  <h4>Troy University (Graduated May 2015)</h4>
				  <p>Computer Science Coursework: Data Structures and Algorithms; Programming Languages; Web Development
					  Technologies; Software Engineering; Systems Analysis & Design; Operating Systems; Networking; Databases; COBOL
					  Programming</p>
				  <p>Cybersecurity Coursework: Computer Forensics; Cyber Crime; Computer Security</p>
				  <p>Completed cyber security training courses in digital forensics, secure software, cyber law, and cyber incident analysis
					  and response through the National Emergency Response and Rescue Training Center in cooperation with the
					  Department of Homeland Security and Federal Emergency Management Agency (DHS/FEMA).</p>
			  </div>
		  </div>
		</ResumeSection>
  	<ResumeSection
			title="Skills"
			icon={<FontAwesomeIcon icon={faWrench} fixedWidth />}
		>
			<div>
				<p>Personal evaluation of my proficiency at a variety of technologies using the NIH Proficiency Scale.</p>
				<ul>
					<li>1: Fundamental awareness (basic knowledge)</li>
					<li>2: Novice (limited experience)</li>
					<li>3: Intermediate (practical application)</li>
					<li>4: Advanced (applied theory)</li>
					<li>5: Expert (recognized authority)</li>
				</ul>
				<Skills />
			</div>
		</ResumeSection>
  	<ResumeSection
			title="Contact Me"
			icon={<FontAwesomeIcon icon={faIdCard} fixedWidth />}
		>
			<div className="contact">
			  <a href="mailto:chris.f.hull@gmail.com">
	        <FontAwesomeIcon icon={faEnvelope} size="2x" fixedWidth />
		  	  chris.f.hull@gmail.com
	      </a>
			  <a>
	        <FontAwesomeIcon icon={faPhone} size="2x" fixedWidth />
		  	  +1 402 917 4914
	      </a>
			  <a href="https://www.linkedin.com/in/hullchristopher">
	        <FontAwesomeIcon icon={faLinkedin} size="2x" fixedWidth />
				  linkedin.com/in/hullchristopher
	      </a>
			  <a href="https://www.github.com/cfhull">
	        <FontAwesomeIcon icon={faGithub} size="2x" fixedWidth />
          github.com/cfhull
	      </a>
		  </div>
    </ResumeSection>
  </div>
)

export default Resume
