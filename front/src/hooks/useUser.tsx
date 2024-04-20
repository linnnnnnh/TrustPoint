
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';


// 3. Créez un hook personnalisé pour utiliser le contexte
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };