// app/profile/actions.ts
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
    .from('likes')
    .select(`
      article:articles (
        *,
        author:profiles!articles_author_id_fkey (
          id,
          full_name,
          avatar_url
        )
      )
    `)
    .eq('user_id', userId);

  if (error || !data) {
    console.log('getLikedArticles: ERROR: ', error);
    return { data: [], error };
  }

  type LikeWithArticle = { article: ArticleProps[] };
  const articles = (data as LikeWithArticle[])
    .map((like) => like.article[0])
  .filter((article): article is ArticleProps => article !== null && article !== undefined);

  return { data: articles, error: null };
}
