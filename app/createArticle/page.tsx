import { getCategories, getTypes } from "./actions";
import { CreateArticleForm } from "@/components/CreateArticle/CreateArticleForm";

export default async function createArticlePage(){
    
    const {data:tempTypes, error:typesError} = await getTypes();
    const {data:tempCategories, error:categoriesError} = await getCategories();
    
    const categories = tempCategories as GroupProps;
    const types = tempTypes as GroupProps;
    return(
        <div className='pt-42 font-girassol pb-10 text-black px-4 xs:px-8 bg-white lg:px-20 h-full w-full'>
            <CreateArticleForm categories={categories} types={types}/>
        </div>
    )
}