// src/pages/ScholarshipDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ScholarshipDetailPage.css';

const ScholarshipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      try {
        // const response = await fetch(`/api/scholarships/${id}`);
        // const data = await response.json();
        const data = {
          deadline: "12-12-2025" ,
          applicationLink: "" ,
          name: "Name" ,
          amountType: "Full/Partial" , 
          description: "nothing",
          minGPA: 7.5,
          location: "INDIA",
          eligibleCourses: ['CSE','ECE','EEE'],
          provider: "NTSE",
          contactEmail: "ntse@gmail.com",
          contactPhone: 123456789,
          website: "http://localhost:5137"
        }
        // if (!response.ok) {
        //   throw new Error(data.message || 'Failed to fetch scholarship details');
        // }

        setScholarship(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchScholarshipDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleApplyClick = () => {
    // In a real app, this would redirect to the application page or external site
    window.open(scholarship.applicationLink, '_blank');
  };

  if (loading) {
    return <div className="loading">Loading scholarship details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!scholarship) {
    return <div className="not-found">Scholarship not found</div>;
  }

  const deadline = new Date(scholarship.deadline);
  const now = new Date();
  const diffTime = deadline - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="scholarship-detail-container">
      <button onClick={handleBackClick} className="back-button">
        &larr; Back to Scholarships
      </button>

      <div className="scholarship-header">
        <h1>{scholarship.name}</h1>
        <div className="scholarship-meta">
          <span className={`amount-badge ${scholarship.amountType.toLowerCase()}`}>
            {scholarship.amountType} Funding
          </span> 
          <span className="deadline">
            Deadline: {deadline.toLocaleDateString()} ({diffDays > 0 ? `${diffDays} days left` : 'Expired'})
          </span>
        </div>
      </div>

      <div className="scholarship-content">
        <div className="main-content">
          <div className="section">
            <h2>Description</h2>
            <p>{scholarship.description}</p>
          </div>

          <div className="section">
            <h2>Eligibility Criteria</h2>
            <ul>
              <li><strong>Courses:</strong> {scholarship.eligibleCourses.join(', ')}</li>
              <li><strong>Minimum GPA:</strong> {scholarship.minGPA}</li>
              <li><strong>Location:</strong> {scholarship.location}</li>
              {/* {scholarship.specialCriteria && (
                <li><strong>Special Criteria:</strong> {scholarship.specialCriteria}</li>
              )} */}
            </ul>
          </div>

          {/* <div className="section">
            <h2>Benefits</h2>
            <p>{scholarship.benefits}</p>
          </div>

          <div className="section">
            <h2>Application Process</h2>
            <p>{scholarship.applicationProcess}</p>
          </div>
        </div> */}

        <div className="sidebar">
          <div className="sidebar-section">
            <h3>Quick Facts</h3>
            <ul>
              <li><strong>Provider:</strong> {scholarship.provider}</li>
              <li><strong>Funding Type:</strong> {scholarship.amountType}</li>
              {/* <li><strong>Number of Awards:</strong> {scholarship.numberOfAwards || 'Varies'}</li> */}
              {/* <li><strong>Renewable:</strong> {scholarship.renewable ? 'Yes' : 'No'}</li> */}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Contact Information</h3>
            {scholarship.contactEmail && (
              <p><strong>Email:</strong> <a href={`mailto:${scholarship.contactEmail}`}>{scholarship.contactEmail}</a></p>
            )}
            {scholarship.contactPhone && (
              <p><strong>Phone:</strong> {scholarship.contactPhone}</p>
            )}
            {scholarship.website && (
              <p><strong>Website:</strong> <a href={scholarship.website} target="_blank" rel="noopener noreferrer">{scholarship.website}</a></p>
            )}
          </div>

          <button 
            onClick={handleApplyClick} 
            className="apply-button"
            disabled={diffDays <= 0}
          >
            {diffDays <= 0 ? 'Application Closed' : 'Apply Now'}
          </button>

          {diffDays <= 0 && (
            <p className="expired-notice">This scholarship deadline has passed.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ScholarshipDetailPage;