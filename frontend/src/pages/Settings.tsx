import { SettingsWindowRef } from "../components/SettingsWindowRef";
import { SettingsWindowVol } from "../components/SettingsWindowVol";

export const Settings = () => {
  return (
    <div className="p-container">
        {localStorage.getItem('user-role') === 'ROLE_VOLUNTEER' ? <SettingsWindowVol /> : <SettingsWindowRef />}
    </div>
  );
};
