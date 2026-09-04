import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { YouTubeVideoItem, PreRegistrationItem, CollaborationInquiryItem } from '../types';
import { INITIAL_YOUTUBE_VIDEOS } from '../data/mockData';

// Firestore document references
const YOUTUBE_DOC_REF = doc(db, 'site_settings', 'youtube');
const REGISTRATIONS_DOC_REF = doc(db, 'site_settings', 'pre_registrations');
const INQUIRIES_DOC_REF = doc(db, 'site_settings', 'inquiries');

// Storage keys
const YOUTUBE_STORAGE_KEY = 'ding_youtube_videos_v1';
const PRE_REG_STORAGE_KEY = 'ding_pre_registrations_v1';
const INQUIRIES_STORAGE_KEY = 'ding_collaboration_inquiries_v1';

let isListeningYouTube = false;
let isListeningRegistrations = false;
let isListeningInquiries = false;

let isSavingYouTube = false;
let isSavingRegistrations = false;
let isSavingInquiries = false;

// --------------------------------------------------------------------------
// 1. YouTube Videos Cloud Sync
// --------------------------------------------------------------------------

/**
 * Save YouTube videos list to Firebase Firestore.
 */
export async function saveYouTubeVideosToCloud(videos: YouTubeVideoItem[]): Promise<boolean> {
  try {
    isSavingYouTube = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem(YOUTUBE_STORAGE_KEY, JSON.stringify(videos));
      window.dispatchEvent(new CustomEvent('ding_youtube_videos_updated', { detail: videos }));
    }

    await setDoc(YOUTUBE_DOC_REF, {
      items: videos,
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin',
    }, { merge: true });

    return true;
  } catch (err) {
    console.error('Failed to save YouTube videos to Firestore:', err);
    return false;
  } finally {
    setTimeout(() => {
      isSavingYouTube = false;
    }, 400);
  }
}

/**
 * Real-time listener for YouTube videos from Firestore.
 */
export function initYouTubeFirebaseSync(onUpdate?: (videos: YouTubeVideoItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  if (isListeningYouTube) return () => {};
  isListeningYouTube = true;

  try {
    const unsubscribe = onSnapshot(
      YOUTUBE_DOC_REF,
      async (docSnap) => {
        if (isSavingYouTube) return;

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.items) && data.items.length > 0) {
            const remoteVideos = data.items as YouTubeVideoItem[];
            localStorage.setItem(YOUTUBE_STORAGE_KEY, JSON.stringify(remoteVideos));
            window.dispatchEvent(new CustomEvent('ding_youtube_videos_updated', { detail: remoteVideos }));
            if (onUpdate) onUpdate(remoteVideos);
            return;
          }
        } else {
          // Document does not exist yet: seed current local storage or defaults
          const currentRaw = localStorage.getItem(YOUTUBE_STORAGE_KEY);
          let seedVideos = INITIAL_YOUTUBE_VIDEOS;
          if (currentRaw) {
            try {
              const parsed = JSON.parse(currentRaw);
              if (Array.isArray(parsed) && parsed.length > 0) {
                seedVideos = parsed;
              }
            } catch {
              // fallback
            }
          }
          await setDoc(YOUTUBE_DOC_REF, {
            items: seedVideos,
            updatedAt: new Date().toISOString(),
            isInitialSeed: true,
          }, { merge: true });
        }
      },
      (error) => {
        console.warn('YouTube Firestore sync notice:', error.message);
      }
    );

    return () => {
      unsubscribe();
      isListeningYouTube = false;
    };
  } catch (error) {
    console.warn('Could not establish YouTube listener:', error);
    isListeningYouTube = false;
    return () => {};
  }
}

// --------------------------------------------------------------------------
// 2. Pre-Registrations Cloud Sync
// --------------------------------------------------------------------------

export async function savePreRegistrationsToCloud(items: PreRegistrationItem[]): Promise<boolean> {
  try {
    isSavingRegistrations = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem(PRE_REG_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('ding_registrations_updated', { detail: items }));
    }

    await setDoc(REGISTRATIONS_DOC_REF, {
      items,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    return true;
  } catch (err) {
    console.error('Failed to save registrations to Firestore:', err);
    return false;
  } finally {
    setTimeout(() => {
      isSavingRegistrations = false;
    }, 400);
  }
}

export function initPreRegistrationsFirebaseSync(onUpdate?: (items: PreRegistrationItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  if (isListeningRegistrations) return () => {};
  isListeningRegistrations = true;

  try {
    const unsubscribe = onSnapshot(
      REGISTRATIONS_DOC_REF,
      async (docSnap) => {
        if (isSavingRegistrations) return;

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.items)) {
            const remoteItems = data.items as PreRegistrationItem[];
            localStorage.setItem(PRE_REG_STORAGE_KEY, JSON.stringify(remoteItems));
            window.dispatchEvent(new CustomEvent('ding_registrations_updated', { detail: remoteItems }));
            if (onUpdate) onUpdate(remoteItems);
            return;
          }
        }
      },
      (error) => {
        console.warn('Registrations Firestore sync notice:', error.message);
      }
    );

    return () => {
      unsubscribe();
      isListeningRegistrations = false;
    };
  } catch (error) {
    console.warn('Could not establish Registrations listener:', error);
    isListeningRegistrations = false;
    return () => {};
  }
}

// --------------------------------------------------------------------------
// 3. Collaboration Inquiries Cloud Sync
// --------------------------------------------------------------------------

export async function saveInquiriesToCloud(items: CollaborationInquiryItem[]): Promise<boolean> {
  try {
    isSavingInquiries = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('ding_inquiries_updated', { detail: items }));
    }

    await setDoc(INQUIRIES_DOC_REF, {
      items,
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    return true;
  } catch (err) {
    console.error('Failed to save inquiries to Firestore:', err);
    return false;
  } finally {
    setTimeout(() => {
      isSavingInquiries = false;
    }, 400);
  }
}

export function initInquiriesFirebaseSync(onUpdate?: (items: CollaborationInquiryItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  if (isListeningInquiries) return () => {};
  isListeningInquiries = true;

  try {
    const unsubscribe = onSnapshot(
      INQUIRIES_DOC_REF,
      async (docSnap) => {
        if (isSavingInquiries) return;

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.items)) {
            const remoteItems = data.items as CollaborationInquiryItem[];
            localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(remoteItems));
            window.dispatchEvent(new CustomEvent('ding_inquiries_updated', { detail: remoteItems }));
            if (onUpdate) onUpdate(remoteItems);
            return;
          }
        }
      },
      (error) => {
        console.warn('Inquiries Firestore sync notice:', error.message);
      }
    );

    return () => {
      unsubscribe();
      isListeningInquiries = false;
    };
  } catch (error) {
    console.warn('Could not establish Inquiries listener:', error);
    isListeningInquiries = false;
    return () => {};
  }
}
