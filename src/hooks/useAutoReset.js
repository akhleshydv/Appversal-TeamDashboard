import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetInactiveMembers } from '../redux/slices/membersSlice';

/**
 * Custom hook to handle auto-reset of member status to Offline after 10 minutes of inactivity
 * This hook should only be called once at the app level (in AppContent)
 */
const useAutoReset = () => {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);

  useEffect(() => {
    // Check for inactive members every minute
    intervalRef.current = setInterval(() => {
      dispatch(resetInactiveMembers());
    }, 60 * 1000); // Check every minute

    // Initial check
    dispatch(resetInactiveMembers());

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [dispatch]);
};

export default useAutoReset;

