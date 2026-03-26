'use client';

import { useEffect, useState } from 'react';

interface ProposalToastProps {
  message: string | null;
}

export default function ProposalToast({ message }: ProposalToastProps) {
  const [visible, setVisible] = useState(false);
  const [displayMsg, setDisplayMsg] = useState('');

  useEffect(() => {
    if (message) {
      setDisplayMsg(message);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent text-white text-[13px] py-2.5 px-5 rounded z-[200] pointer-events-none transition-transform duration-250 ease-out
        ${visible ? 'translate-y-0' : 'translate-y-[60px]'}`}
    >
      {displayMsg}
    </div>
  );
}
