// // src/hooks/useInactivityLogout.js
// import { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function useInactivityLogout(timeoutMinutes = import.meta.env.INACTIVITY_TIMEOUT) {
//   const navigate = useNavigate();
//   const timerRef = useRef(null);

//   const resetTimer = () => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(() => {
//       // clear stored credentials
//       localStorage.removeItem('adminAuthenticated');
//       localStorage.removeItem('token');
//       localStorage.removeItem('adminName');
//       alert('You were logged out due to inactivity.');
//       navigate('/admin-page');
//     }, timeoutMinutes * 60 * 1000);
//   };

//   useEffect(() => {
//     // events that count as "activity"
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
//     events.forEach(event => window.addEventListener(event, resetTimer));

//     resetTimer(); // initialize

//     return () => {
//       events.forEach(event => window.removeEventListener(event, resetTimer));
//       clearTimeout(timerRef.current);
//     };
//   }, []);
// }

import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useInactivityLogout(timeoutMinutes = import.meta.env.VITE_INACTIVITY_TIMEOUT) {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // clear stored credentials
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('adminName');
      alert('You were logged out due to inactivity.');
      navigate('/admin-page');
    }, timeoutMinutes * 60 * 1000);
  }, [navigate, timeoutMinutes]); // Add dependencies

  useEffect(() => {
    // events that count as "activity"
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // initialize

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [resetTimer]); // Add resetTimer to dependencies
}
