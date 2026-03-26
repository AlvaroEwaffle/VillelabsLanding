'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { doc, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { getDb } from './firebase';

interface ProposalProgress {
  completedTasks: Record<string, boolean>;
  toggleTask: (taskId: string) => void;
  isLoading: boolean;
  phaseProgress: (phaseId: number, totalTasks: number) => { done: number; pct: number };
  totalProgress: (phaseTotals: Record<number, number>) => { done: number; total: number; pct: number };
}

const LS_PREFIX = 'proposal_tasks_';

function loadLocal(slug: string): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(LS_PREFIX + slug) || '{}');
  } catch {
    return {};
  }
}

function saveLocal(slug: string, data: Record<string, boolean>) {
  try {
    localStorage.setItem(LS_PREFIX + slug, JSON.stringify(data));
  } catch { /* noop */ }
}

export function useProposalProgress(slug: string): ProposalProgress {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const useFirebase = useRef(false);

  useEffect(() => {
    const db = getDb();
    if (!db) {
      setCompletedTasks(loadLocal(slug));
      setIsLoading(false);
      return;
    }

    useFirebase.current = true;
    const docRef = doc(db, 'proposals', slug);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setCompletedTasks(data.completedTasks || {});
        } else {
          const local = loadLocal(slug);
          setCompletedTasks(local);
        }
        setIsLoading(false);
      },
      () => {
        // Firestore error — fall back to localStorage
        useFirebase.current = false;
        setCompletedTasks(loadLocal(slug));
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [slug]);

  const toggleTask = useCallback(
    (taskId: string) => {
      setCompletedTasks((prev) => {
        const next = { ...prev };
        if (next[taskId]) {
          delete next[taskId];
        } else {
          next[taskId] = true;
        }

        // Persist
        saveLocal(slug, next);
        if (useFirebase.current) {
          const db = getDb();
          if (db) {
            const docRef = doc(db, 'proposals', slug);
            // Write full document (no merge) so removed keys are actually deleted
            setDoc(docRef, { completedTasks: next, lastUpdated: Timestamp.now() }).catch(() => {});
          }
        }

        return next;
      });
    },
    [slug]
  );

  const phaseProgress = useCallback(
    (phaseId: number, totalTasks: number) => {
      const prefix = `${phaseId}_`;
      const done = Object.keys(completedTasks).filter(
        (k) => k.startsWith(prefix) && completedTasks[k]
      ).length;
      return { done, pct: totalTasks > 0 ? Math.round((done / totalTasks) * 100) : 0 };
    },
    [completedTasks]
  );

  const totalProgress = useCallback(
    (phaseTotals: Record<number, number>) => {
      let done = 0;
      let total = 0;
      for (const [phaseId, count] of Object.entries(phaseTotals)) {
        total += count;
        const prefix = `${phaseId}_`;
        done += Object.keys(completedTasks).filter(
          (k) => k.startsWith(prefix) && completedTasks[k]
        ).length;
      }
      return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
    },
    [completedTasks]
  );

  return { completedTasks, toggleTask, isLoading, phaseProgress, totalProgress };
}
