import React from 'react';
import './OrgChart.css';
import { FiUser } from 'react-icons/fi';

const OrgChart = ({ data, currentUser }) => {
  const renderNode = (node, level = 0) => {
    if (!node) return null;

    const isCurrentUser = currentUser && node.name === currentUser.fullName;
    const avatarContent = node.profileImage ? (
      <img src={node.profileImage} alt={node.name} className="org-avatar-image" />
    ) : (
      <span className="org-avatar-text">{node.name.charAt(0)}</span>
    );

    return (
      <div className={`org-node level-${level}`} key={node.name}>
        <div className={`org-card ${isCurrentUser ? 'current-user' : ''}`}>
          <div className="org-avatar">
            {avatarContent}
          </div>
          <div className="org-info">
            <h4>{node.name}</h4>
            <p>{node.title}</p>
            {node.department && <span className="org-department">{node.department}</span>}
          </div>
        </div>
        {node.subordinates && node.subordinates.length > 0 && (
          <div className="org-children">
            {node.subordinates.map((sub, index) => (
              <div key={sub.name} className="org-child">
                {renderNode(sub, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="org-chart-container">
      <div className="org-chart">
        {renderNode(data)}
      </div>
    </div>
  );
};

export default OrgChart; 