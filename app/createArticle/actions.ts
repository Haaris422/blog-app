'use server';

import { createClient } from "@/lib/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getTypes(){
    const supabase = await createClient();

    const {data, error} = await supabase.from('type').select('*');

    if(error){
        alert('An error has occured while fetching Types.')
        return {data:[], error}
    }

    return{data, error:null};
}

export async function getCategories(){
    const supabase = await createClient();

    const {data, error} = await supabase.from('categories').select('*');

    if(error){
        alert('An error has occured while fetching Types.')
        return {data:[], error}
    }

    return{data, error:null};
}