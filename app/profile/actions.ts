'use server';

import { createClient } from "@/lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getAuthorArticles(id: string): Promise<{
  data: ArticleProps[];
  error: PostgrestError | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:profiles!articles_author_id_fkey (
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('author_id', id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log('homeActions: getAuthorArticles: ERROR: ', error);
    return { data: [], error };
  }

  console.log('homeActions: getAuthorArticles: DATA: ', data);
  return { data: data as ArticleProps[], error };
}


export async function getLikedArticles(userId: string): Promise<{
  data: ArticleProps[];
  error: PostgrestError | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      author:profiles!articles_author_id_fkey (
        id,
        full_name,
        avatar_url
      )
    `)
    .in('id',
      await supabase
        .from('likes')
        .select('article_id')
        .eq('user_id', userId)
        .then(res => res.data?.map((like) => like.article_id) || [])
    );
  console.log('getLikedArticles: DAta & ERROR: ', data, error);

  if (error || !data) {
    console.log('getLikedArticles: ERROR: ', error);
    return { data: [], error };
  }

  return { data, error: null };
}


export async function getUserComments(user_id: string): Promise<{
  data: UserCommentsProps[];
  error: PostgrestError | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('comments')
  .select('*, article:articles!comments_article_id_fkey (title, slug)')
  .eq('user_id', user_id).eq('deleted', false).order('created_at', { ascending: false });
  console.log('getUserComments: data & error: ', data, error);

  if (error || !data) {
    return { data: [], error };
  }

  return { data, error: null };
}

export async function getUserApplication(user_id: string, role: string) {
  const supabase = await createClient();

  if (role === 'author') {
    return { data: '', error: null };
  }

  if (role === 'reader') {
    const { data, error } = await supabase
      .from('author_applications')
      .select('status')
      .eq('user_id', user_id)
      .single();

    if (error || !data) {
      return { data: '', error };
    }

    return { data: data.status, error: null };
  }

  if (role === 'admin') {
    const { data, error } = await supabase
      .from('author_applications')
      .select(`
        *,
        author:profiles!author_applications_user_id_fkey (
        id,
        full_name,
        avatar_url
      )
      `)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  return { data: '', error: null }; // Fallback for unknown roles
}
