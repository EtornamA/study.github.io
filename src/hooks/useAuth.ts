import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  display_name: string | null;
  school_name: string | null;
  major: string | null;
  graduation_year: number | null;
  avatar_url: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as Profile | null;
  }, []);

  useEffect(() => {
    // Check for mock auth first
    const mockAuth = localStorage.getItem('mock-auth');
    if (mockAuth) {
      try {
        const { user, session, profile } = JSON.parse(mockAuth);
        setUser(user);
        setSession(session);
        setProfile(profile);
        setLoading(false);
        return;
      } catch (e) {
        // If parsing fails, continue with normal auth
      }
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetch with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id).then(setProfile);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName || email.split('@')[0]
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        toast.error('This email is already registered. Please sign in instead.');
      } else {
        toast.error(error.message);
      }
      return { error };
    }

    toast.success('Account created successfully!');
    return { data, error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error(error.message);
      return { error };
    }

    toast.success('Welcome back!');
    return { data, error: null };
  };

  const autoSignIn = async () => {
    // Create a mock user session for John Adams
    const mockUser = {
      id: 'john-adams-id',
      email: 'john.adams@example.com',
      user_metadata: {
        display_name: 'John Adams'
      }
    } as User;

    const mockSession = {
      access_token: 'mock-token',
      refresh_token: 'mock-refresh',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: mockUser
    } as Session;

    // Set the mock user and session
    setUser(mockUser);
    setSession(mockSession);
    
    // Create or update profile for John Adams
    const profileData = {
      user_id: mockUser.id,
      email: mockUser.email,
      display_name: 'John Adams',
      school_name: null,
      major: null,
      graduation_year: null,
      avatar_url: null
    };

    // Try to upsert the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'user_id' })
      .select()
      .single();

    if (!profileError && profile) {
      setProfile(profile as Profile);
    } else {
      // If profile creation fails, set a local profile
      setProfile(profileData as Profile);
    }

    // Store in localStorage to persist
    localStorage.setItem('mock-auth', JSON.stringify({ user: mockUser, session: mockSession, profile: profileData }));
    
    toast.success('Welcome, John Adams!');
    return { data: { user: mockUser, session: mockSession }, error: null };
  };

  const signOut = async () => {
    // Clear mock auth if it exists
    localStorage.removeItem('mock-auth');
    
    const { error } = await supabase.auth.signOut();
    if (error && !error.message.includes('not logged in')) {
      toast.error(error.message);
      return { error };
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    toast.success('Signed out successfully');
    return { error: null };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update profile');
      return { error };
    }

    setProfile(data as Profile);
    toast.success('Profile updated');
    return { data, error: null };
  };

  return {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    autoSignIn,
    signOut,
    updateProfile,
    refetchProfile: () => user && fetchProfile(user.id).then(setProfile)
  };
}
