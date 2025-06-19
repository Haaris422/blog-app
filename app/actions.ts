'use server';

import { createClient } from "@/lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getArticles (){
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
  `) as { data: ArticleProps[] | null; error: PostgrestError | null };
;

    if(error){
        console.log('homeActions: getArticles: ERROR: ', error);
        return []
    }
    console.log('homeActions: getArticles: DATA: ', data);

    if(data)
    return data;
}