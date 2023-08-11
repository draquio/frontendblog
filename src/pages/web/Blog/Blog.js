import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Blog() {
  const navigate = useNavigate(); 

  useEffect(() => {
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate('/', { replace: true });
    }, 0);
  }, [navigate]);
  return (
    <div>Redirecting...</div>
  )
}
