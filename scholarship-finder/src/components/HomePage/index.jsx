// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [scholarships, setScholarships] = useState([{
          _id: "1",
          shortDescription: "This is a sample scholarship description.",
          deadline: "12-12-2025" ,
          applicationLink: "" ,
          name: "Name" ,
          amountType: "Full" , 
          description: "nothing",
          minGPA: 7.5,
          location: "INDIA",
          eligibleCourses: ['CSE','ECE','EEE'],
          provider: "NTSE",
          contactEmail: "ntse@gmail.com",
          contactPhone: 123456789,
          website: "http://localhost:5137"
        }]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    amount: '',
    course: '',
    gpa: '',
    location: '',
    deadline: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/scholarships', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setScholarships(data);
        setFilteredScholarships(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, scholarships]);

  const applyFilters = () => {
    let result = [...scholarships];

    if (filters.amount) {
      result = result.filter(scholarship => scholarship.amountType === filters.amount);
    }

    if (filters.course) {
      result = result.filter(scholarship => 
        scholarship.eligibleCourses.includes(filters.course)
      );
    }

    if (filters.gpa) {
      result = result.filter(scholarship => 
        scholarship.minGPA <= parseFloat(filters.gpa)
      );
    }

    if (filters.location) {
      result = result.filter(scholarship => 
        scholarship.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.deadline) {
      const now = new Date();
      const deadlineDate = new Date(now);
      
      if (filters.deadline === 'week') {
        deadlineDate.setDate(now.getDate() + 7);
      } else if (filters.deadline === 'month') {
        deadlineDate.setMonth(now.getMonth() + 1);
      }
      
      result = result.filter(scholarship => {
        const scholarshipDeadline = new Date(scholarship.deadline);
        return scholarshipDeadline <= deadlineDate;
      });
    }

    setFilteredScholarships(result);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleScholarshipClick = (id) => {
    navigate(`/scholarship/${id}`);
  };

  const urgentDeadlines = scholarships.filter(scholarship => {
    const deadline = new Date(scholarship.deadline);
    const now = new Date();
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  });

  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-header">
          <h1 className='heading1'>Find Your Perfect Scholarship</h1>
          <div className="urgent-notifications">
            {urgentDeadlines.length > 0 && (
              <div className="urgent-alert">
                <span>⚠️</span> {urgentDeadlines.length} scholarships with approaching deadlines!
              </div>
            )}
          </div>
        </header>

        <div className="filter-section">
          <h2>Filter Scholarships</h2>
          <div className="filter-grid">
            <div className="filter-group">
              <label>Amount Type</label>
              <select name="amount" value={filters.amount} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Full">Full</option>
                <option value="Partial">Partial</option>
                <option value="Small">Small Grants</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Course</label>
              <select name="course" value={filters.course} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum GPA</label>
              <input 
                type="number" 
                name="gpa" 
                min="0" 
                max="4" 
                step="0.1"
                value={filters.gpa}
                onChange={handleFilterChange}
                placeholder="e.g., 3.0"
              />
            </div>

            <div className="filter-group">
              <label>Location</label>
              <input 
                type="text" 
                name="location" 
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Country or City"
              />
            </div>

            <div className="filter-group">
              <label>Deadline Within</label>
              <select name="deadline" value={filters.deadline} onChange={handleFilterChange}>
                <option value="">Any time</option>
                <option value="week">Next 7 days</option>
                <option value="month">Next 30 days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="scholarships-list">
          {loading ? (
            <div className="loading">Loading scholarships...</div>
          ) : filteredScholarships.length === 0 ? (
            <div className="no-results">No scholarships match your filters.</div>
          ) : (
            filteredScholarships.map(scholarship => (
              <div 
                key={scholarship._id} 
                className="scholarship-card"
                onClick={() => handleScholarshipClick(scholarship._id)}
              >
                <h3>{scholarship.name}</h3>
                <div className="scholarship-details">
                  <span className={`amount-badge ${scholarship.amountType.toLowerCase()}`}>
                    {scholarship.amountType}
                  </span>
                  <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                </div>
                <p className="description">{scholarship.shortDescription}</p>
                <div className="eligibility">
                  <span>Course: {scholarship.eligibleCourses.join(', ')}</span>
                  <span>GPA: {scholarship.minGPA}+</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;