'use client';

import { useState, useCallback } from 'react';

export function useProfileErrorHandler() {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const [errorContext, setErrorContext] = useState({
    currentProfile: null,
    fallbackProfile: null,
    defaultProfile: null
  });

  const handleProfileError = useCallback(async (error, context) => {
    console.error('Profile error occurred:', error);
    
    setCurrentError(error);
    setErrorContext(context);

    // Try to get available profiles for fallback
    try {
      const profiles = await getAvailableProfiles();
      const currentProfileId = context.currentProfile?.id;
      
      // Find fallback profile (default profile if not current, or any other profile)
      let fallbackProfile = null;
      
      if (context.defaultProfile && context.defaultProfile.id !== currentProfileId) {
        fallbackProfile = context.defaultProfile;
      } else {
        // Find any other profile that's not current
        fallbackProfile = profiles.find(p => p.id !== currentProfileId) || null;
      }

      setErrorContext(prev => ({
        ...prev,
        fallbackProfile
      }));

      // If we have a fallback profile, try to switch to it automatically
      if (fallbackProfile) {
        try {
          console.log(`Attempting to switch to fallback profile: ${fallbackProfile.name}`);
          
          // Test the fallback profile first
          const testResult = await testProfile(fallbackProfile);
          if (testResult.success) {
            // Switch to fallback profile
            await switchToProfile(fallbackProfile.id);
            console.log(`Successfully switched to fallback profile: ${fallbackProfile.name}`);
            return { switched: true, profile: fallbackProfile };
          } else {
            console.log(`Fallback profile also has issues:`, testResult.error);
            // Show modal since fallback also failed
            setErrorModalOpen(true);
            return { switched: false, error: testResult.error };
          }
        } catch (fallbackError) {
          console.error('Error testing/switching to fallback profile:', fallbackError);
          setErrorModalOpen(true);
          return { switched: false, error: fallbackError.message };
        }
      } else {
        // No fallback available, show modal
        setErrorModalOpen(true);
        return { switched: false, error: 'No fallback profile available' };
      }
    } catch (err) {
      console.error('Error in profile error handler:', err);
      setErrorModalOpen(true);
      return { switched: false, error: err.message };
    }
  }, []);

  const retryCurrentProfile = useCallback(async () => {
    if (!errorContext.currentProfile) return false;
    
    try {
      const testResult = await testProfile(errorContext.currentProfile);
      if (testResult.success) {
        setErrorModalOpen(false);
        return true;
      } else {
        throw new Error(testResult.error);
      }
    } catch (error) {
      console.error('Retry failed:', error);
      return false;
    }
  }, [errorContext.currentProfile]);

  const switchToFallback = useCallback(async () => {
    if (!errorContext.fallbackProfile) return false;
    
    try {
      await switchToProfile(errorContext.fallbackProfile.id);
      setErrorModalOpen(false);
      return true;
    } catch (error) {
      console.error('Switch to fallback failed:', error);
      return false;
    }
  }, [errorContext.fallbackProfile]);

  const closeErrorModal = useCallback(() => {
    setErrorModalOpen(false);
    setCurrentError(null);
    setErrorContext({
      currentProfile: null,
      fallbackProfile: null,
      defaultProfile: null
    });
  }, []);

  return {
    errorModalOpen,
    currentError,
    errorContext,
    handleProfileError,
    retryCurrentProfile,
    switchToFallback,
    closeErrorModal
  };
}

// Helper functions
async function getAvailableProfiles() {
  try {
    // Get profiles from localStorage (since they're stored there)
    if (typeof window !== 'undefined') {
      const profiles = JSON.parse(localStorage.getItem('connectionProfiles') || '[]');
      return profiles;
    }
    return [];
  } catch (error) {
    console.error('Error getting profiles:', error);
    return [];
  }
}

async function testProfile(profile) {
  try {
    // Test health endpoint first (doesn't require profile)
    const healthResponse = await fetch('/api/admin/health');
    if (!healthResponse.ok) {
      return { success: false, error: 'Server health check failed' };
    }

    // For now, we'll assume profile is OK if it has required fields
    if (profile?.config?.accountAddress && profile?.config?.rpcUrl) {
      return { success: true };
    } else {
      return { success: false, error: 'Profile missing required configuration' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function switchToProfile(profileId) {
  // This would switch the active profile
  // The implementation depends on how profiles are managed
  // For now, we'll assume there's a profile management system
  if (typeof window !== 'undefined') {
    localStorage.setItem('activeProfileId', profileId);
    window.location.reload(); // Reload to apply new profile
  }
}