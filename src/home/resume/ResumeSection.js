import React from 'react'
import './ResumeSection.css'

const ResumeSection = ({ title, icon, invert, children }) => (
  <>
  <div className="resume-section">
    <div className="header">
      <div className="icon">
        {icon}
      </div>
      <h1>{title}</h1>
    </div>
    <div className="content">
      {children}
    </div>
  </div>
  <hr />
  </>
)

export default ResumeSection
