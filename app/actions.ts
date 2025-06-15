'use server';

import { createClient } from "@/lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getArticles (){
    const supabase = await createClient();
    let {data, error} = await supabase.from('articles').select('*') as { data: ArticleProps[] | null; error: PostgrestError | null };
;

    if(error){
        console.log('homeActions: getArticles: ERROR: ', error);
        return []
    }
    console.log('homeActions: getArticles: DATA: ', data);
    return data;
}