import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { 
  FiMail, 
  FiBriefcase, 
  FiUsers, 
  FiMapPin, 
  FiClock, 
  FiEdit2, 
  FiSave, 
  FiX, 
  FiChevronDown, 
  FiChevronRight,
  FiFileText,
  FiAward,
  FiCalendar,
  FiUser
} from 'react-icons/fi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    workEmail: '',
    jobTitle: '',
    department: '',
    managerId: '',
    skipManagerId: '',
    location: '',
    employmentType: '',
    dateOfJoining: '',
    teamName: '',
    businessUnit: '',
    profileImage: null,
    isActive: true
  });
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const mockAdminData = {
    employeeId: "EMP-001",
    fullName: "John Smith",
    workEmail: "john.smith@company.com",
    jobTitle: "Engineering Manager",
    department: "Engineering",
    managerId: "EMP-002",
    skipManagerId: "EMP-003",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    dateOfJoining: "2020-01-15",
    teamName: "Product Engineering",
    businessUnit: "Product Development",
    profileImage: null,
    isActive: true
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const newFormData = {
        employeeId: user.employeeId || '',
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Not Set',
        workEmail: user.email || '',
        jobTitle: user.jobTitle || 'Not Set',
        department: user.department || 'Not Set',
        managerId: user.managerId || '',
        skipManagerId: user.skipManagerId || '',
        location: user.location || 'Not Set',
        employmentType: user.employmentType || 'Not Set',
        dateOfJoining: user.dateOfJoining || 'Not Set',
        teamName: user.teamName || 'Not Set',
        businessUnit: user.businessUnit || 'Not Set',
        profileImage: user.profileImage || null,
        isActive: user.isActive || true
      };
      
      setFormData(newFormData);
      setPreviewImage(user.profileImage || null);
      setIsAdmin(user.role === 'admin');
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalData({ ...formData });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (originalData) {
      setFormData(originalData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUser(formData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setOriginalData(null);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-message">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-header-left">
            <div className="profile-image-container">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder">
                  {mockAdminData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              {isEditing && (
                <label className="image-upload-label">
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload-input"
                  />
                </label>
              )}
            </div>
            <div className="profile-header-info">
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={mockAdminData.fullName}
                  onChange={handleChange}
                  className="form-input header-input"
                />
              ) : (
                <h1>{mockAdminData.fullName}</h1>
              )}
              {isEditing ? (
                <input
                  type="text"
                  name="jobTitle"
                  value={mockAdminData.jobTitle}
                  onChange={handleChange}
                  className="form-input header-input"
                />
              ) : (
                <p className="job-title">{mockAdminData.jobTitle}</p>
              )}
              <div className="team-info">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="teamName"
                      value={mockAdminData.teamName}
                      onChange={handleChange}
                      className="form-input header-input"
                    />
                    <span className="separator">•</span>
                    <input
                      type="text"
                      name="department"
                      value={mockAdminData.department}
                      onChange={handleChange}
                      className="form-input header-input"
                    />
                  </>
                ) : (
                  <>
                    <span>{mockAdminData.teamName}</span>
                    <span className="separator">•</span>
                    <span>{mockAdminData.department}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="edit-actions">
              <button className="cancel-button" onClick={handleCancelClick}>
                <FiX size={20} />
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-profile-button" onClick={handleEditClick}>
              <FiEdit2 size={20} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="profile-content">
        <div className="info-section">
          <h3>Contact Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label><FiMail className="info-icon" /> Email</label>
              <p>{mockAdminData.workEmail}</p>
            </div>
            <div className="info-item">
              <label><FiMapPin className="info-icon" /> Location</label>
              <p>{mockAdminData.location}</p>
            </div>
            <div className="info-item">
              <label><FiBriefcase className="info-icon" /> Department</label>
              <p>{mockAdminData.department}</p>
            </div>
            <div className="info-item">
              <label><FiUsers className="info-icon" /> Team</label>
              <p>{mockAdminData.teamName}</p>
            </div>
            <div className="info-item">
              <label><FiBriefcase className="info-icon" /> Business Unit</label>
              <p>{mockAdminData.businessUnit}</p>
            </div>
            <div className="info-item">
              <label><FiBriefcase className="info-icon" /> Employment Type</label>
              <p>{mockAdminData.employmentType}</p>
            </div>
            <div className="info-item">
              <label><FiCalendar className="info-icon" /> Date of Joining</label>
              <p>{mockAdminData.dateOfJoining}</p>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="save-changes-section">
          <button className="save-button" onClick={handleSubmit} disabled={loading}>
            <FiSave size={20} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile; 