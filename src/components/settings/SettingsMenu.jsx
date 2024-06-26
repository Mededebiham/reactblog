import React from 'react';
import SettingsTab from "./SettingsTab";
import SettingsTabSelector from "./SettingsTabSelector";

const SettingsMenu = () => {
    return (
        <div>
            <div className="mb-4 border-b border-surface2">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab"
                    data-tabs-toggle="#default-tab-content" role="tablist">
                    <SettingsTabSelector id="profile">Profil</SettingsTabSelector>
                    <SettingsTabSelector id="settings">Einstellungen</SettingsTabSelector>
                </ul>
            </div>
            <div id="default-tab-content">
                <SettingsTab id="profile" visibile={true}>This is some placeholder content the <strong
                    className="font-medium text-text">Profile tab's associated content</strong>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript
                    swaps classes to control the content visibility and styling.</SettingsTab>
                <SettingsTab id="settings">This is some placeholder content the <strong
                    className="font-medium text-text">Settings tab's associated content</strong>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript
                    swaps classes to control the content visibility and styling.</SettingsTab>
            </div>
        </div>
    );
};

export default SettingsMenu;