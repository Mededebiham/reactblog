import React, { useContext, useState } from 'react';
import SettingsTab from "./SettingsTab";
import SettingsTabSelector from "./SettingsTabSelector";
import { UserContext } from '../../context';
import ProfileTab from "./ProfileTab";
import UserSettingsTab from "./UserSettingsTab";
import CategoryTab from "./CategoryTab";
import UsersTab from "./UsersTab";

const SettingsMenu = () => {
    const { user } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="m-4 w-full">
            <h2 className="text-xl font-bold mb-4">Einstellungen{user.firstName ? `: ${user.firstName} ${user.lastName}` : ""}</h2>
            <div className="mb-4 border-b border-surface0">
                <div className="flex flex-wrap -mb-px text-sm font-medium text-center justify-between" id="default-tab"
                     data-tabs-toggle="#default-tab-content" role="tablist">
                    <div className="flex">
                        <SettingsTabSelector id="profile" isActive={activeTab === 'profile'} onClick={() => handleTabChange('profile')}>Profil</SettingsTabSelector>
                        <SettingsTabSelector id="settings" isActive={activeTab === 'settings'} onClick={() => handleTabChange('settings')}>Einstellungen</SettingsTabSelector>
                    </div>
                    <div className='flex'>
                        {(user.role === 'admin' || user.role === 'mod') && <SettingsTabSelector id="category" isActive={activeTab === 'category'} onClick={() => handleTabChange('category')}>Kategorien</SettingsTabSelector>}
                        {user.role === 'admin' && <SettingsTabSelector id="users" isActive={activeTab === 'users'} onClick={() => handleTabChange('users')}>Benutzer</SettingsTabSelector>}
                    </div>
                </div>
            </div>
            <div id="default-tab-content">
                <SettingsTab id="profile" visible={activeTab === 'profile'}>
                    <ProfileTab />
                </SettingsTab>
                <SettingsTab id="settings" visible={activeTab === 'settings'}>
                    <UserSettingsTab />
                </SettingsTab>
                {(user.role === 'admin' || user.role === 'mod') && <SettingsTab id="category" visible={activeTab === 'category'}>
                    <CategoryTab />
                </SettingsTab>}
                {user.role === 'admin' && <SettingsTab id="users" visible={activeTab === 'users'}>
                    <UsersTab />
                </SettingsTab>}
            </div>
        </div>
    );
};

export default SettingsMenu;
