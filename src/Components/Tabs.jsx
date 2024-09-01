import React, { useState } from 'react';

const Tabs = ({ tabsData }) => {
  const [activeTab, setActiveTab] = useState('Videos');

  const renderContent = () => {
    const tab = tabsData.find((tab) => tab.label === activeTab);
    return tab ? tab.content : null;
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabsData.map((tab) => (
          <li className="nav-item" key={tab.label}>
            <button
              className={`nav-link tab-button ${activeTab === tab.label ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
